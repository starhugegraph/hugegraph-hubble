function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../button';

var ActionButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ActionButton, _Component);

  function ActionButton(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          actionFn = _this$props.actionFn,
          closeModal = _this$props.closeModal;

      if (actionFn) {
        var ret;

        if (actionFn.length) {
          ret = actionFn(closeModal);
        } else {
          ret = actionFn();

          if (!ret) {
            closeModal();
          }
        }

        if (ret && ret.then) {
          _this.setState({
            loading: true
          });

          ret.then(function () {
            closeModal.apply(void 0, arguments);
          }, function () {
            _this.setState({
              loading: false
            });
          });
        }
      } else {
        closeModal();
      }
    });

    _this.state = {
      loading: false
    };
    return _this;
  }

  var _proto = ActionButton.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.autoFocus) {
      var $this = ReactDOM.findDOMNode(this);
      this.timeoutId = setTimeout(function () {
        return $this.focus();
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeoutId);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        type = _this$props2.type,
        children = _this$props2.children,
        otherProps = _this$props2.otherProps,
        order = _this$props2.order,
        size = _this$props2.size;
    var loading = this.state.loading;
    otherProps.style = {};

    if (order) {
      otherProps.style.order = order;
    }

    return React.createElement(Button, _extends({
      type: type,
      size: size,
      onClick: this.onClick,
      loading: loading
    }, otherProps), children);
  };

  return ActionButton;
}(Component);

_defineProperty(ActionButton, "propTypes", {
  type: PropTypes.string,
  actionFn: PropTypes.func,
  closeModal: PropTypes.func,
  autoFocus: PropTypes.bool,
  children: PropTypes.any,
  otherProps: PropTypes.object,
  order: PropTypes.number,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
});

export { ActionButton as default };