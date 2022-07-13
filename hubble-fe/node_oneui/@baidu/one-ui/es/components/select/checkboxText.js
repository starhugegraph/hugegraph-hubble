function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchText from './searchText';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';

var CheckboxText =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CheckboxText, _PureComponent);

  function CheckboxText(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var searchValue = _this.state.searchValue;
      var newState = {};

      if ('searchValue' in nextProps && searchValue !== nextProps.searchValue) {
        newState.searchValue = nextProps.searchValue;
      }

      if ('source' in nextProps) {
        newState.source = nextProps.source;
      }

      if ('checked' in nextProps) {
        newState.checked = nextProps.checked;
      }

      _this.setState(newState);
    });

    _this.state = {
      searchValue: props.searchValue,
      source: props.source,
      checked: false
    };
    return _this;
  }

  var _proto = CheckboxText.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        text = _this$props.text,
        value = _this$props.value,
        label = _this$props.label,
        disabled = _this$props.disabled,
        disabledReason = _this$props.disabledReason,
        disablePlacement = _this$props.disablePlacement;
    var searchLabel = text || label;
    var _this$state = this.state,
        searchValue = _this$state.searchValue,
        source = _this$state.source;
    var searchTextProps = {
      text: searchLabel,
      showSearch: true,
      searchValue: searchValue
    };
    var checked = false;

    if (source.indexOf(value) > -1) {
      checked = true;
    }

    if ('checked' in this.props) {
      checked = this.state.checked;
    }

    var checkboxTextDom = React.createElement("span", null, React.createElement(Checkbox, {
      checked: checked,
      disabled: disabled
    }), React.createElement(SearchText, _extends({}, searchTextProps, {
      disabled: disabled
    })));
    return disabled && disabledReason ? React.createElement(Tooltip, {
      title: disabledReason,
      placement: disablePlacement
    }, checkboxTextDom) : checkboxTextDom;
  };

  return CheckboxText;
}(PureComponent);

_defineProperty(CheckboxText, "isCheckboxText", true);

_defineProperty(CheckboxText, "propTypes", {
  searchValue: PropTypes.string,
  text: PropTypes.string,
  source: PropTypes.array,
  value: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledReason: PropTypes.string,
  disablePlacement: PropTypes.string
});

_defineProperty(CheckboxText, "defaultProps", {
  searchValue: '',
  source: [],
  disablePlacement: 'right',
  disabled: false
});

export { CheckboxText as default };