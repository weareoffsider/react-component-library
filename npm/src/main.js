"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = setupComponentServer;

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _collector = require("./collector");

var _collector2 = _interopRequireDefault(_collector);

var _staticBuild = require("./staticBuild");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupComponentServer(options) {
  options = options || {};
  var app = (0, _express2.default)();

  var BASE_DIR = options.basedir;
  var MATCHER = options.matcher;
  var WRAPPER = options.wrapComponent || _react2.default.createElement;
  var TEST_GETTER = options.getTestData;
  var styles = options.styles || [];
  var scripts = options.scripts || [];
  var extraHead = options.extraHead || [];

  app.get('', function (req, res) {
    (0, _collector2.default)(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, function (_ref) {
      var pathList = _ref.pathList;
      var fullTree = _ref.fullTree;

      res.send((0, _render2.default)({
        path: req.path,
        pathList: pathList, fullTree: fullTree,
        styles: styles, scripts: scripts, extraHead: extraHead
      }));
    });
  });

  var COMPONENT_PATH = /(.*react\.js)\/?(.*)$/;

  app.get(COMPONENT_PATH, function (req, res) {
    var match = req.path.match(COMPONENT_PATH);

    var _match = _slicedToArray(match, 3);

    var fullPath = _match[0];
    var componentPath = _match[1];
    var variationPage = _match[2];


    try {
      (function () {
        var mod = require(BASE_DIR + componentPath);

        (0, _collector2.default)(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, function (_ref2) {
          var pathList = _ref2.pathList;
          var fullTree = _ref2.fullTree;

          var component = mod.default ? mod.default : mod;
          var componentTestData = TEST_GETTER(component, BASE_DIR + componentPath);
          var testMode = req.query.test !== undefined;

          res.send((0, _render2.default)({
            path: req.path,
            component: component,
            variationPage: variationPage,
            componentTestData: componentTestData,
            wrapper: WRAPPER,
            pathList: pathList, fullTree: fullTree, testMode: testMode,
            styles: styles, scripts: scripts, extraHead: extraHead
          }));
        });
      })();
    } catch (e) {
      console.error(e);
      console.error(e.stack);
      res.sendStatus(404);
    }
  });

  return {
    configApp: function configApp(cb) {
      cb(app);
    },
    listen: function listen(port, hostname, backlog, callback) {
      app.listen(port, hostname, backlog, callback);
    },
    staticBuild: function staticBuild(renderPath, callback) {
      console.log("Outputting static html to " + renderPath);
      (0, _collector2.default)(BASE_DIR, MATCHER, TEST_GETTER, BASE_DIR, function (_ref3) {
        var pathList = _ref3.pathList;
        var fullTree = _ref3.fullTree;

        var homePage = (0, _render2.default)({
          path: '/',
          pathList: pathList, fullTree: fullTree,
          styles: styles, scripts: scripts, extraHead: extraHead,
          staticBuild: true
        });
        (0, _staticBuild.writePage)(renderPath, homePage);

        pathList.forEach(function (path) {
          var mod = require(BASE_DIR + '/' + path);
          var component = mod.default ? mod.default : mod;
          var componentTestData = TEST_GETTER(component, BASE_DIR + '/' + path);
          var testMode = false;

          var componentPage = (0, _render2.default)({
            path: '/' + path,
            component: component,
            variationPage: '',
            componentTestData: componentTestData,
            staticBuild: true,
            wrapper: WRAPPER,
            pathList: pathList, fullTree: fullTree, testMode: testMode,
            styles: styles, scripts: scripts, extraHead: extraHead
          });

          (0, _staticBuild.writePage)(renderPath + path, componentPage);

          var testComponentPage = (0, _render2.default)({
            path: '/' + path,
            component: component,
            variationPage: '',
            componentTestData: componentTestData,
            wrapper: WRAPPER,
            pathList: pathList, fullTree: fullTree,
            staticBuild: true,
            testMode: true,
            styles: styles, scripts: scripts, extraHead: extraHead
          });

          (0, _staticBuild.writePage)(renderPath + path + '/test', testComponentPage);

          if (componentTestData.pagedVariations) {
            Object.keys(componentTestData).forEach(function (variationPage) {
              if (variationPage == 'pagedVariations') {
                return;
              }

              var variationRender = (0, _render2.default)({
                path: '/' + path + '/' + variationPage,
                component: component,
                variationPage: variationPage,
                componentTestData: componentTestData,
                staticBuild: true,
                wrapper: WRAPPER,
                pathList: pathList, fullTree: fullTree, testMode: testMode,
                styles: styles, scripts: scripts, extraHead: extraHead
              });

              (0, _staticBuild.writePage)(renderPath + path + '/' + variationPage, variationRender);

              var testVariationRender = (0, _render2.default)({
                path: '/' + path + '/' + variationPage,
                component: component,
                variationPage: variationPage,
                componentTestData: componentTestData,
                staticBuild: true,
                wrapper: WRAPPER,
                pathList: pathList, fullTree: fullTree,
                testMode: true,
                styles: styles, scripts: scripts, extraHead: extraHead
              });

              (0, _staticBuild.writePage)(renderPath + path + '/' + variationPage + '/test', testVariationRender);
            });
          }

          console.log("Rendered files for " + path);
        });
      });
    }
  };
}