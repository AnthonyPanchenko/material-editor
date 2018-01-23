<script>
import CodeMirror from 'codemirror';
import noop from '../../common/utils/noop';
import shadersTypes from '../../common/constants/shaders-types';
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

const editorHistory = {
  [shadersTypes.FRAGMENT_SHADER]: { done: [], undone: [] },
  [shadersTypes.VERTEX_SHADER]: { done: [], undone: [] },
};

export default {
  name: 'CodeEditor',
  props: {
    tabNames: {
      type: Object,
      required: true
    },
    activeShader: String,
    shader: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: 'uniform vec2 u_resolution;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvoid main() {\n vec2 st = gl_FragCoord.xy/u_resolution.xy;\n gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n}'
    },
    onSave: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      editor: null,
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
        autofocus: true,
        dragDrop: true,
        lint: true,
        tabSize: 2,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        foldOptions: { widget: '' }
      }
    }
  },

  watch: {
    // mode(val) {
    //   console.log(val);
    //   this.editor.setOption('mode', val);
    // },
    // value(val) {
    //   console.log(val);
    //   // console.log(this.editor.getHistory());
    //   // this.editor.setOption('value', val);

    //   this.editor = CodeMirror(this.$refs.codeEditor, this.options);

    //   this.editor.setValue(val);
    //   this.editor.setOption('mode', this.mode);
    // }
    shader(shdr) {
      console.log(shdr);
      // this.editor.setOption('value', val);

      // this.editor = CodeMirror(this.$refs.codeEditor, { ...this.options, mode: shdr.mode, value: shdr.value });

      // this.editor.setValue(this.value);
      this.editor.setOption('value', shdr.value);
      this.editor.setOption('mode', shdr.mode);
      this.editor.setHistory(editorHistory[this.activeShader]);
      editorHistory[this.activeShader] = this.editor.getHistory();
    }
  },

  methods: {
    onSaveCode(cm) {
      this.onSave(cm.getValue(), this.mode, cm);
    }
  },

  updated() {
    console.log(this.codeMirror);
  },

  mounted() {
    this.editor = CodeMirror(this.$refs.codeEditor, this.options);
    this.editor.setOption('value', this.shader.value);
    this.editor.setOption('mode', this.shader.mode);

    editorHistory[this.activeShader] = this.editor.getHistory();
    CodeMirror.commands.save = this.onSaveCode;
  },
  render(createElement) {
    return createElement('div', { class: 'code-editor', ref: 'codeEditor' });
  }
}
</script>
