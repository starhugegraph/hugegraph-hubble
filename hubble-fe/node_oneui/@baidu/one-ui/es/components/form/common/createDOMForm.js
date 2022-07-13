function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import ReactDOM from 'react-dom';
import scrollIntoView from 'dom-scroll-into-view';
import has from 'lodash/has';
import createBaseForm from './createBaseForm';
import { mixin as formMixin } from './createForm';
import { getParams } from '../../../core/formTools';

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
    return _extends({}, formMixin.getForm.call(this), {
      validateFieldsAndScroll: this.validateFieldsAndScroll
    });
  },
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this = this;

    var _getParams = getParams(ns, opt, cb),
        names = _getParams.names,
        callback = _getParams.callback,
        options = _getParams.options;

    var newCb = function newCb(error, values) {
      if (error) {
        var validNames = _this.fieldsStore.getValidFieldsName();

        var firstNode;
        var firstTop;
        validNames.forEach(function (name) {
          if (has(error, name)) {
            var instance = _this.getFieldInstance(name);

            if (instance) {
              var node = ReactDOM.findDOMNode(instance);
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
          scrollIntoView(firstNode, c, _extends({
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
  return createBaseForm(_extends({}, option), [mixin]);
}

export default createDOMForm;