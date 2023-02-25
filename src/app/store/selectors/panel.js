export const panelState = state => ({
  allPanels: state.panels.all,
  navPanel: state.panels.left,
  rightPanel: state.panels.right,
  toolbox: state.panels.toolbox,
  settings: state.panels.settings,
});
