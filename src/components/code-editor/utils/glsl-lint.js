// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

import CodeMirror from 'codemirror';

const parseErrors = (errors) => {
  const output = [];

  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];
    if (error) {
      let index;
      const linetabpositions = [];

      // all tabs with spaces then performs some checks. The error
      // positions (character/space) are then reported incorrectly,
      // not taking the replacement step into account. Here we look
      // at the evidence line and try to adjust the character position
      // to the correct value.
      if (error.evidence) {
        // Tab positions are computed once per line and cached
        let tabpositions = linetabpositions[error.line];
        if (!tabpositions) {
          const evidence = error.evidence;
          tabpositions = [];
          // ugggh phantomjs does not like this
          // forEachChar(evidence, function(item, index) {
          Array.prototype.forEach.call(evidence, (item, index) => {
            if (item === '\t') {
              // First col is 1 (not 0) to match error positions
              tabpositions.push(index + 1);
            }
          });

          linetabpositions[error.line] = tabpositions;
        }

        if (tabpositions.length > 0) {
          let pos = error.character;
          tabpositions.forEach(tabposition => {
            if (pos > tabposition) {
              pos -= 1;
            }
          });
          error.character = pos;
        }
      }

      const start = error.character - 1;
      let end = start + 1;

      if (error.evidence) {
        index = error.evidence.substring(start).search(/.\b/);
        if (index > -1) {
          end += index;
        }
      }

      error.start = error.character;
      error.end = end;

      if (error) {
        output.push({
          message: error.description,
          severity: error.severity,
          from: CodeMirror.Pos(error.line - 1, start),
          to: CodeMirror.Pos(error.line - 1, end)
        });
      }
    }
  }

  return output;
};

const validator = (text, options, cm) => {
  const errors = [{
    id: 'dfgkjhsegi3o45690236',
    severity: 'error',
    description: 'Expected an assignment or function call and instead saw an expression.',
    evidence: 'uniform vec2 u_resolution;',
    character: 1,
    line: 1,
    start: 1,
    end: 7
  },
  {
    id: 'ewr3566ti789789erodfgl',
    severity: 'warning',
    description: 'Expected an assignment or function call and instead saw an expression.',
    evidence: 'uniform vec2 u_resolution;',
    character: 1,
    line: 2,
    start: 1,
    end: 7
  }];

  return parseErrors(errors);
}

CodeMirror.registerHelper('lint', 'glsl', validator);
