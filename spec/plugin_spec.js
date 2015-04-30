var plugin = require('../index');

// results of every analysis will be delivered in similar format
var mockedResults = [
  {
    "_id": {
      "key": "_id"
    },
    "value": {
      "types": [
        "ObjectId"
      ]
    },
    "totalOccurrences": 5,
    "percentContaining": 100
  },
  {
    "_id": {
      "key": "pets"
    },
    "value": {
      "types": [
        "Array",
        "String"
      ]
    },
    "totalOccurrences": 2,
    "percentContaining": 40
  }
];

var expectedOutputFourColumns =
'\\documentclass{article}' + '\n' +
'\\begin{document}' + '\n' +
'    \\begin{center}' + '\n' +
'         \\begin{tabular}{|c|c|c|c|} \\hline' + '\n' +
'            key & types & occurrences & percents \\\\ \\hline' + '\n' +
'            \\_id & ObjectId & 5 & 100.0 \\\\ \\hline' + '\n' +
'            pets & Array,String & 2 & 40.0 \\\\ \\hline' + '\n' +
'        \\end{tabular}' + '\n' +
'    \\end{center}' + '\n' +
'\\end{document}';

var expectedOutputTwoColumns =
'\\documentclass{article}' + '\n' +
'\\begin{document}' + '\n' +
'    \\begin{center}' + '\n' +
'         \\begin{tabular}{|c|c|} \\hline' + '\n' +
'            key & types \\\\ \\hline' + '\n' +
'            \\_id & ObjectId \\\\ \\hline' + '\n' +
'            pets & Array,String \\\\ \\hline' + '\n' +
'        \\end{tabular}' + '\n' +
'    \\end{center}' + '\n' +
'\\end{document}';


describe('Latex plugin for Variety', function() {

  it('should format results to Latex', function() {
    // let our plugin transform the variety results into own representation
    var output = plugin.formatResults(mockedResults);

    // verify, that plugin transformed data to expected format
    // https://jasmine.github.io/1.3/introduction.html#section-Expectations
    expect(output).toEqual(expectedOutputFourColumns);
  });

  it('should handle number of columns passed through the plugin config', function() {

    plugin.init({'numColumns': '2'});

    // let our plugin transform the variety results into own representation
    var output = plugin.formatResults(mockedResults);

    // verify, that plugin transformed data to expected format
    // https://jasmine.github.io/1.3/introduction.html#section-Expectations
    expect(output).toEqual(expectedOutputTwoColumns);
  });
});