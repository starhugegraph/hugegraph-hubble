function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import KeyCode from 'rc-util/lib/KeyCode';
import arrayTreeFilter from 'array-tree-filter';
import shallowEqual from 'shallowequal';
import Menus from './menus';
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};

var CascaderComponent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CascaderComponent, _Component);

  function CascaderComponent(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "setPopupVisible", function (popupVisible) {
      if (!('popupVisible' in _this.props)) {
        _this.setState({
          popupVisible: popupVisible
        });
      } // sync activeValue with value when panel open


      if (popupVisible && !_this.state.popupVisible) {
        _this.setState(function (_ref) {
          var value = _ref.value;
          return {
            activeValue: value
          };
        });
      }

      _this.props.onPopupVisibleChange(popupVisible);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (options, setProps, e) {
      if (e.type !== 'keydown' || e.keyCode === KeyCode.ENTER) {
        _this.props.onChange(options.map(function (o) {
          return o[_this.getFieldName('value')];
        }), options);

        _this.setPopupVisible(setProps.visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePopupVisibleChange", function (popupVisible) {
      _this.setPopupVisible(popupVisible);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuSelect", function (targetOption, menuIndex, e) {
      // Keep focused state for keyboard support
      var triggerNode = _this.trigger.getRootDomNode();

      if (triggerNode && triggerNode.focus) {
        triggerNode.focus();
      }

      var _this$props = _this.props,
          changeOnSelect = _this$props.changeOnSelect,
          loadData = _this$props.loadData,
          expandTrigger = _this$props.expandTrigger;

      if (!targetOption || targetOption.disabled) {
        return;
      }

      var activeValue = _this.state.activeValue;
      activeValue = activeValue.slice(0, menuIndex + 1);
      activeValue[menuIndex] = targetOption[_this.getFieldName('value')];

      var activeOptions = _this.getActiveOptions(activeValue);

      if (targetOption.isLeaf === false && !targetOption[_this.getFieldName('children')] && loadData) {
        if (changeOnSelect) {
          _this.handleChange(activeOptions, {
            visible: true
          }, e);
        }

        _this.setState({
          activeValue: activeValue
        });

        loadData(activeOptions);
        return;
      }

      var newState = {};

      if (!targetOption[_this.getFieldName('children')] || !targetOption[_this.getFieldName('children')].length) {
        _this.handleChange(activeOptions, {
          visible: false
        }, e); // set value to activeValue when select leaf option


        newState.value = activeValue; // add e.type judgement to prevent `onChange` being triggered by mouseEnter
      } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
        if (expandTrigger === 'hover') {
          _this.handleChange(activeOptions, {
            visible: false
          }, e);
        } else {
          _this.handleChange(activeOptions, {
            visible: true
          }, e);
        } // set value to activeValue on every select


        newState.value = activeValue;
      }

      newState.activeValue = activeValue; //  not change the value by keyboard

      if ('value' in _this.props || e.type === 'keydown' && e.keyCode !== KeyCode.ENTER) {
        delete newState.value;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemDoubleClick", function () {
      var changeOnSelect = _this.props.changeOnSelect;

      if (changeOnSelect) {
        _this.setPopupVisible(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var children = _this.props.children;

      if (children && children.props.onKeyDown) {
        children.props.onKeyDown(e);
        return;
      }

      var activeValue = [].concat(_this.state.activeValue);
      var currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;

      var currentOptions = _this.getCurrentLevelOptions();

      var currentIndex = currentOptions.map(function (o) {
        return o[_this.getFieldName('value')];
      }).indexOf(activeValue[currentLevel]);

      if (e.keyCode !== KeyCode.DOWN && e.keyCode !== KeyCode.UP && e.keyCode !== KeyCode.ENTER && e.keyCode !== KeyCode.ESC) {
        return;
      } // Press any keys above to reopen menu


      if (!_this.state.popupVisible && e.keyCode !== KeyCode.ESC) {
        _this.setPopupVisible(true);

        return;
      }

      if (e.keyCode === KeyCode.DOWN || e.keyCode === KeyCode.UP) {
        e.preventDefault();
        var nextIndex = currentIndex;

        if (nextIndex !== -1) {
          if (e.keyCode === KeyCode.DOWN) {
            nextIndex += 1;
            nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
          } else {
            nextIndex -= 1;
            nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
          }
        } else {
          nextIndex = 0;
        }

        activeValue[currentLevel] = currentOptions[nextIndex][_this.getFieldName('value')];
      } else if (e.keyCode === KeyCode.ESC) {
        _this.setPopupVisible(false);

        return;
      }

      if (!activeValue || activeValue.length === 0) {
        _this.setPopupVisible(false);
      }

      var activeOptions = _this.getActiveOptions(activeValue);

      var targetOption = activeOptions[activeOptions.length - 1];

      _this.handleMenuSelect(targetOption, activeOptions.length - 1, e);

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveTrigger", function (node) {
      _this.trigger = node;
    });

    var initialValue = [];

    if ('value' in props) {
      initialValue = props.value || [];
    } else if ('defaultValue' in props) {
      initialValue = props.defaultValue || [];
    }

    _this.state = {
      popupVisible: props.popupVisible,
      activeValue: initialValue,
      value: initialValue,
      prevProps: props
    };
    _this.defaultFieldNames = {
      label: 'label',
      value: 'value',
      children: 'children'
    };
    return _this;
  }

  var _proto = CascaderComponent.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this$state$prevProps = this.state.prevProps,
        prevProps = _this$state$prevProps === void 0 ? {} : _this$state$prevProps;
    var newState = {
      prevProps: nextProps
    };

    if ('value' in nextProps && !shallowEqual(prevProps.value, nextProps.value)) {
      newState.value = nextProps.value || [];

      if (!('loadData' in nextProps)) {
        newState.activeValue = nextProps.value || [];
      }
    }

    if ('popupVisible' in nextProps) {
      newState.popupVisible = nextProps.popupVisible;
    }

    this.setState(newState);
  };

  _proto.getPopupDOMNode = function getPopupDOMNode() {
    return this.trigger.getPopupDomNode();
  };

  _proto.getFieldName = function getFieldName(name) {
    var defaultFieldNames = this.defaultFieldNames;
    var fieldNames = this.props.fieldNames;
    return fieldNames[name] || defaultFieldNames[name];
  };

  _proto.getFieldNames = function getFieldNames() {
    var fieldNames = this.props.fieldNames;
    return fieldNames;
  };

  _proto.getCurrentLevelOptions = function getCurrentLevelOptions() {
    var _this2 = this;

    var _this$props$options = this.props.options,
        options = _this$props$options === void 0 ? [] : _this$props$options;
    var _this$state$activeVal = this.state.activeValue,
        activeValue = _this$state$activeVal === void 0 ? [] : _this$state$activeVal;
    var result = arrayTreeFilter(options, function (o, level) {
      return o[_this2.getFieldName('value')] === activeValue[level];
    }, {
      childrenKeyName: this.getFieldName('children')
    });

    if (result[result.length - 2]) {
      return result[result.length - 2][this.getFieldName('children')];
    }

    return [].concat(options).filter(function (o) {
      return !o.disabled;
    });
  };

  _proto.getActiveOptions = function getActiveOptions(activeValue) {
    var _this3 = this;

    return arrayTreeFilter(this.props.options || [], function (o, level) {
      return o[_this3.getFieldName('value')] === activeValue[level];
    }, {
      childrenKeyName: this.getFieldName('children')
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        transitionName = _this$props2.transitionName,
        popupClassName = _this$props2.popupClassName,
        _this$props2$options = _this$props2.options,
        options = _this$props2$options === void 0 ? [] : _this$props2$options,
        disabled = _this$props2.disabled,
        builtinPlacements = _this$props2.builtinPlacements,
        popupPlacement = _this$props2.popupPlacement,
        children = _this$props2.children,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["prefixCls", "transitionName", "popupClassName", "options", "disabled", "builtinPlacements", "popupPlacement", "children"]);

    var menus = React.createElement("div", null);
    var emptyMenuClassName = '';

    if (options && options.length > 0) {
      menus = React.createElement(Menus, _extends({}, this.props, {
        fieldNames: this.getFieldNames(),
        defaultFieldNames: this.defaultFieldNames,
        activeValue: this.state.activeValue,
        onSelect: this.handleMenuSelect,
        onItemDoubleClick: this.handleItemDoubleClick,
        visible: this.state.popupVisible
      }));
    } else {
      emptyMenuClassName = " " + prefixCls + "-menus-empty";
    }

    return React.createElement(Trigger, _extends({
      ref: this.saveTrigger
    }, restProps, {
      options: options,
      disabled: disabled,
      popupPlacement: popupPlacement,
      builtinPlacements: builtinPlacements,
      popupTransitionName: transitionName,
      action: disabled ? [] : ['click'],
      popupVisible: disabled ? false : this.state.popupVisible,
      onPopupVisibleChange: this.handlePopupVisibleChange,
      prefixCls: prefixCls + "-menus",
      popupClassName: popupClassName + emptyMenuClassName,
      popup: menus
    }), cloneElement(children, {
      onKeyDown: this.handleKeyDown,
      tabIndex: disabled ? undefined : 0
    }));
  };

  return CascaderComponent;
}(Component);

_defineProperty(CascaderComponent, "propTypes", {
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onPopupVisibleChange: PropTypes.func,
  popupVisible: PropTypes.bool,
  disabled: PropTypes.bool,
  transitionName: PropTypes.string,
  popupClassName: PropTypes.string,
  popupPlacement: PropTypes.string,
  prefixCls: PropTypes.string,
  dropdownMenuColumnStyle: PropTypes.object,
  builtinPlacements: PropTypes.object,
  loadData: PropTypes.func,
  changeOnSelect: PropTypes.bool,
  children: PropTypes.node,
  onKeyDown: PropTypes.func,
  expandTrigger: PropTypes.string,
  fieldNames: PropTypes.object,
  expandIcon: PropTypes.node,
  loadingIcon: PropTypes.node
});

_defineProperty(CascaderComponent, "defaultProps", {
  onChange: function onChange() {},
  onPopupVisibleChange: function onPopupVisibleChange() {},
  disabled: false,
  transitionName: '',
  prefixCls: 'new-fc-one-cascader',
  popupClassName: '',
  popupPlacement: 'bottomLeft',
  builtinPlacements: BUILT_IN_PLACEMENTS,
  expandTrigger: 'click',
  fieldNames: {
    label: 'label',
    value: 'value',
    children: 'children',
    icon: 'icon'
  },
  expandIcon: '>',
  options: []
});

export { CascaderComponent as default };