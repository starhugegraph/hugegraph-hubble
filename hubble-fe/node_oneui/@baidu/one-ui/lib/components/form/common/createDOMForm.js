"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _has = _interopRequireDefault(require("lodash/has"));

var _createBaseForm = _interopRequireDefault(require("./createBaseForm"));

var _createForm = require("./createForm");

var _formTools = require("../../../core/formTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function computedStyle(el, prop) {
  var getComputedStyle = window.getComputedStyle;
  var style = getComputedStyle ? getComputedStyle(el) : el.currentStyle;

  if (style) {
    return style[prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase();
    })];
  }

  return undefined;
}

function getScrollableContainer(n) {
  var node = n;
  var nodeName;
  /* eslint no-cond-assign:0 */

  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
    var overflowY = computedStyle(node, 'overflowY');

    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      return node;
    }

    node = node.parentNode;
  }

  return nodeName === 'body' ? node.ownerDocument : node;
}

var mixin = {
  getForm: function getForm() {
    return _extends({}, _createForm.mixin.getForm.call(this), {
      validateFieldsAndScroll: this.validateFieldsAndScroll
    });
  },
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this = this;

    var _getParams = (0, _formTools.getParams)(ns, opt, cb),
        names = _getParams.names,
        callback = _getParams.callback,
        options = _getParams.options;

    var newCb = function newCb(error, values) {
      if (error) {
        var validNames = _this.fieldsStore.getValidFieldsName();

        var firstNode;
        var firstTop;
        validNames.forEach(function (name) {
          if ((0, _has["default"])(error, name)) {
            var instance = _this.getFieldInstance(name);

            if (instance) {
              var node = _reactDom["default"].findDOMNode(instance);

              var top = node.getBoundingClientRect().top;

              if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                firstTop = top;
                firstNode = node;
              }
            }
          }
        });

        if (firstNode) {
          var c = options.container || getScrollableContainer(firstNode);
          (0, _domScrollIntoView["default"])(firstNode, c, _extends({
            onlyScrollIfNeeded: true
          }, options.scroll));
        }
      }

      if (typeof callback === 'function') {
        callback(error, values);
      }
    };

    return this.validateFields(names, options, newCb);
  }
};

function createDOMForm(option) {
  return (0, _createBaseForm["default"])(_extends({}, option), [mixin]);
}

var _default = createDOMForm;
exports["default"] = _default;
module.exports = exports.default;