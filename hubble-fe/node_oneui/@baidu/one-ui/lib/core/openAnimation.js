"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _cssAnimation = _interopRequireDefault(require("css-animation"));

var _getRequestAnimationFrame = _interopRequireWildcard(require("./getRequestAnimationFrame"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reqAnimFrame = (0, _getRequestAnimationFrame["default"])();

var animate = function animate(node, show, done) {
  var height;
  var requestAnimationFrameId;
  return (0, _cssAnimation["default"])(node, 'new-fc-one-motion-collapse', {
    start: function start() {
      if (!show) {
        node.style.height = node.offsetHeight + "px";
        node.style.opacity = 1;
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
        node.style.opacity = 0;
      }
    },
    active: function active() {
      if (requestAnimationFrameId) {
        (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestAnimationFrameId);
      }

      requestAnimationFrameId = reqAnimFrame(function () {
        node.style.height = (show ? height : 0) + "px";
        node.style.opacity = show ? 1 : 0;
      });
    },
    end: function end() {
      if (requestAnimationFrameId) {
        (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestAnimationFrameId);
      }

      node.style.height = '';
      node.style.opacity = '';
      done();
    }
  });
};

var animation = {
  enter: function enter(node, done) {
    return animate(node, true, done);
  },
  leave: function leave(node, done) {
    return animate(node, false, done);
  },
  appear: function appear(node, done) {
    return animate(node, true, done);
  }
};
var _default = animation;
exports["default"] = _default;
module.exports = exports.default;