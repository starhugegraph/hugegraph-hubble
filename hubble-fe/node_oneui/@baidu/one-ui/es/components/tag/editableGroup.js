function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import { polyfill } from 'react-lifecycles-compat';
import Tag from './tag';
import { dataSourceOption } from './group';
import Tooltip from '../tooltip';
import Input from '../input';
var inputWidth = 58;

var EditableGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(EditableGroup, _PureComponent);

  function EditableGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (value) {
      var dataSource = _this.state.dataSource;
      var onClose = _this.props.onClose;
      onClose(dataSource, value);

      if (!('dataSource' in _this.props)) {
        dataSource = dataSource.filter(function (tag) {
          return tag.value !== value;
        });

        _this.setState({
          dataSource: dataSource
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showInput", function () {
      _this.setState({
        inputVisible: true
      }, function () {
        return _this.input.focus();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (e) {
      _this.setState({
        inputValue: e.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputConfirm", function () {
      var _this$state = _this.state,
          dataSource = _this$state.dataSource,
          inputValue = _this$state.inputValue;
      var onInputConfirm = _this.props.onInputConfirm;
      onInputConfirm(dataSource, inputValue);
      var newState = {
        inputVisible: false,
        inputValue: ''
      };

      if (!('dataSource' in _this.props)) {
        var currentTags = dataSource;

        if (inputValue && currentTags.indexOf(inputValue) === -1) {
          currentTags = [].concat(currentTags, [{
            label: inputValue,
            value: inputValue
          }]);
        }

        newState.dataSource = currentTags;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "saveInputRef", function (input) {
      _this.input = input;
    });

    _this.state = {
      dataSource: props.defaultDataSource || props.dataSource || [],
      inputVisible: false,
      inputValue: ''
    };
    return _this;
  }

  var _proto = EditableGroup.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        size = _this$props.size;
    var _this$state2 = this.state,
        dataSource = _this$state2.dataSource,
        inputVisible = _this$state2.inputVisible,
        inputValue = _this$state2.inputValue;
    var groupTagClassName = classNames(className, prefixCls + "-group-wrapper");
    return React.createElement("div", {
      className: groupTagClassName
    }, dataSource.map(function (tag, index) {
      var label = tag.label,
          value = tag.value,
          tagProps = tag.tagProps;
      var isLongTag = label.length > 20;
      var tagElem = React.createElement(Tag, _extends({
        key: index,
        closable: true,
        onClose: partial(_this2.handleClose, value)
      }, tagProps), isLongTag ? label.slice(0, 20) + "..." : label);
      return isLongTag ? React.createElement(Tooltip, {
        title: tag,
        key: index
      }, tagElem) : tagElem;
    }), inputVisible && React.createElement(Input, {
      inputRef: this.saveInputRef,
      size: size,
      style: {
        width: inputWidth
      },
      value: inputValue,
      onChange: this.handleInputChange,
      onBlur: this.handleInputConfirm,
      onPressEnter: this.handleInputConfirm
    }), !inputVisible && React.createElement(Tag, {
      onClick: this.showInput,
      className: prefixCls + "-add-tag"
    }, "+ \u6DFB\u52A0"));
  };

  return EditableGroup;
}(PureComponent);

_defineProperty(EditableGroup, "propTypes", {
  dataSource: PropTypes.arrayOf(dataSourceOption),
  defaultDataSource: PropTypes.arrayOf(dataSourceOption),
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  onInputConfirm: PropTypes.func
});

_defineProperty(EditableGroup, "defaultProps", {
  prefixCls: 'new-fc-one-tag',
  className: '',
  size: 'small',
  onClose: function onClose() {},
  onInputConfirm: function onInputConfirm() {}
});

_defineProperty(EditableGroup, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('dataSource' in nextProps && nextProps.dataSource !== prevState.dataSource) {
    return {
      dataSource: nextProps.dataSource
    };
  }

  return null;
});

polyfill(EditableGroup);
export default EditableGroup;