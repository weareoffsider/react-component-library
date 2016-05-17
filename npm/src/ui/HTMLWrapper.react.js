'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');

var HTMLWrapper = function (_Component) {
    _inherits(HTMLWrapper, _Component);

    function HTMLWrapper() {
        _classCallCheck(this, HTMLWrapper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLWrapper).apply(this, arguments));
    }

    _createClass(HTMLWrapper, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var rawHTML = _props.rawHTML;
            var scripts = _props.scripts;
            var styles = _props.styles;
            var extraHead = _props.extraHead;

            var clientScript = fs.readFileSync(__dirname + '/../client-bundle.js', 'utf8');
            var clientStyle = fs.readFileSync(__dirname + '/../main.css', 'utf8');

            return _react2.default.DOM.html({
                'lang': '',
                className: 'no-js '
            }, _react2.default.DOM.head({}, _react2.default.DOM.meta({ 'charSet': 'utf-8' }), _react2.default.DOM.meta({
                'httpEquiv': 'x-ua-compatible',
                'content': 'ie-edge'
            }), _react2.default.DOM.title({}, 'ComponentServer'), _react2.default.DOM.meta({
                'name': 'description',
                'content': ''
            }), _react2.default.DOM.meta({
                'name': 'viewport',
                'content': 'width=device-width'
            }), _react2.default.DOM.style({ dangerouslySetInnerHTML: { __html: clientStyle } }), styles.map(function (s, $index) {
                return _react2.default.DOM.link({
                    'rel': 'stylesheet',
                    'key': s,
                    'href': s
                });
            }, this), extraHead), _react2.default.DOM.body({}, _react2.default.DOM.div({
                'id': 'ComponentServerApp',
                dangerouslySetInnerHTML: { __html: rawHTML }
            }), scripts.map(function (s, $index) {
                return _react2.default.DOM.script({
                    'type': 'text/javascript',
                    'key': s,
                    'src': s
                });
            }, this), _react2.default.DOM.script({ dangerouslySetInnerHTML: { __html: clientScript } })));
        }
    }]);

    return HTMLWrapper;
}(_react.Component);

exports.default = HTMLWrapper;