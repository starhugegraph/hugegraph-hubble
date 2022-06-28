function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import pull from 'lodash/pull';
import { polyfill } from 'react-lifecycles-compat';
import Tag from './tag';
export var dataSourceOption = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.string.isRequired,
  tagProps: PropTypes.object
});

var GroupTag =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(GroupTag, _PureComponent);

  function GroupTag(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "isUniqueMode", function () {
      return _this.props.mode === 'unique';
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeGroup", function (value, checked) {
      var selectedValue = [].concat(_this.state.value);

      if (checked) {
        // 选中
        if (_this.isUniqueMode()) {
          // 单选模式
          selectedValue = [value];
        } else {
          selectedValue.push(value);
        }
      } else if (_this.isUniqueMode()) {
        // 没选中，单选模式
        selectedValue = [];
      } else {
        pull(selectedValue, value);
      }

      if (!('value' in _this.props)) {
        _this.setState({
          value: selectedValue
        });
      }

      var onChange = _this.props.onChange;
      onChange(selectedValue);
    });

    _this.state = {
      value: props.defaultValue || props.value || [],
      prevProps: props
    };
    return _this;
  }

  var _proto = GroupTag.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        dataSource = _this$props.dataSource,
        size = _this$props.size;
    var value = this.state.value;
    var selectedValue = this.isUniqueMode() ? value && value.length && [value[0]] || [] : value;
    var groupTagClassName = classNames(className, prefixCls + "-group-wrapper");
    return React.createElement("div", {
      className: groupTagClassName
    }, dataSource.map(function (tag, index) {
      var value = tag.value,
          label = tag.label,
          _tag$tagProps = tag.tagProps,
          tagProps = _tag$tagProps === void 0 ? {} : _tag$tagProps;
      var checked = selectedValue.indexOf(value) > -1;
      var onClose = tagProps.onClose;

      if (onClose) {
        tagProps.onClose = partial(onClose, value);
      }

      return React.createElement(Tag, _extends({
        key: index,
        size: size,
        checkable: true,
        checked: checked,
        onChange: partial(_this2.onChangeGroup, value)
      }, tagProps), label);
    }));
  };

  return GroupTag;
}(PureComponent);

_defineProperty(GroupTag, "propTypes", {
  /**
   * value，区分单选和多选，单选取数组第1个
   */
  value: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.arrayOf(PropTypes.string),

  /**
   * mode 单选还是多选
   */
  mode: PropTypes.oneOf(['unique', 'multiple']),

  /**
   * 数据源
   */
  dataSource: PropTypes.arrayOf(dataSourceOption),
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium'])
});

_defineProperty(GroupTag, "defaultProps", {
  prefixCls: 'new-fc-one-tag',
  mode: 'unique',
  dataSource: [],
  className: '',
  onChange: function onChange() {},
  size: 'small'
});

_defineProperty(GroupTag, "getDerivedStateFromProps", function (nextProps, prevState) {
  var newState = {
    prevProps: nextProps
  };
  var prevProps = prevState.prevProps;

  if ('value' in nextProps && nextProps.value !== prevState.value) {
    newState.value = nextProps.value;
  }

  if ('dataSource' in nextProps && nextProps.dataSource !== prevProps.dataSource) {
    newState.dataSource = nextProps.dataSource;
  }

  return newState;
});

polyfill(GroupTag);
export default GroupTag;