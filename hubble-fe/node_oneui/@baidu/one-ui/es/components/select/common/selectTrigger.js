function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Trigger from 'rc-trigger';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import tools from '../../../core';
import DropdownMenu from './dropdownMenu';
var _tools$select = tools.select,
    isSingleMode = _tools$select.isSingleMode,
    saveRef = _tools$select.saveRef;
Trigger.displayName = 'Trigger';
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var SelectTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectTrigger, _React$Component);

  function SelectTrigger(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      var width = ReactDOM.findDOMNode(_assertThisInitialized(_this)).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getInnerMenu", function () {
      return _this.dropdownMenuRef && _this.dropdownMenuRef.menuRef;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupDOMNode", function () {
      return _this.triggerRef.getPopupDomNode();
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownElement", function (newProps) {
      var props = _this.props;
      return React.createElement(DropdownMenu, _extends({
        ref: _this.saveDropdownMenuRef
      }, newProps, {
        prefixCls: _this.getDropdownPrefixCls(),
        onMenuSelect: props.onMenuSelect,
        onMenuDeselect: props.onMenuDeselect,
        onPopupScroll: props.onPopupScroll,
        value: props.value,
        backfillValue: props.backfillValue,
        firstActiveValue: props.firstActiveValue,
        defaultActiveFirstOption: props.defaultActiveFirstOption,
        dropdownMenuStyle: props.dropdownMenuStyle,
        menuItemSelectedIcon: props.menuItemSelectedIcon
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownTransitionName", function () {
      var props = _this.props;
      var transitionName = props.transitionName;

      if (!transitionName && props.animation) {
        transitionName = _this.getDropdownPrefixCls() + "-" + props.animation;
      }

      return transitionName;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownPrefixCls", function () {
      return _this.props.prefixCls + "-dropdown";
    });

    _this.saveDropdownMenuRef = saveRef(_assertThisInitialized(_this), 'dropdownMenuRef');
    _this.saveTriggerRef = saveRef(_assertThisInitialized(_this), 'triggerRef');
    _this.state = {
      dropdownWidth: null
    };
    return _this;
  }

  var _proto = SelectTrigger.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  };

  _proto.render = function render() {
    var _popupClassName;

    var _this$props = this.props,
        onPopupFocus = _this$props.onPopupFocus,
        props = _objectWithoutPropertiesLoose(_this$props, ["onPopupFocus"]);

    var multiple = props.multiple,
        visible = props.visible,
        inputValue = props.inputValue,
        dropdownAlign = props.dropdownAlign,
        disabled = props.disabled,
        showSearch = props.showSearch,
        dropdownClassName = props.dropdownClassName,
        dropdownStyle = props.dropdownStyle,
        dropdownMatchSelectWidth = props.dropdownMatchSelectWidth;
    var dropdownPrefixCls = this.getDropdownPrefixCls();
    var popupClassName = (_popupClassName = {}, _popupClassName[dropdownClassName] = !!dropdownClassName, _popupClassName[dropdownPrefixCls + "--" + (multiple ? 'multiple' : 'single')] = 1, _popupClassName);
    var popupElement = this.getDropdownElement({
      menuItems: props.options,
      onPopupFocus: onPopupFocus,
      multiple: multiple,
      inputValue: inputValue,
      visible: visible
    });
    var hideAction;

    if (disabled) {
      hideAction = [];
    } else if (isSingleMode(props) && !showSearch) {
      hideAction = ['click'];
    } else {
      hideAction = ['blur'];
    }

    var popupStyle = _extends({}, dropdownStyle);

    var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

    if (this.state.dropdownWidth) {
      popupStyle[widthProp] = this.state.dropdownWidth + "px";
    }

    return React.createElement(Trigger, _extends({}, props, {
      showAction: disabled ? [] : this.props.showAction,
      hideAction: hideAction,
      ref: this.saveTriggerRef,
      popupPlacement: "bottomLeft",
      builtinPlacements: BUILT_IN_PLACEMENTS,
      prefixCls: dropdownPrefixCls,
      popupTransitionName: this.getDropdownTransitionName(),
      onPopupVisibleChange: props.onDropdownVisibleChange,
      popup: popupElement,
      popupAlign: dropdownAlign,
      popupVisible: visible,
      getPopupContainer: props.getPopupContainer,
      popupClassName: classnames(popupClassName),
      popupStyle: popupStyle
    }), props.children);
  };

  return SelectTrigger;
}(React.Component);

_defineProperty(SelectTrigger, "propTypes", {
  onPopupFocus: PropTypes.func,
  onPopupScroll: PropTypes.func,
  dropdownMatchSelectWidth: PropTypes.bool,
  dropdownAlign: PropTypes.object,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  showSearch: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  multiple: PropTypes.bool,
  inputValue: PropTypes.string,
  filterOption: PropTypes.any,
  options: PropTypes.any,
  prefixCls: PropTypes.string,
  popupClassName: PropTypes.string,
  children: PropTypes.any,
  showAction: PropTypes.arrayOf(PropTypes.string),
  menuItemSelectedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
});

export { SelectTrigger as default };
SelectTrigger.displayName = 'SelectTrigger';