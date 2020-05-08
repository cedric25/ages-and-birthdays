export const importFromGoogleMutations = {
  setDoingImportFromGoogle(state, isDoing) {
    state.doingImportFromGoogle = isDoing
  },
  setImportFromGoogleDone(state, isDone) {
    state.isImportFromGoogleDone = isDone
  },
  setTotalConnections(state, totalConnections) {
    state.totalConnections = totalConnections
  },
}
