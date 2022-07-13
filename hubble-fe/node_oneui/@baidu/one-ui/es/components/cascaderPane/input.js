function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import Input from '../input';

var CascaderInput =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CascaderInput, _PureComponent);

  function CascaderInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      var value = e.value;

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      _this.props.onInputChange(e);
    });

    _this.state = {
      value: props.value || props.defaultValue || undefined
    };
    return _this;
  }

  CascaderInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    var newState = {};

    if ('value' in nextProps) {
      newState.value = nextProps.value;
    }

    return newState;
  };

  var _proto = CascaderInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        searchProps = _this$props.searchProps,
        width = _this$props.width;
    var value = this.state.value;
    return React.createElement(Input, _extends({}, searchProps, {
      value: value,
      onChange: this.onInputChange,
      width: width
    }));
  };

  return CascaderInput;
}(PureComponent);

_defineProperty(CascaderInput, "propTypes", {
  /** 输入框的value */
  value: PropTypes.string,

  /** default value */
  defaultValue: PropTypes.string,

  /** 搜索框的props */
  searchProps: PropTypes.object,

  /** input onChange */
  onInputChange: PropTypes.func,

  /** 搜索框的宽度 */
  width: PropTypes.number
});

_defineProperty(CascaderInput, "defaultProps", {
  searchProps: {
    placeholder: '请输入...'
  },
  onInputChange: function onInputChange() {},
  width: 360
});

polyfill(CascaderInput);
export default CascaderInput;