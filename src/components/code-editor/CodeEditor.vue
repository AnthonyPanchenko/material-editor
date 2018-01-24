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

const shadersModes = {
  [shadersTypes.FRAGMENT_SHADER]: 'x-shader/x-fragment',
  [shadersTypes.VERTEX_SHADER]: 'x-shader/x-vertex'
};

export default {
  name: 'CodeEditor',
  props: {
    activeShader: String,
    shader: String,
    onChange: {
      type: Function,
      default: noop
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
    shader(value) {
      this.editor.setOption('value', value);
      this.editor.setOption('mode', shadersModes[this.activeShader]);
      this.editor.setHistory(editorHistory[this.activeShader]);
    }
  },
  methods: {
    onChangeCode(cm) {
      this.onChange(cm.getValue(), this.activeShader, cm);
      editorHistory[this.activeShader] = this.editor.getHistory();
    },
    onSaveCode(cm) {
      this.onSave(cm.getValue(), this.activeShader, cm);
    }
  },
  mounted() {
    this.editor = CodeMirror(this.$refs.codeEditor, this.options);

    this.editor.setOption('value', this.shader);
    this.editor.setOption('mode', shadersModes[this.activeShader]);
    this.editor.setHistory(editorHistory[this.activeShader]);
    this.editor.on('change', this.onChangeCode);

    CodeMirror.commands.save = this.onSaveCode;
  },
  render(createElement) {
    return createElement('div', { class: 'code-editor', ref: 'codeEditor' });
  }
}
</script>
