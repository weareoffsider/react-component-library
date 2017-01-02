"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _HTMLWrapper = require("./ui/HTMLWrapper.react");

var _HTMLWrapper2 = _interopRequireDefault(_HTMLWrapper);

var _Layout = require("./ui/Layout.react");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(props) {
  var appRender = _server2.default.renderToString(_react2.default.createElement(_Layout2.default, props));

  var wrapperRender = _server2.default.renderToStaticMarkup(_react2.default.createElement(_HTMLWrapper2.default, {
    rawHTML: appRender,
    styles: props.styles,
    scripts: props.scripts,
    testJS: props.componentTestJS,
    extraHead: props.extraHead
  }));

  return '<!DOCTYPE html>' + wrapperRender;
}