'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writePage = writePage;

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writePage(path, content, callback) {
  (0, _mkdirp2.default)(path, function (err) {
    if (!err) {
      _fs2.default.writeFile(path + '/index.html', content, 'utf8', callback);
    }
  });
}