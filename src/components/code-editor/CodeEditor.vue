<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

export default {
  name: 'CodeEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      codeEditor: null,
      options: {
        theme: 'monokai.css',
        mode: 'text/javascript',
        value: "function myScript(){return 100;}\n",
        lineNumbers: true,
        lineWrapping: true
      }
    }
  },
  mounted() {
    this.codeEditor = this.$refs.codeEditor;

    this.codemirror = CodeMirror(this.$refs.codeEditor, this.options);
    this.cminstance = this.codemirror.edit
  },
}
</script>

<template>
  <div class="code-editor" ref="codeEditor"></div>
</template>
