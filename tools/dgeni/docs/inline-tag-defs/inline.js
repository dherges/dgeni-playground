module.exports = function inlineTagDef(log) {
  return {
    name: 'inline',
    description: 'Process inline tags of the form {@inline some/uri Some Title}',
    handler: function(doc, tagName, tagDescription) {
console.log("tagDescription: ", tagDescription);
console.log("tagName: ", tagName);
console.log("doc", doc);

      return `<foo>bar!</foo>`;
    }
  };
};
