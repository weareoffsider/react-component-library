"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Nav = require("./Nav.react");

var _Nav2 = _interopRequireDefault(_Nav);

var _RenderPane = require("./RenderPane.react");

var _RenderPane2 = _interopRequireDefault(_RenderPane);

var _UnwrappedRenderPane = require("./UnwrappedRenderPane.react");

var _UnwrappedRenderPane2 = _interopRequireDefault(_UnwrappedRenderPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var fullTree = _props.fullTree;
      var path = _props.path;
      var component = _props.component;
      var componentTestData = _props.componentTestData;
      var wrapper = _props.wrapper;
      var variationPage = _props.variationPage;
      var testMode = _props.testMode;


      if (testMode) {
        return _react2.default.createElement(_UnwrappedRenderPane2.default, {
          'component': component,
          'variationPage': variationPage,
          'componentTestData': componentTestData,
          'wrapper': wrapper
        });
      } else {
        return _react2.default.DOM.div({ className: 'ComponentServer ' }, _react2.default.createElement(_Nav2.default, {
          'tree': fullTree,
          'currentPath': path
        }), component ? _react2.default.createElement(_RenderPane2.default, {
          'component': component,
          'variationPage': variationPage,
          'componentTestData': componentTestData,
          'wrapper': wrapper
        }) : _react2.default.DOM.h1({}, 'Index'));
      }
    }
  }]);

  return Layout;
}(_react.Component);

exports.default = Layout;