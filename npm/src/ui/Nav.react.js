"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _svg = require("./svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_Component) {
  _inherits(Nav, _Component);

  function Nav() {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).apply(this, arguments));
  }

  _createClass(Nav, [{
    key: "spaceCamelCase",
    value: function spaceCamelCase(title) {
      return title.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
        return str.toUpperCase();
      });
    }
  }, {
    key: "renderSection",
    value: function renderSection(tree, components, path) {
      var _this2 = this;

      var fullPath = '/' + path.join('/');
      var links = components.map(function (c) {
        var route = fullPath + '/' + c;
        var fragments = c.split('/');
        var undupedFragments = fragments.length == 1 ? fragments : fragments.filter(function (frag) {
          return !fragments.every(function (f) {
            return f.indexOf(frag) != -1;
          });
        });

        var pagedVariations = Object.keys(tree[c]).filter(function (k) {
          return k !== "_component";
        });

        var variationLinks = pagedVariations.map(function (page) {
          return _react2.default.DOM.li({
            'key': page,
            className: 'ComponentServerNav__pageLi '
          }, _react2.default.DOM.a({
            'href': route + '/' + page,
            className: 'ComponentServerNav__pageLink '
          }, _this2.spaceCamelCase(page)));
        });

        return _react2.default.DOM.li({
          'key': c,
          className: 'ComponentServerNav__sectionLi '
        }, _react2.default.DOM.a({
          'href': route,
          className: 'ComponentServerNav__sectionLink '
        }, undupedFragments.join('/')), variationLinks.length > 0 ? _react2.default.DOM.ul({ className: 'ComponentServerNav__sectionLinkPages ' }, variationLinks) : null);
      });

      return _react2.default.DOM.section({
        'key': fullPath,
        className: 'ComponentServerNav__section '
      }, _react2.default.DOM.h2({
        className: 'ComponentServerNav__sectionHeader ',
        dangerouslySetInnerHTML: { __html: (0, _svg.folderIcon)('ComponentServerNav__sectionIcon') + ' ' + path.join('/') }
      }), _react2.default.DOM.ul({ className: 'ComponentServerNav__sectionLinks ' }, links));
    }
  }, {
    key: "delveTree",
    value: function delveTree(sections, tree, path) {
      var _this3 = this;

      var treeKeys = Object.keys(tree).filter(function (k) {
        return k !== "_directory";
      });
      var directories = treeKeys.filter(function (k) {
        return tree[k]._directory;
      });
      var components = treeKeys.filter(function (k) {
        return tree[k]._component;
      });

      var sectionsNext = components.length > 0 ? sections.concat(this.renderSection(tree, components, path)) : sections;

      return directories.reduce(function (acc, dir) {
        return _this3.delveTree(acc, tree[dir], path.concat([dir]));
      }, sectionsNext);
    }
  }, {
    key: "flattenTree",
    value: function flattenTree(wholeTree) {
      var checkLeafFlat = function checkLeafFlat(leaf) {
        if (Object.keys(leaf).length > 2) {
          var keys = Object.keys(leaf).filter(function (lk) {
            return lk !== "_directory" && lk !== "_component";
          });

          var areVariations = keys.every(function (k) {
            return leaf[k]._pagedVariation;
          });

          if (leaf._component && areVariations) {
            return true;
          }
        }

        if (Object.keys(leaf).length <= 2) {
          var key = Object.keys(leaf).filter(function (lk) {
            return lk !== "_directory" && lk !== "_component";
          })[0];
          if (leaf._directory) {
            return checkLeafFlat(leaf[key]);
          } else {
            return true;
          }
        } else {
          return false;
        }
      };

      var flattenLeaf = function flattenLeaf(path, leaf) {
        var key = Object.keys(leaf).filter(function (lk) {
          return lk !== "_directory" && lk !== "_component";
        })[0];

        if (leaf._directory) {
          return flattenLeaf(path.concat([key]), leaf[key]);
        } else {
          return [path, leaf];
        }
      };

      var flattenTree = function flattenTree(tree, base) {
        var newTree = {};

        Object.keys(tree).forEach(function (key) {
          if (key == "_directory" || key == "_component") {
            newTree[key] = true;
            return;
          }

          var leaf = tree[key];

          if (checkLeafFlat(leaf) && !base) {
            var _flattenLeaf = flattenLeaf([key], leaf);

            var _flattenLeaf2 = _slicedToArray(_flattenLeaf, 2);

            var path = _flattenLeaf2[0];
            var end = _flattenLeaf2[1];

            newTree[path.join('/')] = end;
          } else {
            newTree[key] = flattenTree(leaf);
          }
        });

        return newTree;
      };

      return flattenTree(wholeTree, true);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var tree = _props.tree;
      var staticBuild = _props.staticBuild;

      var flatTree = this.flattenTree((0, _lodash.cloneDeep)(tree));
      var sections = this.delveTree([], flatTree, []);

      var testHref = staticBuild ? './test' : '?test';

      return _react2.default.DOM.nav({ className: 'ComponentServerNav ' }, _react2.default.DOM.header({ className: 'ComponentServerNav__header ' }, _react2.default.DOM.span({ dangerouslySetInnerHTML: { __html: (0, _svg.squiggleIcon)('ComponentServerNav__headerIcon') } }), _react2.default.DOM.span({ className: 'ComponentServerNav__headerTitle ' }, 'Component Library'), _react2.default.DOM.a({
        'href': testHref,
        className: 'ComponentServerNav__testModeLink ',
        dangerouslySetInnerHTML: { __html: (0, _svg.browserCollapseIcon)() }
      })), _react2.default.DOM.main({ className: 'ComponentServerNav__bd ' }, sections));
    }
  }]);

  return Nav;
}(_react.Component);

exports.default = Nav;