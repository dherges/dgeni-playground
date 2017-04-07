const path = require('path');

module.exports = function samplesFileReader() {

  return {
    name: 'samplesFileReader',
    defaultPattern: /\.md$/,
    getDocs: function(fileInfo) {
console.log("read ", fileInfo);
      // We return a single element array because content files only contain one document
      return [{
        docType: 'samples',
        content: fileInfo.content,
        fileName: path.basename(fileInfo.relativePath),
        name: fileInfo.baseName,
        startingLine: 1
      }];
    }
  };
};
