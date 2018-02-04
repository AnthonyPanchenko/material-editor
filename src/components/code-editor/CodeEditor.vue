<script>
import CodeMirror from 'codemirror';
import noop from '../../common/utils/noop';
import specialCharPlaceholder from './utils/specialCharPlaceholder';
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

export default {
  name: 'CodeEditor',
  props: {
    activeShader: String,
    shaders: { type: Object, required: true },
    onChange: { type: Function, default: noop },
    onSave: { type: Function, default: noop }
  },
  data() {
    return {
      editor: null,
      modes: {
        [shadersTypes.FRAGMENT_SHADER]: 'x-shader/x-fragment',
        [shadersTypes.VERTEX_SHADER]: 'x-shader/x-vertex'
      },
      payload: { value: '', type: '' },
      options: {
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        inputStyle: 'contenteditable',
        highlightSelectionMatches: true,
        specialChars: /[\u0022]/,
        specialCharPlaceholder,
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
    activeShader(nextType, prevType) {
      this.$setCursor(prevType, this.editor.getCursor());
      this.$setHistory(prevType, this.editor.getHistory());
      this.$setSelections(prevType, this.editor.listSelections());
      this.editor.clearHistory();

      this.editor.setOption('value', this.shaders[nextType].value);
      this.editor.setOption('mode', this.modes[nextType]);

      this.setupEditor(nextType);
    }
  },
  methods: {
    setupEditor(type) {
      const history = this.$getHistory(type);
      const cursor = this.$getCursor(type);
      const selections = this.$getSelections(type);

      if (history) {
        this.editor.setHistory(history);
      }

      this.editor.focus();

      if (cursor) {
        this.editor.setCursor(cursor.line, cursor.ch);
      }

      if (selections) {
        this.editor.setSelections(selections);
      }
    },
    onChangeCode(cm) {
      this.payload.value = cm.getValue().replace(/"/g, '');
      this.payload.type = this.activeShader;

      this.onChange(this.payload);
    },
    onSaveCode(cm) {
      this.payload.value = cm.getValue().replace(/"/g, '');
      this.payload.type = this.activeShader;

      this.onSave(this.payload);
    }
  },
  mounted() {
    this.editor = CodeMirror(this.$refs.editor, this.options);
    this.editor.setOption('value', this.shaders[this.activeShader].value);
    this.editor.setOption('mode', this.modes[this.activeShader]);

    this.setupEditor(this.activeShader);

    this.editor.on('change', this.onChangeCode);

    CodeMirror.commands.save = this.onSaveCode;
  },
  beforeDestroy() {
    this.$setCursor(this.activeShader, this.editor.getCursor());
    this.$setHistory(this.activeShader, this.editor.getHistory());
    this.$setSelections(this.activeShader, this.editor.listSelections());
  },
  render(createElement) {
    return createElement('div', { class: 'code-editor', ref: 'editor' });
  }
}
</script>
