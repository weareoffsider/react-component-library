"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _bem = require("js-kit/dom/bem");

var _bem2 = _interopRequireDefault(_bem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderPane = function (_Component) {
  _inherits(RenderPane, _Component);

  function RenderPane() {
    _classCallCheck(this, RenderPane);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RenderPane).apply(this, arguments));
  }

  _createClass(RenderPane, [{
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

      var propSetKeys = Object.keys(componentTestData);

      var renders = propSetKeys.filter(function (key) {
        return key !== "pagedVariations";
      }).filter(function (key) {
        return variationPage ? key === variationPage : true;
      }).map(function (key) {
        var data = componentTestData[key];

        return _react2.default.createElement(RenderComponent, {
          'key': key,
          'title': key,
          'component': component,
          'wrapper': wrapper,
          'data': data
        });
      });

      return _react2.default.DOM.main({ className: 'ComponentServerRenderPane ' }, _react2.default.DOM.header({ className: 'ComponentServerRenderPane__header ' }, _react2.default.DOM.h1({ className: 'ComponentServerRenderPane__title ' }, component.displayName || "DisplayName not provided")), renders);
    }
  }]);

  return RenderPane;
}(_react.Component);

exports.default = RenderPane;


var cx = (0, _bem2.default)("RenderComponent");

var RenderComponent = exports.RenderComponent = function (_Component2) {
  _inherits(RenderComponent, _Component2);

  function RenderComponent() {
    _classCallCheck(this, RenderComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RenderComponent).apply(this, arguments));
  }

  _createClass(RenderComponent, [{
    key: "prettyPrint",

    // HACKY code stolen to pretty print json
    value: function prettyPrint(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(jsonLine, this.replacer);
    }
  }, {
    key: "spaceCamelCase",
    value: function spaceCamelCase(title) {
      return title.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
        return str.toUpperCase();
      });
    }

    // HACKY code stolen to pretty print json

  }, {
    key: "replacer",
    value: function replacer(match, pIndent, pKey, pVal, pEnd) {
      var key = "<span class=" + cx('&__json-key') + ">";
      var val = "<span class=" + cx('&__json-value') + ">";
      var str = "<span class=" + cx('&__json-string') + ">";
      var r = pIndent || '';
      if (pKey) {
        r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      }
      if (pVal) {
        r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
      }
      return r + (pEnd || '');
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props;
      var component = _props2.component;
      var title = _props2.title;
      var data = _props2.data;
      var wrapper = _props2.wrapper;


      return _react2.default.DOM.section({ className: 'RenderComponent ' }, _react2.default.DOM.h2({ className: 'RenderComponent__header ' }, this.spaceCamelCase(title)), _react2.default.DOM.div({
        'data-component': component.displayName,
        'data-component-variation': title,
        className: 'RenderComponent__wrapper '
      }, wrapper(component, data)), _react2.default.DOM.div({ className: 'RenderComponent__jsonWrapper ' }, _react2.default.DOM.pre({
        className: 'RenderComponent__json ',
        dangerouslySetInnerHTML: { __html: this.prettyPrint(data) }
      })));
    }
  }]);

  return RenderComponent;
}(_react.Component);