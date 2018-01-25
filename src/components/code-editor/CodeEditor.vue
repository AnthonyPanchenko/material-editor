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
  [shadersTypes.VERTEX_SHADER]: { done: [], undone: [] }
};

export default {
  name: 'CodeEditor',
  props: {
    activeShader: String,
    shaders: {
      type: Object,
      required: true
    },
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
      shadersTypes,
      editor: null,
      modes: {
        [shadersTypes.FRAGMENT_SHADER]: 'x-shader/x-fragment',
        [shadersTypes.VERTEX_SHADER]: 'x-shader/x-vertex'
      },
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
    activeShader(type) {
      this.editor.setOption('value', this.shaders[type]);
      this.editor.setOption('mode', this.modes[type]);
      this.editor.setHistory(editorHistory[type]);
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
    this.editor = CodeMirror(this.$refs.editor, this.options);
    this.editor.setOption('value', this.shaders[this.activeShader]);
    this.editor.setOption('mode', this.modes[this.activeShader]);
    this.editor.setHistory(editorHistory[this.activeShader]);
    this.editor.on('change', this.onChangeCode);

    CodeMirror.commands.save = this.onSaveCode;
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  render(createElement) {
    return createElement('div', { class: 'code-editor', ref: 'editor' });
  }
}
</script>
