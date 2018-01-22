// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

import CodeMirror from 'codemirror';

'use strict';

function Context(indented, column, type, info, align, prev) {
  this.indented = indented;
  this.column = column;
  this.type = type;
  this.info = info;
  this.align = align;
  this.prev = prev;
}

function pushContext(state, col, type, info) {
  var indent = state.indented;
  if (state.context && state.context.type === 'statement' && type !== 'statement') {
    indent = state.context.indented;
  }

  state.context = new Context(indent, col, type, info, null, state.context);

  return state.context;
}

function popContext(state) {
  var t = state.context.type;
  if (t === ')' || t === ']' || t === '}') {
    state.indented = state.context.indented;
  }

  state.context = state.context.prev;

  return state.context;
}

function typeBefore(stream, state, pos) {
  if (state.prevToken === 'variable' || state.prevToken === 'type') return true;
  if (/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(stream.string.slice(0, pos))) return true;
  if (state.typeAtEndOfLine && stream.column() === stream.indentation()) return true;
}

function isTopScope(context) {
  for (; ;) {
    if (!context || context.type === 'top') return true;
    if (context.type === '}' && context.prev.info !== 'namespace') return false;
    context = context.prev;
  }
}

CodeMirror.defineMode('glsl', function (config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndentUnit = parserConfig.statementIndentUnit || indentUnit;
  var dontAlignCalls = parserConfig.dontAlignCalls;
  var keywords = parserConfig.keywords || {};
  var types = parserConfig.types || {};
  var builtin = parserConfig.builtin || {};
  var blockKeywords = parserConfig.blockKeywords || {};
  var defKeywords = parserConfig.defKeywords || {};
  var atoms = parserConfig.atoms || {};
  var hooks = parserConfig.hooks || {};
  var multiLineStrings = parserConfig.multiLineStrings;
  var indentStatements = parserConfig.indentStatements !== false;
  var indentSwitch = parserConfig.indentSwitch !== false;
  var namespaceSeparator = parserConfig.namespaceSeparator;
  var isPunctuationChar = parserConfig.isPunctuationChar || /[\[\]{}\(\),;\:\.]/;
  var numberStart = parserConfig.numberStart || /[\d\.]/;
  var number = parserConfig.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i;
  var isOperatorChar = parserConfig.isOperatorChar || /[+\-*&%=<>!?|\/]/;
  var isIdentifierChar = parserConfig.isIdentifierChar || /[\w\$_\xa1-\uffff]/;

  var curPunc, isDefKeyword;

  function tokenBase(stream, state) {
    var ch = stream.next();
    if (hooks[ch]) {
      var result = hooks[ch](stream, state);
      if (result !== false) return result;
    }

    if (ch === '"' || ch === "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }

    if (isPunctuationChar.test(ch)) {
      curPunc = ch;
      return null;
    }

    if (numberStart.test(ch)) {
      stream.backUp(1)
      if (stream.match(number)) return 'number'
      stream.next()
    }

    if (ch === '/') {
      if (stream.eat('*')) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      }
      if (stream.eat('/')) {
        stream.skipToEnd();
        return 'comment';
      }
    }

    if (isOperatorChar.test(ch)) {
      while (!stream.match(/^\/[\/*]/, false) && stream.eat(isOperatorChar)) { }
      return 'operator';
    }

    stream.eatWhile(isIdentifierChar);
    if (namespaceSeparator) {
      while (stream.match(namespaceSeparator)) {
        stream.eatWhile(isIdentifierChar);
      }
    }

    var cur = stream.current();
    if (contains(keywords, cur)) {
      if (contains(blockKeywords, cur)) curPunc = 'newstatement';
      if (contains(defKeywords, cur)) isDefKeyword = true;
      return 'keyword';
    }

    if (contains(types, cur)) return 'type';
    if (contains(builtin, cur)) {
      if (contains(blockKeywords, cur)) curPunc = 'newstatement';
      return 'builtin';
    }
    if (contains(atoms, cur)) return 'atom';
    return 'variable';
  }

  function tokenString(quote) {
    return function (stream, state) {
      var escaped = false;
      var next;
      var end = false;

      while ((next = stream.next()) != null) {
        if (next === quote && !escaped) { end = true; break; }
        escaped = !escaped && next === '\\';
      }

      if (end || !(escaped || multiLineStrings)) { state.tokenize = null; }
      return 'string';
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false;
    var ch;

    while (ch = stream.next()) { // eslint-disable-line
      if (ch === '/' && maybeEnd) {
        state.tokenize = null;
        break;
      }
      maybeEnd = (ch === '*');
    }
    return 'comment';
  }

  function maybeEOL(stream, state) {
    if (parserConfig.typeFirstDefinitions && stream.eol() && isTopScope(state.context)) {
      state.typeAtEndOfLine = typeBefore(stream, state, stream.pos)
    }
  }

  // Interface

  return {
    startState: function (basecolumn) {
      return {
        tokenize: null,
        context: new Context((basecolumn || 0) - indentUnit, 0, 'top', null, false),
        indented: 0,
        startOfLine: true,
        prevToken: null
      };
    },

    token: function (stream, state) {
      var ctx = state.context;
      if (stream.sol()) {
        if (ctx.align == null) ctx.align = false;
        state.indented = stream.indentation();
        state.startOfLine = true;
      }
      if (stream.eatSpace()) { maybeEOL(stream, state); return null; }
      curPunc = isDefKeyword = null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style === 'comment' || style === 'meta') return style;
      if (ctx.align == null) ctx.align = true;

      if (curPunc === ';' || curPunc === ':' || (curPunc === ',' && stream.match(/^\s*(?:\/\/.*)?$/, false))) {
        while (state.context.type === 'statement') {
          popContext(state);
        }
      } else if (curPunc === '{') pushContext(state, stream.column(), '}');
      else if (curPunc === '[') pushContext(state, stream.column(), ']');
      else if (curPunc === '(') pushContext(state, stream.column(), ')');
      else if (curPunc === '}') {
        while (ctx.type === 'statement') ctx = popContext(state);
        if (ctx.type === '}') ctx = popContext(state);
        while (ctx.type === 'statement') ctx = popContext(state);
      } else if (curPunc === ctx.type) popContext(state);
      else if (indentStatements &&
        (((ctx.type === '}' || ctx.type === 'top') && curPunc !== ';') ||
          (ctx.type === 'statement' && curPunc === 'newstatement'))) {
        pushContext(state, stream.column(), 'statement', stream.current());
      }

      if (style === 'variable' && ((state.prevToken === 'def' || (parserConfig.typeFirstDefinitions && typeBefore(stream, state, stream.start) && isTopScope(state.context) && stream.match(/^\s*\(/, false))))) { style = 'def'; }

      if (hooks.token) {
        var result = hooks.token(stream, state, style);
        if (result !== undefined) style = result;
      }

      if (style === 'def' && parserConfig.styleDefs === false) style = 'variable';

      state.startOfLine = false;
      state.prevToken = isDefKeyword ? 'def' : style || curPunc;
      maybeEOL(stream, state);
      return style;
    },

    indent: function (state, textAfter) {
      if (state.tokenize !== tokenBase && state.tokenize != null || state.typeAtEndOfLine) return CodeMirror.Pass;
      var ctx = state.context;
      var firstChar = textAfter && textAfter.charAt(0);

      if (ctx.type === 'statement' && firstChar === '}') ctx = ctx.prev;
      if (parserConfig.dontIndentStatements) {
        while (ctx.type === 'statement' && parserConfig.dontIndentStatements.test(ctx.info)) {
          ctx = ctx.prev;
        }
      }

      if (hooks.indent) {
        var hook = hooks.indent(state, ctx, textAfter);
        if (typeof hook === 'number') return hook
      }

      var closing = firstChar === ctx.type;
      var switchBlock = ctx.prev && ctx.prev.info === 'switch';
      if (parserConfig.allmanIndentation && /[{(]/.test(firstChar)) {
        while (ctx.type !== 'top' && ctx.type !== '}') ctx = ctx.prev
        return ctx.indented
      }

      if (ctx.type === 'statement') { return ctx.indented + (firstChar === '{' ? 0 : statementIndentUnit); }
      if (ctx.align && (!dontAlignCalls || ctx.type !== ')')) { return ctx.column + (closing ? 0 : 1); }
      if (ctx.type === ')' && !closing) { return ctx.indented + statementIndentUnit; }

      return ctx.indented + (closing ? 0 : indentUnit) +
        (!closing && switchBlock && !/^(?:case|default)\b/.test(textAfter) ? indentUnit : 0);
    },

    electricInput: indentSwitch ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
    blockCommentStart: '/*',
    blockCommentEnd: '*/',
    blockCommentContinue: ' * ',
    lineComment: '//',
    fold: 'brace'
  };
});

function words(str) {
  var obj = {};
  var words = str.split(' ');

  for (var i = 0; i < words.length; ++i) {
    obj[words[i]] = true;
  }

  return obj;
}

function contains(words, word) {
  if (typeof words === 'function') {
    return words(word);
  } else {
    return words.propertyIsEnumerable(word);
  }
}

function cppHook(stream, state) {
  if (!state.startOfLine) return false
  for (var ch, next = null; ch = stream.peek();) { // eslint-disable-line
    if (ch === '\\' && stream.match(/^.$/)) {
      next = cppHook
      break
    } else if (ch === '/' && stream.match(/^\/[\/\*]/, false)) {
      break
    }
    stream.next()
  }
  state.tokenize = next
  return 'meta'
}

function def(mimes, mode) {
  if (typeof mimes === 'string') mimes = [mimes];
  var words = [];
  function add(obj) {
    if (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          words.push(prop);
        }
      }
    }
  }

  add(mode.keywords);
  add(mode.types);
  add(mode.builtin);
  add(mode.atoms);

  if (words.length) {
    mode.helperType = mimes[0];
    CodeMirror.registerHelper('hintWords', mimes[0], words);
  }

  for (var i = 0; i < mimes.length; ++i) {
    CodeMirror.defineMIME(mimes[i], mode);
  }
}

def(['x-shader/x-vertex', 'x-shader/x-fragment'], {
  name: 'glsl',
  keywords: words('sampler1D sampler2D sampler3D samplerCube ' +
    'sampler1DShadow sampler2DShadow ' +
    'const attribute uniform varying ' +
    'break continue discard return ' +
    'for while do if else struct ' +
    'in out inout'),
  types: words('float int bool void ' +
    'vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 ' +
    'mat2 mat3 mat4'),
  blockKeywords: words('for while do if else struct'),
  builtin: words('radians degrees sin cos tan asin acos atan ' +
    'pow exp log exp2 sqrt inversesqrt ' +
    'abs sign floor ceil fract mod min max clamp mix step smoothstep ' +
    'length distance dot cross normalize ftransform faceforward ' +
    'reflect refract matrixCompMult ' +
    'lessThan lessThanEqual greaterThan greaterThanEqual ' +
    'equal notEqual any all not ' +
    'texture1D texture1DProj texture1DLod texture1DProjLod ' +
    'texture2D texture2DProj texture2DLod texture2DProjLod ' +
    'texture3D texture3DProj texture3DLod texture3DProjLod ' +
    'textureCube textureCubeLod ' +
    'shadow1D shadow2D shadow1DProj shadow2DProj ' +
    'shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod ' +
    'dFdx dFdy fwidth ' +
    'noise1 noise2 noise3 noise4'),
  atoms: words('true false ' +
    'gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex ' +
    'gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 ' +
    'gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 ' +
    'gl_FogCoord gl_PointCoord ' +
    'gl_Position gl_PointSize gl_ClipVertex ' +
    'gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor ' +
    'gl_TexCoord gl_FogFragCoord ' +
    'gl_FragCoord gl_FrontFacing ' +
    'gl_FragData gl_FragDepth ' +
    'gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix ' +
    'gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse ' +
    'gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse ' +
    'gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose ' +
    'gl_ProjectionMatrixInverseTranspose ' +
    'gl_ModelViewProjectionMatrixInverseTranspose ' +
    'gl_TextureMatrixInverseTranspose ' +
    'gl_NormalScale gl_DepthRange gl_ClipPlane ' +
    'gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel ' +
    'gl_FrontLightModelProduct gl_BackLightModelProduct ' +
    'gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ ' +
    'gl_FogParameters ' +
    'gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords ' +
    'gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats ' +
    'gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits ' +
    'gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits ' +
    'gl_MaxDrawBuffers'),
  indentSwitch: false,
  hooks: { '#': cppHook },
  modeProps: { fold: ['brace', 'include'] }
});
