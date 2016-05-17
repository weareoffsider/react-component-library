"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectComponents;

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attachFragments = function attachFragments(tree, fragments) {
  var pages = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  var frag = fragments[0];

  if (fragments.length > 1) {
    tree[frag] = attachFragments(tree[frag] || { _directory: true }, fragments.slice(1), pages);
    return tree;
  } else {
    tree[frag] = { _component: true };
    if (pages.length > 1) {
      pages.forEach(function (page) {
        tree[frag][page] = { _pagedVariation: true };
      });
    }

    return tree;
  }
};

function collectComponents(base, matcher, testGetter, baseDir, cb) {
  (0, _glob2.default)(matcher, {
    cwd: base
  }, function (er, files) {
    var pathList = files;

    var fullTree = files.reduce(function (tree, componentPath) {
      var mod = require(baseDir + '/' + componentPath);
      var component = mod.default ? mod.default : mod;
      var testData = testGetter(component, baseDir + '/' + componentPath);

      var pages = testData.pagedVariations ? Object.keys(testData).filter(function (key) {
        return key !== 'pagedVariations';
      }) : [];

      var fragments = componentPath.split(_path2.default.sep);
      return attachFragments(tree, fragments, pages);
    }, {});

    cb({ pathList: pathList, fullTree: fullTree });
  });
}