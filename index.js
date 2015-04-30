var defaultHeaders = ['key', 'types', 'occurrences', 'percents'];

var strip = function(row, numColumns) {
  return row.slice(0, numColumns);
};

var getStringRows = function(results) {
  // return the number of decimal places or 1, if the number is int (1.23=>2, 100=>1, 0.1415=>4)
  var significantDigits = function(value) {
    var res = value.toString().match(/^[0-9]+\.([0-9]+)$/);
    return res !== null ? res[1].length : 1;
  };
  var maxDigits = Math.max.apply(null, results.map(function(value){return significantDigits(value.percentContaining);}));
  return results.map(function(row) {
    return [row._id.key, row.value.types, row.totalOccurrences, row.percentContaining.toFixed(maxDigits)];
  });
};

var getLatex = function(varietyResults) {

  var numColumns = this.numColumns || defaultHeaders.length;
  var headers = strip(defaultHeaders, numColumns);

  // escape all cells starting with the underscore character (for example the '_id' key)
  // https://tex.stackexchange.com/questions/34580/escape-character-in-latex/34586#34586
  rows = getStringRows(varietyResults).map(function(row){return row.map(function(cell) {
    return cell.toString().indexOf('_') === 0 ? '\\' + cell : cell;
  });});

  var table = [headers].concat(rows);
  var justification = '|' + headers.map(function(){return "c";}).join('|') + '|';
  var output = '\\documentclass{article}\n\\begin{document}\n' +
               '    \\begin{center}\n' +
               '         \\begin{tabular}{'+justification+'} \\hline\n';
  table.forEach(function(row) {
    output += '            ' + strip(row, numColumns).join(' & ') + ' \\\\ \\hline\n';
  });
  output += '        \\end{tabular}\n' +
            '    \\end{center}\n'+
            '\\end{document}';
  return output;
};

var setConfig = function(pluginConfig) {
  if(typeof pluginConfig.numColumns !== 'undefined') {
    this.numColumns = parseInt(pluginConfig.numColumns);
  }
};

module.exports = {
  init: setConfig,
  formatResults: getLatex
};
