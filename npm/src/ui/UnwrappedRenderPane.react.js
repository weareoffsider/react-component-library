"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnwrappedRenderComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _bem = require("js-kit/dom/bem");

var _bem2 = _interopRequireDefault(_bem);

var _svg = require("./svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnwrappedRenderPane = function (_Component) {
  _inherits(UnwrappedRenderPane, _Component);

  function UnwrappedRenderPane() {
    _classCallCheck(this, UnwrappedRenderPane);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnwrappedRenderPane).apply(this, arguments));
  }

  _createClass(UnwrappedRenderPane, [{
    key: "serialize",
    value: function serialize(props) {}
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var component = _props.component;
      var path = _props.path;
      var componentTestData = _props.componentTestData;
      var variationPage = _props.variationPage;
      var wrapper = _props.wrapper;
      var staticBuild = _props.staticBuild;

      var propSetKeys = Object.keys(componentTestData);
      var removeTestHref = staticBuild ? '..' : '?';

      var renders = propSetKeys.filter(function (key) {
        return key !== "pagedVariations";
      }).filter(function (key) {
        return variationPage ? key === variationPage : true;
      }).map(function (key) {
        var data = componentTestData[key];

        return _react2.default.createElement(UnwrappedRenderComponent, {
          'key': key,
          'title': key,
          'component': component,
          'wrapper': wrapper,
          'data': data
        });
      });

      return _react2.default.DOM.div({}, renders, _react2.default.DOM.a({
        'href': removeTestHref,
        className: 'ComponentServer__RemoveTestMode '
      }, _react2.default.DOM.span({ dangerouslySetInnerHTML: { __html: (0, _svg.browserExpandIcon)('ComponentServer__RemoveTestModeIcon') } }), _react2.default.DOM.span({ className: 'ComponentServer__RemoveTestModeLabel ' }, 'Show Component Browser')));
    }
  }]);

  return UnwrappedRenderPane;
}(_react.Component);

exports.default = UnwrappedRenderPane;

var UnwrappedRenderComponent = exports.UnwrappedRenderComponent = function (_Component2) {
  _inherits(UnwrappedRenderComponent, _Component2);

  function UnwrappedRenderComponent() {
    _classCallCheck(this, UnwrappedRenderComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnwrappedRenderComponent).apply(this, arguments));
  }

  _createClass(UnwrappedRenderComponent, [{
    key: "render",
    value: function render() {
      var _props2 = this.props;
      var component = _props2.component;
      var title = _props2.title;
      var data = _props2.data;
      var wrapper = _props2.wrapper;


      return wrapper(component, data);
    }
  }]);

  return UnwrappedRenderComponent;
}(_react.Component);