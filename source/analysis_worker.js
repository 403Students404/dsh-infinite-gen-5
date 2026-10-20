import { parentPort, workerData } from 'node:worker_threads';

try {
  if (workerData.kind === 'crypto') {
    const { analyzeCrypto } = await import('./crypto_analysis.js');
    const value = analyzeCrypto(workerData.request);
    parentPort.postMessage({ ok: true, value });
  } else if (workerData.kind === 'protocol') {
    const stateAction = ['state_infer', 'state_validate'].includes(workerData.request.action);
    const analyze = stateAction ? (await import('./protocol_state.js')).analyzeProtocolState : (await import('./protocol_analysis.js')).analyzeProtocol;
    parentPort.postMessage({ ok: true, value: { result: analyze(workerData.request) } });
  } else if (workerData.kind === 'vm-observations') {
    const { analyzeVmObservations } = await import('./vm_observations.js');
    parentPort.postMessage({ ok: true, value: analyzeVmObservations(workerData.request) });
  } else if (workerData.kind === 'vm-role-samples') {
    const { selectVmRoleSamples } = await import('./vm_role_samples.js');
    parentPort.postMessage({ ok: true, value: selectVmRoleSamples(workerData.request) });
  } else if (workerData.kind === 'vm-handler-windows') {
    const { selectRecordedHandlerBodies } = await import('./vm_handler_window.js');
    parentPort.postMessage({ ok: true, value: selectRecordedHandlerBodies(workerData.request) });
  } else if (workerData.kind === 'vm-handler-assessment') {
    const { assessRecordedHandler } = await import('./recorded_handler_eval.js');
    parentPort.postMessage({ ok: true, value: assessRecordedHandler(workerData.request) });
  } else if (workerData.kind === 'vm-flow-recurrences') {
    const { analyzeFlowRecurrences } = await import('./vm_flow_recurrences.js');
    parentPort.postMessage({ ok: true, value: analyzeFlowRecurrences(workerData.request) });
  } else if (workerData.kind === 'vm-flow-witness-replay') {
    const { replayFlowAssessment } = await import('./flow_state_eval.js');
    parentPort.postMessage({ ok: true, value: replayFlowAssessment(workerData.request) });
  } else if (workerData.kind === 'vm-flow-window') {
    const { selectVmFlowWindow } = await import('./vm_flow_window.js');
    parentPort.postMessage({ ok: true, value: selectVmFlowWindow(workerData.request) });
  } else throw new Error('Unknown data analysis kind');
} catch (error) {
  const known = error.name === 'CryptoAnalysisError' || /^(INVALID_PROTOCOL_(ARGUMENT|SCHEMA|ENCODING|STATE)|PROTOCOL_(INPUT|STATE)_LIMIT|UNSUPPORTED_CAPTURE_FORMAT|INVALID_VM_OBSERVATION|VM_OBSERVATION_LIMIT|INVALID_RECORDED_HANDLER)$/.test(error.code || '');
  parentPort.postMessage({ ok: false, error: { code: known ? error.code : 'ANALYSIS_FAILED', message: known ? String(error.message).slice(0, 512) : 'Data analysis failed; no output was committed' } });
}
