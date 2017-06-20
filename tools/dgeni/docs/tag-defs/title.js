module.exports = function() {
    return {name: 'title'};

//  return {name: 'title', transforms: (doc, tag, value) => { console.log("tag", tag); console.log("value", value); return "abc"; }};
};
