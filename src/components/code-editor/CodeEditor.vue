<script>
import CodeMirror from 'codemirror';
import noop from '../../common/utils/noop';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/wrap/hardwrap';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/keymap/sublime';

import './utils/glsl-lint';
import './utils/glsl-mode';

export default {
  name: 'CodeEditor',
  props: {
    value: {
      type: String,
      default: 'uniform vec2 u_resolution;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvoid main() {\n vec2 st = gl_FragCoord.xy/u_resolution.xy;\n gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n}'
    },
    onSave: {
      type: Function,
      default: noop
    },
    mode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      codeEditor: null,
      options: {
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        inputStyle: 'contenteditable',
        highlightSelectionMatches: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        matchBrackets: true,
        lintOnChange: true,
        lineWrapping: true,
        foldGutter: true,
        lineNumbers: true,
        keyMap: 'sublime',
        dragDrop: true,
        lint: true,
        tabSize: 2,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        foldOptions: { widget: '' }
      }
    }
  },
  mounted() {
    this.codeEditor = this.$refs.codeEditor;

    this.codemirror = CodeMirror(this.$refs.codeEditor, { ...this.options, value: this.value, mode: this.mode });
    this.cminstance = this.codemirror.edit
  },
}
</script>

<template>
  <div class="code-editor" ref="codeEditor"></div>
</template>
