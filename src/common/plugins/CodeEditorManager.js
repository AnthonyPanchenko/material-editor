const CodeEditorManager = {
  history: {},
  cursor: {},
  selections: {},
  install(Vue, options) {
    Vue.prototype.$getSelections = (type) => this.selections[type];
    Vue.prototype.$setSelections = (type, value) => {
      this.selections[type] = JSON.parse(JSON.stringify(value));
    };

    Vue.prototype.$getCursor = (type) => this.cursor[type];
    Vue.prototype.$setCursor = (type, value) => {
      this.cursor[type] = JSON.parse(JSON.stringify(value));
    };

    Vue.prototype.$getHistory = (type) => this.history[type];
    Vue.prototype.$setHistory = (type, value) => {
      this.history[type] = JSON.parse(JSON.stringify(value));
    };

    Vue.prototype.$resetCodeEditorManager = () => {
      this.history = {};
      this.cursor = {};
      this.selections = {};
    };
  }
};

export default CodeEditorManager;
