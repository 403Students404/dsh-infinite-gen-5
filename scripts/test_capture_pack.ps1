[CmdletBinding()]
param([switch]$KeepFixture)
$ErrorActionPreference = 'Stop'
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
. (Join-Path $PSScriptRoot 'runtime_pack.ps1')
. (Join-Path $PSScriptRoot 'bootstrap_distribution.ps1')
$fixtureRoot = Join-Path ([IO.Path]::GetTempPath()) ('ig5-capture-pack-' + [Guid]::NewGuid().ToString('N'))
$utf8 = [Text.UTF8Encoding]::new($false)
$passed = 0
function Check { param([bool]$Condition, [string]$Message) if (-not $Condition) { throw "ASSERT: $Message" } }
function Put { param([string]$Path, [string]$Text)
    [IO.Directory]::CreateDirectory((ConvertTo-IG5IOPath (Split-Path $Path -Parent))) | Out-Null
    [IO.File]::WriteAllText((ConvertTo-IG5IOPath $Path), $Text, $utf8)
}
function Pass { param([string]$Message) $script:passed++; Write-Output "PASS $Message" }
function Expect-Failure { param([scriptblock]$Action, [string]$Expected)
    $failed = $false
    try { & $Action | Out-Null } catch { $failed = $true; Check ($_.Exception.Message.Contains($Expected)) "Expected '$Expected': $($_.Exception.Message)" }
    Check $failed "Expected failure: $Expected"
}

try {
    Check (Test-IG5ExcludedPath 'scratch/experiment/sample.exe') 'root experiment cache must not be packaged'
    Check (Test-IG5ExcludedPath 'adapters/vmci/native/launcher.obj') 'guest launcher intermediate object must not be packaged'
    Check (-not (Test-IG5ExcludedPath 'third_party/sources/ghidra-master/Framework/scratch/source.c')) 'upstream source paths must retain their original names'
    Pass 'packaging excludes root experiments and local intermediate objects while preserving upstream source paths'
    foreach ($pair in @(@('1.0.0','1.0.0'), @('1.1.0','1.1.0'), @('1.0.0','1.1.0'))) {
        Check (Test-IG5RuntimeVersion $pair[0] $pair[1]) "Expected asset $($pair[0]) to support plugin $($pair[1])"
    }
    foreach ($pair in @(@('0.9.0','1.1.0'), @('1.2.0','1.1.0'), @('1.1.0','1.0.0'), @('1.0.0','0.9.0'), @('1.0.0','1.2.0'), @('1.0.0','1.1.1'), @('1.0.0','1.1.0-beta.1'), @('','1.1.0'), @('1.0.0 ','1.1.0'))) {
        Check (-not (Test-IG5RuntimeVersion $pair[0] $pair[1])) "Unexpected version reuse: $($pair[0]) -> $($pair[1])"
    }
    Pass 'native runtime reuse is exact 1.0.0 -> 1.1.0 only, with normal exact-version matches'

    $descriptorFile = Join-Path $sourceRoot 'scripts\distribution.json'
    $descriptorHash = Get-IG5Hash $descriptorFile
    $descriptor = Get-IG5DistributionDescriptor $sourceRoot '1.1.0'
    Check ($descriptor.pluginVersion -ceq '1.0.0') 'the donor version must remain 1.0.0'
    Check ($descriptor.releaseTag -ceq 'v1.0.0-dsh021-20261010') 'immutable donor release changed'
    Check ($descriptor.assetName -ceq 'IG5-1.0.0-Windows-x64-dsh021-full-20261010.zip') 'immutable donor asset changed'
    Check ([long]$descriptor.assetBytes -eq 1064580056) 'donor size changed'
    $expectedPins = @{
        assetSha256='a2459ddca1f19e5eec2d7918c504f133889809800a0b277e1e379d3ce1459b54'
        runtimeManifestSha256='8fc4ae42f775f0139aa5f184c912db71f77e68d661c14564ab6f4820d434abea'
        sourceManifestSha256='1cf887f344882ebcf053fba43527eae696f1dbb418c5dd8f9a6c2b6038fdc7b5'
    }
    foreach ($key in $expectedPins.Keys) { Check ($descriptor.$key -ceq $expectedPins[$key]) "Donor pin changed: $key" }
    $expectedInventories = @{
        'provenance/ghidra-master.files.json'='61b8fd5907a4390f877052b1f80e38ee6b15d38d8b94a05e5384e9d995031490'
        'provenance/x64dbg-development.files.json'='c8311d203102be4cc5f6ce16fcb4d088eeeea6b64707a5e4aef79c66943a91c1'
        'provenance/x64dbg-runtime.files.json'='b9d43ac4d69d5b6cc8719fa7e408677cb8ad127158dbc1e69d7d8411d30e683a'
        'provenance/ghidra-12.1.4.files.json'='cbf147c417961bde3e383b7d8260ec5e4bf1d0391b976310016824100bcd454d'
    }
    Check (@($descriptor.sourceInventorySha256.PSObject.Properties).Count -eq 4) 'expected exactly four immutable source inventories'
    foreach ($key in $expectedInventories.Keys) { Check ($descriptor.sourceInventorySha256.$key -ceq $expectedInventories[$key]) "Source inventory pin changed: $key" }
    Check ($descriptor.nativeBridgeSha256.'ig5-bridge.dp64' -ceq '99209ec4db3adfe1bc8fbd97897dd2427d2080e7bcd927943efcdbb8d71a762e') 'x64 bridge pin changed'
    Check ($descriptor.nativeBridgeSha256.'ig5-bridge.dp32' -ceq 'fea30cb41c487eea92bc1b525d61f6b49158297c79516932f3d65024d7ddb855') 'x86 bridge pin changed'
    foreach ($version in @('0.9.0','1.2.0','1.1.0-beta.1')) { Expect-Failure { Get-IG5DistributionDescriptor $sourceRoot $version } 'Distribution identity/version is invalid' }
    Pass '1.1.0 descriptor accepts the sealed donor and preserves every public asset/inventory/bridge pin'

    $manifestInput = Join-Path $fixtureRoot 'sealed\manifest.json'
    $manifestText = "{`r`n  `"schemaVersion`": 1, `"pluginVersion`": `"1.0.0`", `"platform`": `"win32-x64`", `"files`": []`r`n}`r`n"
    Put $manifestInput $manifestText
    $manifestOutput = Join-Path $fixtureRoot 'copied'
    [IO.Directory]::CreateDirectory($manifestOutput) | Out-Null
    Write-IG5RuntimeManifest @{Legacy=$false;ManifestPath=$manifestInput} $manifestOutput '1.1.0'
    Check ((Get-IG5Hash $manifestInput) -ceq (Get-IG5Hash (Join-Path $manifestOutput 'manifest.json'))) 'sealing helper changed original manifest bytes'
    Check (((Read-IG5Text (Join-Path $manifestOutput 'manifest.json') | ConvertFrom-Json).pluginVersion) -ceq '1.0.0') 'native manifest was relabeled as plugin version'
    Pass 'copying an authenticated native manifest for 1.1.0 preserves its bytes and original version'

    # Minimal source fixture: placeholder older components satisfy unrelated source-presence
    # rules. New capture files below are independently removed one at a time to exercise
    # the real source validator. This fixture does not assert native binaries are valid.
    $pluginFixture = Join-Path $fixtureRoot 'plugin'
    Put (Join-Path $pluginFixture 'package.json') '{"name":"dsh-infinite-gen-5","version":"1.1.0"}'
    $complete = $false
    for ($attempt = 0; $attempt -lt 150; $attempt++) {
        try { Assert-IG5PluginSource $pluginFixture -CoreOnly; $complete = $true; break }
        catch {
            if ($_.Exception.Message -notmatch ': ([A-Za-z0-9_./-]+)$') { throw }
            $missing = Resolve-IG5PackPath $pluginFixture $Matches[1]
            Put $missing 'source presence fixture'
        }
    }
    Check $complete 'minimal source fixture failed to reach a valid baseline'
    foreach ($relative in @('capture_tools.js','source/capture_service.js','source/capture_proxy.js','source/capture_ca.js','source/capture_review.js','source/capture_payload.js','source/delivered_payload.js','source/capture_state_trace.js','source/protocol_state.js','adapters/ghidra/deobfuscation_analysis.py','source/trace_jobs.js','worker/ig5_trace.py','worker/trace_analysis.py','worker/trace_vendor/ig5-manifest.json','worker/trace_vendor/triton.cp312-win_amd64.pyd')) {
        $filename = Resolve-IG5PackPath $pluginFixture $relative
        Check (Test-Path -LiteralPath $filename -PathType Leaf) "Source validator did not require capture file: $relative"
        Remove-Item -LiteralPath $filename
        Expect-Failure { Assert-IG5PluginSource $pluginFixture -CoreOnly } $relative
        Put $filename 'restored source presence fixture'
        Assert-IG5PluginSource $pluginFixture -CoreOnly
    }
    Pass '1.1.0 source preflight rejects each missing capture module before installation or packaging'

    # Caller guards remain in all installation routes; the large installer regression
    # separately exercises native asset copying and user-profile non-mutation.
    foreach ($relative in @('install.ps1','scripts/package_portable.ps1','scripts/bootstrap_distribution.ps1')) {
        $scriptText = Read-IG5Text (Join-Path $sourceRoot $relative)
        Check ($scriptText -match 'Test-IG5RuntimeVersion') "Missing exact compatibility guard: $relative"
    }
    $bootstrap = Read-IG5Text (Join-Path $sourceRoot 'scripts/bootstrap_distribution.ps1')
    Check ($bootstrap -match '\$runtime\.Manifest\.pluginVersion -ne \$Descriptor\.pluginVersion') 'donor runtime must still match its sealed descriptor'
    Check ($bootstrap -match '\$release\.pluginVersion -ne \$Descriptor\.pluginVersion') 'donor outer release must still match its sealed descriptor'
    Check ((Get-IG5Hash $descriptorFile) -ceq $descriptorHash) 'test changed source distribution pins'
    Pass 'install/package/bootstrap retain version and donor identity checks without changing the pinned descriptor'
    Write-Output "CAPTURE PACK REGRESSIONS PASSED ($passed scenarios; placeholder source fixture, no native engine/profile changes)"
} finally {
    if ($KeepFixture) { Write-Output "FIXTURE_ROOT=$fixtureRoot" }
    elseif (Test-Path -LiteralPath $fixtureRoot) {
        $resolvedFixture = [IO.Path]::GetFullPath($fixtureRoot)
        $tempBoundary = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
        if (-not $resolvedFixture.StartsWith($tempBoundary, [StringComparison]::OrdinalIgnoreCase) -or (Split-Path $resolvedFixture -Leaf) -notlike 'ig5-capture-pack-*') { throw 'Unsafe capture fixture cleanup path' }
        Remove-IG5Tree $resolvedFixture
    }
}
