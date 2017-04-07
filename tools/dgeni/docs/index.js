/*
 * Dgeni Package for testing purposes.
 */

const Dgeni = require('dgeni');
const DgeniPackage = Dgeni.Package;

const path = require('path');

const basePackage = require('dgeni-packages/base');
const nunjucksPackage = require('dgeni-packages/nunjucks');



const DOCS_PACKAGE = new DgeniPackage('my-docs-package', [
  basePackage,
  nunjucksPackage
])

.processor(require('./processors/samplesFileReader'))

.config(function (readFilesProcessor, writeFilesProcessor, samplesFileReader) {
  // Specify the base path used when resolving relative paths to source and output files
  readFilesProcessor.basePath = path.resolve(__dirname, '../../../');
  readFilesProcessor.$enabled = true; // disable for now as we are using readTypeScriptModules

  // Specify collections of source files that should contain the documentation to extract
  readFilesProcessor.sourceFiles = [
    {
      include: 'src/content/**/*.md',
      exclude: ['**/README.md'],
      fileReader: 'samplesFileReader'
    }
  ];

  // Add samplesFileReader to the list of file readers
  if (readFilesProcessor.fileReaders) {
    readFilesProcessor.fileReaders.push(samplesFileReader);
  } else {
    readFilesProcessor.fileReaders = [ samplesFileReader ];
  }

  // Output folder
  writeFilesProcessor.outputFolder = 'dist/docs';

})

// Configure the output path for written files (i.e., file names).
.config(function(computeIdsProcessor, computePathsProcessor) {
  computeIdsProcessor.idTemplates = [
    {
      docTypes: ['samples'],
      idTemplate: 'sample-${name}',
      getAliases: (doc) => ['' + doc.name]
    }
  ];

  computePathsProcessor.pathTemplates = [ // XX: is it possible to output the same document in two formats?
    {
      docTypes: ['samples'],
      pathTemplate: '${name}',
      outputPathTemplate: '${name}.html',
    },
    {
      docTypes: ['samples'],
      pathTemplate: '${name}',
      outputPathTemplate: '${name}.json'
    }
  ];
})

// Configure processor for finding nunjucks templates.
.config(function(templateFinder) {
  // Where to find the templates for the doc rendering
  templateFinder.templateFolders = [ 'tools/dgeni/docs/templates' ];

  // Standard patterns for matching docs to templates
  templateFinder.templatePatterns = [
    '${ doc.docType }.template.html', // XX: also, is it possible to select template based on output file extension?
    '${ doc.docType }.template.json'
  ];
})

module.exports = DOCS_PACKAGE
