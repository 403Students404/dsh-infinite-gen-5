import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { AnalysisArtifacts } from '../source/analysis_artifacts.js';
import { deriveVmContextModel } from '../source/vm_context_model.js';
import { contextProfileSchema, runVmContextProfile } from '../source/vm_context_profile.js';
import { recoveryProfileSchema, runRecoveryProfile } from '../source/vm_recovery_profile.js';

const GPRS = 'rax rbx rcx rdx rdi rsi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15'.split(' ');
const hx = value => '0x' + BigInt(value).toString(16);
const sha = digit => digit.repeat(64);
function page(page, store) {
  const statuses = Array.from({ length: 8 }, (_, i) => page === 0 || i < 2 ? 'consistent-recorded-ordinary-state' : 'partially-consistent-unknown-preserved');
  const values = page ? [0x23,0xac,0xc9,0x38,0x39,0x5c,0x07,0x3c] : [0x4e,0x88,0x11,0x89,0xfa,0xd0,0x00,0xdb];
  const occurrences = [], selectedBodies = [], handlerBodies = [];
  for (let i = 0; i < 8; i++) {
    const ordinal = page * 8 + i, sourceValue = hx(values[i]), sourceAddress = 0x7000n + BigInt(ordinal), target = 0x4000n + BigInt(values[i] * 16);
    const initialGprs = Object.fromEntries(GPRS.map(name => [name, '0x0']));
    Object.assign(initialGprs, { rsi: hx(sourceAddress), r11: '0x5000', rbp: hx(0x9000n - BigInt(ordinal * 8)), rsp: '0xa000', r8: hx(target) });
    const finalGprs = { ...initialGprs, rax: sourceValue, rsi: hx(sourceAddress + 1n), r8: hx(target) };
    const sourceOccurrence = 100 + ordinal * 10, partial = statuses[i].startsWith('partially');
    occurrences.push({ startGroup: sourceOccurrence, firstRecordingId: '11111111-1111-4111-8111-111111111111', lastRecordingId: '11111111-1111-4111-8111-111111111111',
      sourceAddress: hx(sourceAddress), sourceValue, target: hx(target), initialGprs, finalGprs,
      sourceAddressInputUpdates: [{ name: 'rsi', before: hx(sourceAddress), after: hx(sourceAddress + 1n), deltaModulo64: '0x1' }],
      indexedAddressInputValues: [{ node: 7, inputs: [{ name: 'r11', value: '0x5000' }, { name: 'rsi', value: hx(sourceAddress) }] }] });
    const after = { ...finalGprs, rbp: hx(BigInt(initialGprs.rbp) - 8n) };
    selectedBodies.push({ sourceOccurrence, sourceValue, observedEntry: hx(target), completeNextBoundary: true,
      groups: [{ before: { gprs: initialGprs }, after: { gprs: after }, memoryReads: [{ address: initialGprs.rbp, bytes: 8 }],
        memoryWrites: ordinal ? [] : { status: 'not-recorded-by-this-format', effectsNotInferredFromReads: true } }] });
    const gprs = GPRS.map(name => ({ name, status: partial && name === 'r10' ? 'unknown-preserved' : 'matched' }));
    const orderedStores = partial ? [{ valueStatus: 'unknown-preserved' }, { valueStatus: 'unknown-preserved' }] : [{ valueStatus: 'replayed' }];
    handlerBodies.push({ sourceOccurrence, sourceValue, observedEntry: hx(target), completeNextBoundary: true, status: statuses[i], projection: { path: `C:/projection/${ordinal}.json`, sha256: sha((ordinal % 10).toString()) },
      assessment: { schema: 'ig5-recorded-handler-assessment-v1', status: statuses[i], gprs, orderedStores,
        control: { kind: 'direct', target: '0x2124', selectedSuccessor: 'direct' } } });
  }
  const recurrence = { schema: 'ig5-flow-recurrences-v1', targetSha256: sha('a'), occurrences, distinctRecordedRuns: 1, vmRoleProved: false, businessAccepted: false };
  const selection = { schema: 'ig5-recorded-handler-windows-v1', targetSha256: sha('a'), bodies: selectedBodies };
  let recurrenceRef = { id: `0000000${page + 1}-0000-4000-8000-00000000000${page + 1}`, sha256: sha('b') };
  let selectionRef = { id: `0000000${page + 3}-0000-4000-8000-00000000000${page + 3}`, path: `C:/selection/${page}.json`, sha256: sha('c') };
  if (store) {
    const r = store.save({ kind: 'vm-flow-recurrences', action: 'validate', result: recurrence }, { pretty: true });
    recurrenceRef = { id: r.id, sha256: store.metadata(r.id).result.recordSha256 };
    const s = store.save({ kind: 'vm-handler-windows', action: 'select', result: selection }, { pretty: true });
    selectionRef = { id: s.id, path: path.join(store.directory('records'), s.id + '.json'), sha256: store.metadata(s.id).result.recordSha256 };
  }
  const handlers = { schema: 'ig5-recorded-handlers-v1', targetSha256: sha('a'), sourceRecurrence: recurrenceRef, sourceSelection: selectionRef,
    bodies: handlerBodies, vmRoleProved: false, businessAccepted: false, moduleLoadEpoch: null, memoryEpoch: null };
  return { handlers, recurrence, selection, recurrenceRef, selectionRef };
}
function sources() { return [page(0), page(1)]; }

test('sixteen bodies produce explicit context candidates while all proof boundaries stay false', () => {
  const result = deriveVmContextModel(sources());
  assert.equal(result.evidence.occurrences, 16); assert.equal(result.evidence.ordinaryConsistent, 10);
  assert.equal(result.evidence.partialUnknownPreserved, 6); assert.equal(result.evidence.unknownGprResults, 6);
  assert.equal(result.evidence.unknownStoreValues, 12);
  assert.deepEqual(result.roles.vipCandidates.map(row => row.name), ['rsi']);
  assert.deepEqual(result.roles.dispatchBaseCandidates.map(row => row.name), ['r11']);
  assert.deepEqual(result.roles.opcodeCarrierCandidates.map(row => row.name), ['rax']);
  assert.deepEqual(result.roles.handlerTargetCarrierCandidates.map(row => row.name), ['r8']);
  assert.equal(result.roles.vspCandidates[0].name, 'rbp');
  assert.equal(result.phases.initialization.status, 'unknown'); assert.equal(result.phases.fixup.status, 'unknown');
  assert.equal(result.phases.businessExecution.status, 'unknown'); assert.equal(result.phases.dispatchExecution.status, 'observed-candidate');
  for (const key of ['vmRoleProved','vmIsaProved','wholeVmRecovered','businessAccepted','wholeFunctionCoverageProved','wholeBinaryVerified']) assert.equal(result[key], false);
});

test('partial 0x39 and 0x5c dictionary entries retain unknown outputs and have no invented semantic labels', () => {
  const result = deriveVmContextModel(sources());
  for (const sourceValue of ['0x39','0x5c']) {
    const row = result.observedHandlerDictionary.find(entry => entry.sourceValue === sourceValue);
    assert.equal(row.status, 'partially-consistent-unknown-preserved'); assert.deepEqual(row.unknownGprs, ['r10']);
    assert.equal(row.unknownStores, 2); assert.equal(row.semanticOpcodeLabel, null); assert.equal(row.instructionSemanticsProved, false);
  }
});

test('mixed target, duplicated evidence and upgraded source claims are rejected', () => {
  for (const mutate of [
    x => x[1].handlers.targetSha256 = sha('d'),
    x => { x[1].recurrence.occurrences[0] = structuredClone(x[0].recurrence.occurrences[0]); x[1].handlers.bodies[0].sourceOccurrence = x[0].handlers.bodies[0].sourceOccurrence; x[1].selection.bodies[0].sourceOccurrence = x[0].selection.bodies[0].sourceOccurrence; },
    x => x[0].handlers.vmRoleProved = true,
    x => x[0].handlers.bodies[0].assessment.gprs[0].name = 'fake',
  ]) { const evidence = sources(); mutate(evidence); assert.throws(() => deriveVmContextModel(evidence), /Invalid VM context evidence/); }
});

test('profile binds every source by committed SHA and saves an exact CAS report', async t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ig5-context-')), store = new AnalysisArtifacts(path.join(root, 'analysis-data'));
  t.after(async () => { await store.dispose(); fs.rmSync(root, { recursive: true, force: true }); });
  const handlerRefs = [];
  for (let i = 0; i < 2; i++) {
    const source = page(i, store), h = store.save({ kind: 'vm-recorded-handlers', action: 'assess', result: source.handlers }, { pretty: true });
    handlerRefs.push({ id: h.id, sha256: store.metadata(h.id).result.recordSha256 });
  }
  const mgr = { analysis: { artifacts: store }, checkCancelled() {} }, reply = runVmContextProfile(mgr, { handler_refs: handlerRefs }).context;
  assert.equal(reply.evidence.occurrences, 16); assert.equal(reply.vmRoleProved, false);
  assert.equal(fs.existsSync(reply.reportPath), true); assert.equal(store.metadata(reply.reportId).result.recordSha256, reply.reportSha256);
  const full = store.get(reply.reportId); assert.equal(full.result.sourceReports.length, 2);
  assert.equal(full.result.sourceReports.every(group => Object.values(group).every(ref => fs.existsSync(ref.path))), true);
  const audit = spawnSync(path.resolve('runtimes/ghidra/python/python.exe'), ['-I','-B','scripts/verify_vm_context_model.py',reply.reportPath,reply.reportSha256], { encoding: 'utf8' });
  assert.equal(audit.status, 0, audit.stderr); assert.equal(JSON.parse(audit.stdout).passed, true);
  assert.throws(() => runVmContextProfile(mgr, { handler_refs: [{ ...handlerRefs[0], sha256: sha('f') }] }), /SHA-256 differs/);
});

test('public context mode is exclusive and accepts no caller role or phase assertions', () => {
  assert.equal(contextProfileSchema.additionalProperties, false); assert.equal(recoveryProfileSchema.properties.context, contextProfileSchema);
  const ref = { id: '11111111-1111-4111-8111-111111111111', sha256: sha('a') };
  for (const extra of [{ vip: 'rsi' }, { phase: 'business' }, { semantics: { '0x39': 'ret' } }])
    assert.throws(() => runVmContextProfile({}, { handler_refs: [ref], ...extra }), /requires only handler_refs/);
  assert.throws(() => runRecoveryProfile({}, { recovery: { context: { handler_refs: [ref] }, handlers: {} } }, {}), /requires exactly/);
});
