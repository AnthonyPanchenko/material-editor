const CodeEditorHistory = {
  history: {},
  install(Vue, options) {
    Vue.prototype.$setCodeEditorHistory = (type, value) => {
      this.history[type] = JSON.parse(JSON.stringify(value));
    };

    Vue.prototype.$getCodeEditorHistory = (type) => {
      return this.history[type];
    };

    Vue.prototype.$resetCodeEditorHistory = () => {
      this.history = {};
    };
  }
};

export default CodeEditorHistory;
