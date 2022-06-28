function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import childrenToArray from 'rc-util/lib/Children/toArray';
import { IconChevronDown, IconTimesCircle, IconClose } from '@baidu/one-ui-icon';
import classnames from 'classnames';
import classes from 'component-classes';
import { Item as MenuItem, ItemGroup as MenuItemGroup } from 'rc-menu';
import warning from 'warning';
import Option from '../option';
import SelectTrigger from './selectTrigger';
import { SelectPropTypes } from './propTypes';
import tools from '../../../core';
import Icon from '../../icon';
import Checkbox from '../../checkbox';
import SearchText from '../searchText';
var _tools$select = tools.select,
    getPropValue = _tools$select.getPropValue,
    getValuePropValue = _tools$select.getValuePropValue,
    isCombobox = _tools$select.isCombobox,
    isMultipleOrTags = _tools$select.isMultipleOrTags,
    isMultipleOrTagsOrCombobox = _tools$select.isMultipleOrTagsOrCombobox,
    isSingleMode = _tools$select.isSingleMode,
    toArray = _tools$select.toArray,
    getMapKey = _tools$select.getMapKey,
    findIndexInValueBySingleValue = _tools$select.findIndexInValueBySingleValue,
    getLabelFromPropsValue = _tools$select.getLabelFromPropsValue,
    UNSELECTABLE_ATTRIBUTE = _tools$select.UNSELECTABLE_ATTRIBUTE,
    UNSELECTABLE_STYLE = _tools$select.UNSELECTABLE_STYLE,
    preventDefaultEvent = _tools$select.preventDefaultEvent,
    findFirstMenuItem = _tools$select.findFirstMenuItem,
    includesSeparators = _tools$select.includesSeparators,
    splitBySeparators = _tools$select.splitBySeparators,
    defaultFilterFn = _tools$select.defaultFilterFn,
    validateOptionValue = _tools$select.validateOptionValue,
    saveRef = _tools$select.saveRef,
    toTitle = _tools$select.toTitle,
    getMultipleCheckboxLabel = _tools$select.getMultipleCheckboxLabel;
var heightToSizeMap = {
  xsmall: 24,
  small: 28,
  medium: 32,
  large: 36
};
var SELECT_EMPTY_VALUE_KEY = 'ONE_UI_SELECT_EMPTY_VALUE_KEY';

var noop = function noop() {};

function chaining() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // eslint-disable-line
    // eslint-disable-line
    for (var i = 0; i < fns.length; i++) {
      if (fns[i] && typeof fns[i] === 'function') {
        fns[i].apply(this, args);
      }
    }
  };
}

var OneSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(OneSelect, _PureComponent);

  function OneSelect(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var state = _this.state;
      var optionsInfo = _this.state.skipBuildOptionsInfo ? state.optionsInfo : OneSelect.getOptionsInfoFromProps(nextProps, state);

      if ('children' in nextProps && nextProps.children !== _this.props.children) {
        optionsInfo = OneSelect.getOptionsInfoFromProps(nextProps, state);
      }

      var newState = {
        optionsInfo: optionsInfo,
        skipBuildOptionsInfo: false
      };

      if ('open' in nextProps) {
        newState.open = nextProps.open;
      }

      if ('value' in nextProps) {
        var value = OneSelect.getValueFromProps(nextProps);
        newState.value = value;

        if (nextProps.combobox) {
          newState.inputValue = OneSelect.getInputValueForCombobox(nextProps, optionsInfo);
        }
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps, prevState) {
      if (isMultipleOrTags(_this.props)) {
        var inputNode = _this.getInputDOMNode();

        var mirrorNode = _this.getInputMirrorDOMNode();

        if (inputNode) {
          if (inputNode.value) {
            inputNode.style.width = '';
            inputNode.style.width = mirrorNode.clientWidth + "px";
          } else {
            inputNode.style.width = '';
          }
        }

        if (_this.state.value !== prevState.value) {
          var refHeight = _this.selectionRef.offsetHeight;

          _this.setState({
            ctrNodeHeight: refHeight
          });
        }
      }

      _this.forcePopupAlign();
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (event) {
      var tokenSeparators = _this.props.tokenSeparators;
      var val = event.target.value;

      if (isMultipleOrTags(_this.props) && tokenSeparators.length && includesSeparators(val, tokenSeparators)) {
        var nextValue = _this.getValueByInput(val);

        if (nextValue !== undefined) {
          _this.fireChange(nextValue);
        }

        _this.setOpenState(false, true);

        _this.setInputValue('', false);

        return;
      }

      _this.setInputValue(val);

      _this.setState({
        open: true
      });

      if (isCombobox(_this.props)) {
        _this.fireChange([val]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDropdownVisibleChange", function (open) {
      if (open && !_this._focused) {
        _this.clearBlurTime();

        _this.timeoutFocus();

        _this._focused = true;

        _this.updateFocusClassName();
      }

      _this.setOpenState(open);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var open = _this.state.open;
      var disabled = _this.props.disabled;

      if (disabled) {
        return;
      }

      var keyCode = event.keyCode;

      if (open && !_this.getInputDOMNode()) {
        _this.onInputKeyDown(event);
      } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
        if (!open) {
          _this.setOpenState(true);
        }

        event.preventDefault();
      } else if (keyCode === KeyCode.SPACE) {
        // Not block space if popup is shown
        if (!open) {
          _this.setOpenState(true);

          event.preventDefault();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onInputKeyDown", function (event) {
      var props = _this.props;

      if (props.disabled) {
        return;
      }

      var state = _this.state;
      var keyCode = event.keyCode;

      if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
        event.preventDefault();
        var value = state.value;

        if (value.length) {
          _this.removeSelected(value[value.length - 1]);
        }

        return;
      }

      if (keyCode === KeyCode.DOWN) {
        if (!state.open) {
          _this.openIfHasChildren();

          event.preventDefault();
          event.stopPropagation();
          return;
        }
      } else if (keyCode === KeyCode.ENTER && state.open) {
        event.preventDefault();
      } else if (keyCode === KeyCode.ESC) {
        if (state.open) {
          _this.setOpenState(false);

          event.preventDefault();
          event.stopPropagation();
        }

        return;
      }

      if (_this.getRealOpenState(state)) {
        var menu = _this.selectTriggerRef.getInnerMenu();

        if (menu && menu.onKeyDown(event, _this.handleBackfill)) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuSelect", function (_ref) {
      var item = _ref.item;

      if (!item) {
        return;
      }

      var itemProps = item.props;
      var type = itemProps && itemProps.type; // 自定义属性的区域

      if (type === 'custom') {
        return;
      }

      var value = _this.state.value;
      var props = _this.props;
      var selectedValue = getValuePropValue(item);
      var lastValue = value[value.length - 1];

      _this.fireSelect(selectedValue);

      if (isMultipleOrTags(props)) {
        if (findIndexInValueBySingleValue(value, selectedValue) !== -1) {
          return;
        }

        value = value.concat([selectedValue]);
      } else {
        if (lastValue !== undefined && lastValue === selectedValue && selectedValue !== _this.state.backfillValue) {
          _this.setOpenState(false, true);

          return;
        }

        value = [selectedValue];

        _this.setOpenState(false, true);
      }

      _this.fireChange(value);

      var inputValue;

      if (isCombobox(props)) {
        inputValue = getPropValue(item, props.optionLabelProp);
      } else {
        inputValue = '';
      }

      if (props.autoClearSearchValue) {
        _this.setInputValue(inputValue, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuDeselect", function (_ref2) {
      var item = _ref2.item,
          domEvent = _ref2.domEvent;

      if (domEvent.type === 'click') {
        _this.removeSelected(getValuePropValue(item));
      }

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      if (props.autoClearSearchValue) {
        _this.setInputValue('', false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onArrowClick", function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (!_this.props.disabled) {
        _this.setOpenState(!_this.state.open, !_this.state.open);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPlaceholderClick", function () {
      if (_this.getInputDOMNode()) {
        _this.getInputDOMNode().focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOuterFocus", function (e) {
      if (_this.props.disabled) {
        e.preventDefault();
        return;
      }

      _this.clearBlurTime();

      if (!isMultipleOrTagsOrCombobox(_this.props) && e.target === _this.getInputDOMNode()) {
        return;
      }

      if (_this._focused) {
        return;
      }

      _this._focused = true;

      _this.updateFocusClassName(); // only effect multiple or tag mode


      if (!isMultipleOrTags(_this.props) || !_this._mouseDown) {
        _this.timeoutFocus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPopupFocus", function () {
      // fix ie scrollbar, focus element again
      _this.maybeFocus(true, true);
    });

    _defineProperty(_assertThisInitialized(_this), "onOuterBlur", function (e) {
      if (_this.props.disabled) {
        e.preventDefault();
        return;
      }

      _this.blurTimer = setTimeout(function () {
        _this._focused = false;

        _this.updateFocusClassName();

        var props = _this.props;
        var value = _this.state.value;
        var inputValue = _this.state.inputValue;

        if (isSingleMode(props) && props.showSearch && inputValue && props.defaultActiveFirstOption) {
          var options = _this._options || [];

          if (options.length) {
            var firstOption = findFirstMenuItem(options);

            if (firstOption) {
              value = [getValuePropValue(firstOption)];

              _this.fireChange(value);
            }
          }
        } else if (isMultipleOrTags(props) && inputValue) {
          if (_this._mouseDown) {
            // need update dropmenu when not blur
            _this.setInputValue('');
          } else {
            // this.state.inputValue = (this.getInputDOMNode().value || '');
            _this.state.inputValue = '';
          }

          value = _this.getValueByInput(inputValue);

          if (value !== undefined) {
            _this.fireChange(value);
          }
        } // if click the rest space of Select in multiple mode


        if (isMultipleOrTags(props) && _this._mouseDown) {
          _this.maybeFocus(true, true);

          _this._mouseDown = false;
          return;
        }

        _this.setOpenState(false);

        props.onBlur(_this.getVLForOnChange(value));
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      var _this$props = _this.props,
          onMouseEnter = _this$props.onMouseEnter,
          disabled = _this$props.disabled,
          disabledReason = _this$props.disabledReason;

      if (disabled && disabledReason) {
        _this.setState({
          showDisabledReason: true
        });
      }

      if (onMouseEnter) {
        onMouseEnter();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      var onMouseLeave = _this.props.onMouseLeave;

      _this.setState({
        showDisabledReason: false
      });

      if (onMouseLeave) {
        onMouseLeave();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClearSelection", function (event) {
      var props = _this.props;
      var state = _this.state;

      if (props.disabled) {
        return;
      }

      var inputValue = state.inputValue,
          value = state.value;
      event.stopPropagation();

      if (inputValue || value.length) {
        if (value.length) {
          _this.fireChange([]);
        }

        _this.setOpenState(false, true);

        if (inputValue) {
          _this.setInputValue('');
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChoiceAnimationLeave", function () {
      _this.forcePopupAlign();
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionInfoBySingleValue", function (value, optionsInfo) {
      var info;
      optionsInfo = optionsInfo || _this.state.optionsInfo;

      if (optionsInfo[getMapKey(value)]) {
        info = optionsInfo[getMapKey(value)];
      }

      if (info) {
        return info;
      }

      var defaultLabel = value;

      if (_this.props.labelInValue) {
        var label = getLabelFromPropsValue(_this.props.value, value);

        if (label !== undefined) {
          defaultLabel = label;
        }
      }

      var defaultInfo = {
        option: React.createElement(Option, {
          value: value,
          key: value
        }, value),
        value: value,
        label: defaultLabel
      };
      return defaultInfo;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionBySingleValue", function (value) {
      var _this$getOptionInfoBy = _this.getOptionInfoBySingleValue(value),
          option = _this$getOptionInfoBy.option;

      return option;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionsBySingleValue", function (values) {
      return values.map(function (value) {
        return _this.getOptionBySingleValue(value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getValueByLabel", function (label) {
      if (label === undefined) {
        return null;
      }

      var value = null;
      Object.keys(_this.state.optionsInfo).forEach(function (key) {
        var info = _this.state.optionsInfo[key];

        if (toArray(info.label).join('') === label) {
          value = info.value;
        }
      });
      return value;
    });

    _defineProperty(_assertThisInitialized(_this), "getVLBySingleValue", function (value) {
      if (_this.props.labelInValue) {
        return {
          key: value,
          label: _this.getLabelBySingleValue(value)
        };
      }

      return value;
    });

    _defineProperty(_assertThisInitialized(_this), "getVLForOnChange", function (vls_) {
      var vls = vls_;

      if (vls !== undefined) {
        if (!_this.props.labelInValue) {
          vls = vls.map(function (v) {
            return v;
          });
        } else {
          vls = vls.map(function (vl) {
            return {
              key: vl,
              label: _this.getLabelBySingleValue(vl)
            };
          });
        }

        return isMultipleOrTags(_this.props) ? vls : vls[0];
      }

      return vls;
    });

    _defineProperty(_assertThisInitialized(_this), "getLabelBySingleValue", function (value, optionsInfo) {
      var _this$getOptionInfoBy2 = _this.getOptionInfoBySingleValue(value, optionsInfo),
          label = _this$getOptionInfoBy2.label;

      return label;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownContainer", function () {
      if (!_this.dropdownContainer) {
        _this.dropdownContainer = document.createElement('div');
        document.body.appendChild(_this.dropdownContainer);
      }

      return _this.dropdownContainer;
    });

    _defineProperty(_assertThisInitialized(_this), "getPlaceholderElement", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props,
          state = _assertThisInitialize2.state;

      var hidden = false;

      if (state.inputValue) {
        hidden = true;
      }

      if (state.value.length) {
        hidden = true;
      }

      if (isCombobox(props) && state.value.length === 1 && !state.value[0]) {
        hidden = false;
      }

      var placeholder = props.placeholder;

      if (placeholder) {
        return React.createElement("div", _extends({
          onMouseDown: preventDefaultEvent,
          style: _extends({
            display: hidden ? 'none' : 'block'
          }, UNSELECTABLE_STYLE)
        }, UNSELECTABLE_ATTRIBUTE, {
          onClick: _this.onPlaceholderClick,
          className: props.prefixCls + "-selection__placeholder"
        }), placeholder);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "getInputElement", function () {
      var _classnames;

      var props = _this.props;
      var inputElement = props.getInputElement ? props.getInputElement() : React.createElement("input", {
        id: props.id,
        autoComplete: "off"
      });
      var inputCls = classnames(inputElement.props.className, (_classnames = {}, _classnames[props.prefixCls + "-search__field"] = true, _classnames)); // Add space to the end of the inputValue as the width measurement tolerance

      return React.createElement("div", {
        className: props.prefixCls + "-search__field__wrap"
      }, React.cloneElement(inputElement, {
        ref: _this.saveInputRef,
        onChange: _this.onInputChange,
        onKeyDown: chaining(_this.onInputKeyDown, inputElement.props.onKeyDown, _this.props.onInputKeyDown),
        value: _this.state.inputValue,
        disabled: props.disabled,
        className: inputCls
      }), React.createElement("span", {
        ref: _this.saveInputMirrorRef,
        className: props.prefixCls + "-search__field__mirror"
      }, _this.state.inputValue, "\xA0"));
    });

    _defineProperty(_assertThisInitialized(_this), "getInputDOMNode", function () {
      return _this.topCtrlRef ? _this.topCtrlRef.querySelector('input,textarea,div[contentEditable]') : _this.inputRef;
    });

    _defineProperty(_assertThisInitialized(_this), "getInputMirrorDOMNode", function () {
      return _this.inputMirrorRef;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupDOMNode", function () {
      return _this.selectTriggerRef.getPopupDOMNode();
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupMenuComponent", function () {
      return _this.selectTriggerRef.getInnerMenu();
    });

    _defineProperty(_assertThisInitialized(_this), "setOpenState", function (open, needFocus) {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          props = _assertThisInitialize3.props,
          state = _assertThisInitialize3.state;

      if (state.open === open) {
        _this.maybeFocus(open, needFocus);

        return;
      }

      if (_this.props.onDropdownVisibleChange) {
        _this.props.onDropdownVisibleChange(open);
      }

      var nextState = {
        open: open,
        backfillValue: undefined
      }; // clear search input value when open is false in singleMode.

      if (!open && isSingleMode(props) && props.showSearch) {
        _this.setInputValue('', false);
      }

      if (!open) {
        _this.maybeFocus(open, needFocus);
      }

      _this.setState(nextState, function () {
        if (open) {
          _this.maybeFocus(open, needFocus);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setInputValue", function (inputValue, fireSearch) {
      if (fireSearch === void 0) {
        fireSearch = true;
      }

      if (inputValue !== _this.state.inputValue) {
        _this.setState({
          inputValue: inputValue
        }, _this.forcePopupAlign);

        if (fireSearch) {
          _this.props.onSearch(inputValue);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getValueByInput", function (string) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          tokenSeparators = _this$props2.tokenSeparators;
      var nextValue = _this.state.value;
      var hasNewValue = false;
      splitBySeparators(string, tokenSeparators).forEach(function (label) {
        var selectedValue = [label];

        if (multiple) {
          var value = _this.getValueByLabel(label);

          if (value && findIndexInValueBySingleValue(nextValue, value) === -1) {
            nextValue = nextValue.concat(value);
            hasNewValue = true;

            _this.fireSelect(value);
          }
        } else if (findIndexInValueBySingleValue(nextValue, label) === -1) {
          nextValue = nextValue.concat(selectedValue);
          hasNewValue = true;

          _this.fireSelect(label);
        }
      });
      return hasNewValue ? nextValue : undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "getRealOpenState", function (state) {
      var props = _this.props;
      var _open = props.open,
          showSearch = props.showSearch;

      if (typeof _open === 'boolean') {
        return _open;
      }

      var open = (state || _this.state).open; // const inputValue = this.state.inputValue;

      var options = _this._options || [];
      var optionsLength = options.length;

      if (isMultipleOrTagsOrCombobox(props) || !showSearch) {
        if (open && !optionsLength) {
          open = false;
        }
      }

      open = _this.hidePopElementInSearchMode() ? open : _this.hidePopElementInSearchMode();
      return open;
    });

    _defineProperty(_assertThisInitialized(_this), "hidePopElementInSearchMode", function () {
      var showSearch = _this.props.showSearch;
      var inputValue = _this.state.inputValue;
      var options = _this._options || [];
      var optionsLength = options.length;
      var open = true; // 如果搜索模式, 没有输入不展示下拉

      if (showSearch && !inputValue && !optionsLength) {
        open = false;
      }

      return open;
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (isSingleMode(_this.props) && _this.selectionRef) {
        _this.selectionRef.focus();
      } else if (_this.getInputDOMNode()) {
        _this.getInputDOMNode().focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      if (isSingleMode(_this.props) && _this.selectionRef) {
        _this.selectionRef.blur();
      } else if (_this.getInputDOMNode()) {
        _this.getInputDOMNode().blur();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "markMouseDown", function () {
      _this._mouseDown = true;
    });

    _defineProperty(_assertThisInitialized(_this), "markMouseLeave", function () {
      _this._mouseDown = false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackfill", function (item) {
      if (!_this.props.backfill || !(isSingleMode(_this.props) || isCombobox(_this.props))) {
        return;
      }

      var key = getValuePropValue(item);

      if (isCombobox(_this.props)) {
        _this.setInputValue(key, false);
      }

      _this.setState({
        value: [key],
        backfillValue: key
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterOption", function (input, child, defaultFilter) {
      if (defaultFilter === void 0) {
        defaultFilter = defaultFilterFn;
      }

      var value = _this.state.value;
      var lastValue = value[value.length - 1];

      if (!input || lastValue && lastValue === _this.state.backfillValue) {
        return true;
      }

      var filterFn = _this.props.filterOption;

      if ('filterOption' in _this.props) {
        if (_this.props.filterOption === true) {
          filterFn = defaultFilter;
        }
      } else {
        filterFn = defaultFilter;
      }

      if (!filterFn) {
        return true;
      }

      if (typeof filterFn === 'function') {
        return filterFn.call(_assertThisInitialized(_this), input, child);
      }

      if (child.props.disabled) {
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "timeoutFocus", function () {
      if (_this.focusTimer) {
        _this.clearFocusTime();
      }

      _this.focusTimer = setTimeout(function () {
        _this.props.onFocus();
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "clearFocusTime", function () {
      if (_this.focusTimer) {
        clearTimeout(_this.focusTimer);
        _this.focusTimer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearBlurTime", function () {
      if (_this.blurTimer) {
        clearTimeout(_this.blurTimer);
        _this.blurTimer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateFocusClassName", function () {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          rootRef = _assertThisInitialize4.rootRef,
          props = _assertThisInitialize4.props; // avoid setState and its side effect


      if (_this._focused) {
        classes(rootRef).add(props.prefixCls + "-focused");
      } else {
        classes(rootRef).remove(props.prefixCls + "-focused");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "maybeFocus", function (open, needFocus) {
      if (needFocus || open) {
        var input = _this.getInputDOMNode();

        var _document = document,
            activeElement = _document.activeElement;

        if (input && (open || isMultipleOrTagsOrCombobox(_this.props))) {
          if (activeElement !== input) {
            input.focus();
            _this._focused = true;
          }
        } else if (activeElement !== _this.selectionRef) {
          _this.selectionRef.focus();

          _this._focused = true;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeSelected", function (selectedKey, e) {
      var props = _this.props;

      if (props.disabled || _this.isChildDisabled(selectedKey)) {
        return;
      } // Do not trigger Trigger popup


      if (e && e.stopPropagation) {
        e.stopPropagation();
      }

      var value = _this.state.value.filter(function (singleValue) {
        return singleValue !== selectedKey;
      });

      var canMultiple = isMultipleOrTags(props);

      if (canMultiple) {
        var event = selectedKey;

        if (props.labelInValue) {
          event = {
            key: selectedKey,
            label: _this.getLabelBySingleValue(selectedKey)
          };
        }

        props.onDeselect(event, _this.getOptionBySingleValue(selectedKey));
      }

      _this.fireChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "openIfHasChildren", function () {
      var props = _this.props;

      if (React.Children.count(props.children) || isSingleMode(props)) {
        _this.setOpenState(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "fireSelect", function (value) {
      _this.props.onSelect(_this.getVLBySingleValue(value), _this.getOptionBySingleValue(value));
    });

    _defineProperty(_assertThisInitialized(_this), "fireChange", function (value) {
      var props = _this.props;

      if (!('value' in props)) {
        _this.setState({
          value: value
        }, _this.forcePopupAlign);
      }

      var vls = _this.getVLForOnChange(value);

      var options = _this.getOptionsBySingleValue(value);

      props.onChange(vls, isMultipleOrTags(_this.props) ? options : options[0]);
    });

    _defineProperty(_assertThisInitialized(_this), "isChildDisabled", function (key) {
      return childrenToArray(_this.props.children).some(function (child) {
        var childValue = getValuePropValue(child);
        return childValue === key && child.props && child.props.disabled;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "forcePopupAlign", function () {
      if (!_this.state.open) {
        return;
      }

      _this.selectTriggerRef.triggerRef.forcePopupAlign();
    });

    _defineProperty(_assertThisInitialized(_this), "renderFilterOptions", function () {
      var inputValue = _this.state.inputValue;
      var _this$props3 = _this.props,
          children = _this$props3.children,
          tags = _this$props3.tags,
          filterOption = _this$props3.filterOption,
          notFoundContent = _this$props3.notFoundContent,
          showSearch = _this$props3.showSearch,
          checkboxPrefixCls = _this$props3.checkboxPrefixCls,
          prefixCls = _this$props3.prefixCls;
      var menuItems = [];
      var childrenKeys = [];

      var options = _this.renderFilterOptionsFromChildren(children, childrenKeys, menuItems);

      if (tags) {
        // tags value must be string
        var value = _this.state.value;
        value = value.filter(function (singleValue) {
          return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
        });
        value.forEach(function (singleValue) {
          var key = singleValue;
          var children = React.createElement("span", null, React.createElement(Checkbox, {
            checked: true,
            prefixCls: checkboxPrefixCls
          }), React.createElement(SearchText, {
            showSearch: true,
            text: key,
            searchValue: inputValue,
            prefixCls: prefixCls
          }));
          var menuItem = React.createElement(MenuItem, {
            style: UNSELECTABLE_STYLE,
            role: "option",
            attribute: UNSELECTABLE_ATTRIBUTE,
            value: key,
            key: key,
            type: "normal"
          }, children);
          options.push(menuItem);
          menuItems.push(menuItem);
        });

        if (inputValue) {
          var notFindInputItem = menuItems.every(function (option) {
            // this.filterOption return true has two meaning,
            // 1, some one exists after filtering
            // 2, filterOption is set to false
            // condition 2 does not mean the option has same value with inputValue
            var filterFn = function filterFn() {
              return getValuePropValue(option) === inputValue;
            };

            if (filterOption !== false) {
              return !_this.filterOption.call(_assertThisInitialized(_this), inputValue, option, filterFn);
            }

            return !filterFn();
          });

          if (notFindInputItem) {
            options.unshift(React.createElement(MenuItem, {
              style: UNSELECTABLE_STYLE,
              role: "option",
              attribute: UNSELECTABLE_ATTRIBUTE,
              value: inputValue,
              key: inputValue,
              type: "normal"
            }, inputValue));
          }
        }
      }

      if (!options.length && notFoundContent && !showSearch || !options.length && notFoundContent && inputValue && showSearch) {
        options = [React.createElement(MenuItem, {
          style: UNSELECTABLE_STYLE,
          attribute: UNSELECTABLE_ATTRIBUTE,
          disabled: true,
          role: "option",
          value: "NOT_FOUND",
          key: "NOT_FOUND",
          type: "normal"
        }, notFoundContent)];
      }

      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "renderFilterOptionsFromChildren", function (children, childrenKeys, menuItems) {
      var sel = [];
      var props = _this.props;
      var inputValue = _this.state.inputValue;
      var tags = props.tags,
          multiple = props.multiple,
          checkboxPrefixCls = props.checkboxPrefixCls,
          prefixCls = props.prefixCls;
      React.Children.forEach(children, function (child) {
        if (!child) {
          return;
        }

        if (child.type.isSelectOptGroup) {
          var innerItems = _this.renderFilterOptionsFromChildren(child.props.children, childrenKeys, menuItems);

          if (innerItems.length) {
            var label = child.props.label;
            var key = child.key;

            if (!key && typeof label === 'string') {
              key = label;
            } else if (!label && key) {
              label = key;
            }

            sel.push(React.createElement(MenuItemGroup, {
              key: key,
              title: label
            }, innerItems));
          }

          return;
        }

        warning(child.type.isSelectOption, 'the children of `Select` should be `Select.Option` or `Select.OptGroup`, ' + ("instead of `" + (child.type.name || child.type.displayName || child.type) + "`."));
        var childValue = getValuePropValue(child);
        validateOptionValue(childValue, _this.props);

        if (_this.filterOption(inputValue, child)) {
          var _key3 = child.key;
          var type = child.props.type !== 'custom' ? 'normal' : 'custom';
          var _children = child.props.children;

          if (typeof _children === 'string' && (tags || multiple)) {
            var checked = false;

            if (_this.state.value.indexOf(_key3) > -1) {
              checked = true;
            }

            _children = React.createElement("span", null, React.createElement(Checkbox, {
              checked: checked,
              prefixCls: checkboxPrefixCls
            }), React.createElement(SearchText, {
              showSearch: true,
              text: _children,
              searchValue: inputValue,
              prefixCls: prefixCls
            }));
          }

          var menuItem = React.createElement(MenuItem, _extends({
            style: UNSELECTABLE_STYLE,
            attribute: UNSELECTABLE_ATTRIBUTE,
            value: childValue,
            key: childValue,
            role: "option"
          }, child.props, {
            type: type
          }), _children);
          sel.push(menuItem);
          menuItems.push(menuItem);
        }

        if (tags) {
          childrenKeys.push(childValue);
        }
      });
      return sel;
    });

    _defineProperty(_assertThisInitialized(_this), "renderTopControlNode", function () {
      var _this$state = _this.state,
          value = _this$state.value,
          open = _this$state.open,
          inputValue = _this$state.inputValue;
      var props = _this.props;
      var prefixCls = props.prefixCls,
          removeIcon = props.removeIcon,
          maxTagCount = props.maxTagCount,
          titleCallback = props.titleCallback,
          showSearch = props.showSearch,
          selectorName = props.selectorName,
          customRenderTarget = props.customRenderTarget;
      var className = prefixCls + "-selection__rendered";
      var innerNode = null;

      if (isSingleMode(props)) {
        var selectedValue = null;

        if (value.length === 1 && value[0] != null) {
          var _classnames2;

          var showSelectedValue = false;
          var opacity = 1;

          if (!showSearch) {
            showSelectedValue = true;
          } else if (open) {
            showSelectedValue = !inputValue;

            if (showSelectedValue) {
              opacity = 0.4;
            }
          } else {
            showSelectedValue = true;
          }

          var singleValue = value[0];

          var optionInfo = _this.getOptionInfoBySingleValue(singleValue);

          var label = optionInfo.label,
              title = optionInfo.title;
          var showLabel = label || selectorName;

          if (customRenderTarget && typeof customRenderTarget === 'function') {
            showLabel = customRenderTarget(singleValue, optionInfo);
          }

          var itemClassName = classnames(prefixCls + "-selection-selected-value", (_classnames2 = {}, _classnames2[prefixCls + "-selection-selected-value-selector-name"] = !label && selectorName, _classnames2));
          selectedValue = React.createElement("div", {
            key: "value",
            className: itemClassName,
            title: toTitle(title || label),
            style: {
              display: showSelectedValue ? 'block' : 'none',
              opacity: opacity
            }
          }, showLabel);
        } else if (selectorName) {
          selectedValue = React.createElement("div", {
            key: "value",
            className: prefixCls + "-selection-selected-value",
            title: toTitle(selectorName),
            style: {
              opacity: 0.4
            }
          }, selectorName);
        }

        if (!showSearch) {
          innerNode = [selectedValue];
        } else {
          innerNode = [selectedValue, React.createElement("div", {
            className: prefixCls + "-search " + prefixCls + "-search--inline",
            key: "input",
            style: {
              display: open ? 'block' : 'none'
            }
          }, _this.getInputElement())];
        }

        return React.createElement("div", {
          className: className,
          ref: _this.saveTopCtrlRef
        }, _this.getPlaceholderElement(), innerNode);
      }

      var selectedValueNodes = [];
      var limitedCountValue = value;

      if (isMultipleOrTags(props)) {
        var _classnames3;

        var type = titleCallback.type,
            _selectorName = titleCallback.selectorName;

        if (type === 'enum' || type === 'count' || type === 'custom') {
          // 枚举类型
          var firstLabel = limitedCountValue[0] ? getMultipleCheckboxLabel(_this.getOptionInfoBySingleValue(limitedCountValue[0]).label || '') : '';
          var secondLabel = limitedCountValue[1] ? getMultipleCheckboxLabel(_this.getOptionInfoBySingleValue(limitedCountValue[1]).label || '') : '';
          var limitedCountValueLength = limitedCountValue.length;
          var text = limitedCountValueLength === 1 ? firstLabel : firstLabel + "\u3001" + secondLabel + "\u7B49" + limitedCountValueLength + "\u4E2A";

          if (type === 'count') {
            text = limitedCountValueLength === 1 ? firstLabel : _selectorName + "(" + limitedCountValueLength + "\u4E2A)";
          } else if (type === 'custom') {
            if (typeof titleCallback.customRenderTarget === 'function') {
              text = titleCallback.customRenderTarget(value);
            } else {
              text = _selectorName;
            }
          }

          var _showSelectedValue = false;
          var _opacity = 1;

          if (!showSearch) {
            _showSelectedValue = true;
          } else if (open) {
            _showSelectedValue = !inputValue;

            if (_showSelectedValue) {
              _opacity = 0.4;
            }
          } else {
            _showSelectedValue = true;
          }

          var _selectedValue = limitedCountValueLength ? React.createElement("div", {
            key: "value",
            className: prefixCls + "-selection-selected-value",
            title: toTitle(text),
            style: {
              display: _showSelectedValue ? 'block' : 'none',
              opacity: _opacity
            }
          }, text) : null;

          return React.createElement("div", {
            className: className,
            ref: _this.saveTopCtrlRef
          }, _this.getPlaceholderElement(), _selectedValue);
        }

        selectedValueNodes = limitedCountValue.map(function (singleValue) {
          var info = _this.getOptionInfoBySingleValue(singleValue);

          var infoLabel = info.label.props && info.label.props.label || info.label;
          var content = typeof infoLabel === 'string' ? infoLabel : singleValue;
          var title = info.title || content;

          var disabled = _this.isChildDisabled(singleValue);

          var choiceClassName = disabled ? prefixCls + "-selection__choice " + prefixCls + "-selection__choice__disabled" : prefixCls + "-selection__choice";
          return React.createElement("li", _extends({
            style: UNSELECTABLE_STYLE
          }, UNSELECTABLE_ATTRIBUTE, {
            onMouseDown: preventDefaultEvent,
            className: choiceClassName,
            key: singleValue || SELECT_EMPTY_VALUE_KEY,
            title: toTitle(title)
          }), React.createElement("div", {
            className: prefixCls + "-selection__choice__content"
          }, content), disabled ? null : React.createElement("span", {
            onClick: function onClick(event) {
              _this.removeSelected(singleValue, event);
            },
            className: prefixCls + "-selection__choice__remove"
          }, removeIcon || React.createElement(IconClose, null)));
        });
        var inputClasses = classnames(prefixCls + "-search", prefixCls + "-search--inline", (_classnames3 = {}, _classnames3[prefixCls + "-search-hidden"] = !open && value.length > maxTagCount, _classnames3));
        selectedValueNodes.push(React.createElement("li", {
          className: inputClasses,
          key: "input"
        }, _this.getInputElement()));
        innerNode = selectedValueNodes.length ? React.createElement("ul", {
          className: prefixCls + "-search-ul"
        }, selectedValueNodes) : null;
        return React.createElement("div", {
          className: className,
          ref: _this.saveTopCtrlRef
        }, _this.getPlaceholderElement(), innerNode);
      }

      selectedValueNodes.push(React.createElement("li", {
        className: prefixCls + "-search " + prefixCls + "-search--inline",
        key: "__input"
      }, _this.getInputElement()));
      innerNode = React.createElement("ul", null, selectedValueNodes);
      return React.createElement("div", {
        className: className,
        ref: _this.saveTopCtrlRef
      }, _this.getPlaceholderElement(), innerNode);
    });

    var _optionsInfo = OneSelect.getOptionsInfoFromProps(_props);

    _this.state = {
      value: OneSelect.getValueFromProps(_props, true),
      // true: use default value
      inputValue: _props.combobox ? OneSelect.getInputValueForCombobox(_props, _optionsInfo, true // use default value
      ) : '',
      open: _props.defaultOpen,
      optionsInfo: _optionsInfo,
      // a flag for aviod redundant getOptionsInfoFromProps call
      skipBuildOptionsInfo: true,
      showDisabledReason: false,
      // 获取dom高度
      ctrNodeHeight: 28
    };
    _this.saveInputRef = saveRef(_assertThisInitialized(_this), 'inputRef');
    _this.saveInputMirrorRef = saveRef(_assertThisInitialized(_this), 'inputMirrorRef');
    _this.saveTopCtrlRef = saveRef(_assertThisInitialized(_this), 'topCtrlRef');
    _this.saveSelectTriggerRef = saveRef(_assertThisInitialized(_this), 'selectTriggerRef');
    _this.saveRootRef = saveRef(_assertThisInitialized(_this), 'rootRef');
    _this.saveSelectionRef = saveRef(_assertThisInitialized(_this), 'selectionRef');
    return _this;
  }

  var _proto = OneSelect.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearFocusTime();
    this.clearBlurTime();

    if (this.dropdownContainer) {
      ReactDOM.unmountComponentAtNode(this.dropdownContainer);
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }
  };

  _proto.renderClear = function renderClear() {
    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        allowClear = _this$props4.allowClear,
        clearIcon = _this$props4.clearIcon;
    var _this$state2 = this.state,
        value = _this$state2.value,
        inputValue = _this$state2.inputValue;
    var clear = React.createElement("span", _extends({
      key: "clear",
      className: prefixCls + "-selection__clear",
      onMouseDown: preventDefaultEvent,
      style: UNSELECTABLE_STYLE
    }, UNSELECTABLE_ATTRIBUTE, {
      onClick: this.onClearSelection
    }), clearIcon || React.createElement(IconTimesCircle, null));

    if (!allowClear) {
      return null;
    }

    if (isCombobox(this.props)) {
      if (inputValue) {
        return clear;
      }

      return null;
    }

    if (inputValue || value.length) {
      return clear;
    }

    return null;
  };

  _proto.renderTotalDom = function renderTotalDom() {
    var _classnames4;

    var _this$props5 = this.props,
        maxTagCount = _this$props5.maxTagCount,
        prefixCls = _this$props5.prefixCls,
        titleCallback = _this$props5.titleCallback,
        size = _this$props5.size;

    if (!maxTagCount) {
      return null;
    }

    var value = this.state.value;
    var valueLength = value.length;

    if (!valueLength || titleCallback.type !== 'list') {
      return null;
    }

    var ctrNodeHeight = this.state.ctrNodeHeight;
    var totalCountCls = classnames(prefixCls + "-selection__total_count", (_classnames4 = {}, _classnames4[prefixCls + "-selection__total_count-error"] = valueLength > maxTagCount, _classnames4[prefixCls + "-selection__total_count-min"] = ctrNodeHeight <= (heightToSizeMap[size] || heightToSizeMap.small), _classnames4));
    return React.createElement("span", {
      className: totalCountCls
    }, valueLength, "/", maxTagCount);
  };

  _proto.render = function render() {
    var _rootCls;

    var props = this.props;
    var multiple = isMultipleOrTags(props);
    var state = this.state;
    var className = props.className,
        disabled = props.disabled,
        prefixCls = props.prefixCls,
        inputIcon = props.inputIcon,
        titleCallback = props.titleCallback,
        suffixIcon = props.suffixIcon;
    var ctrlNode = this.renderTopControlNode();
    var open = this.state.open;

    if (open) {
      this._options = this.renderFilterOptions();
    }

    var realOpen = this.getRealOpenState();
    var options = this._options || [];
    var dataOrAriaAttributeProps = {}; // eslint-disable-next-line no-restricted-syntax

    for (var key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key) && (key.substr(0, 5) === 'data-' || key === 'role')) {
        dataOrAriaAttributeProps[key] = props[key];
      }
    }

    var extraSelectionProps = _extends({}, dataOrAriaAttributeProps);

    if (!isMultipleOrTagsOrCombobox(props)) {
      extraSelectionProps = _extends({}, extraSelectionProps, {
        onKeyDown: this.onKeyDown,
        tabIndex: props.disabled ? -1 : 0
      });
    }

    var hidePopElementInSearchMode = this.hidePopElementInSearchMode();
    var rootCls = (_rootCls = {}, _rootCls[className] = !!className, _rootCls[prefixCls] = 1, _rootCls[prefixCls + "-open"] = open && hidePopElementInSearchMode, _rootCls[prefixCls + "-focused"] = open || !!this._focused, _rootCls[prefixCls + "-combobox"] = isCombobox(props), _rootCls[prefixCls + "-disabled"] = disabled, _rootCls[prefixCls + "-enabled"] = !disabled, _rootCls[prefixCls + "-allow-clear"] = !!props.allowClear, _rootCls[prefixCls + "-no-arrow"] = !props.showArrow, _rootCls);
    var sectionCls = classnames(prefixCls + "-selection", prefixCls + "-selection--" + (multiple ? 'multiple' : 'single'));
    var type = multiple ? titleCallback.type : 'single';
    var trigger = 'click';

    if ('trigger' in props && !multiple) {
      trigger = props.trigger;
    }

    var action = disabled ? [] : [trigger];
    var suffixIconRender = null;

    if (suffixIcon) {
      if (typeof suffixIcon === 'string') {
        suffixIconRender = React.createElement(Icon, {
          type: suffixIcon
        });
      } else {
        suffixIconRender = suffixIcon;
      }
    }

    var defaultTitleRender = React.createElement("div", _extends({
      ref: this.saveSelectionRef,
      key: "selection",
      className: sectionCls
    }, extraSelectionProps, {
      type: type
    }), ctrlNode, this.renderClear(), suffixIconRender ? React.createElement("span", _extends({
      key: "custom-key",
      className: prefixCls + "-custom-key",
      style: UNSELECTABLE_STYLE
    }, UNSELECTABLE_ATTRIBUTE), suffixIconRender) : React.createElement("span", _extends({
      key: "arrow",
      className: prefixCls + "-arrow",
      style: UNSELECTABLE_STYLE
    }, UNSELECTABLE_ATTRIBUTE, {
      onClick: this.onArrowClick
    }), inputIcon || React.createElement(IconChevronDown, null)), multiple ? this.renderTotalDom() : null);
    return React.createElement(SelectTrigger, {
      onPopupFocus: this.onPopupFocus,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      dropdownAlign: props.dropdownAlign,
      dropdownClassName: props.dropdownClassName,
      dropdownMatchSelectWidth: props.dropdownMatchSelectWidth,
      defaultActiveFirstOption: props.defaultActiveFirstOption,
      dropdownMenuStyle: props.dropdownMenuStyle,
      transitionName: props.transitionName,
      animation: props.animation,
      prefixCls: props.prefixCls,
      dropdownStyle: props.dropdownStyle,
      combobox: props.combobox,
      showSearch: props.showSearch,
      options: options,
      multiple: multiple,
      disabled: disabled,
      visible: realOpen,
      inputValue: state.inputValue,
      value: state.value,
      backfillValue: state.backfillValue,
      firstActiveValue: props.firstActiveValue,
      onDropdownVisibleChange: this.onDropdownVisibleChange,
      getPopupContainer: props.getPopupContainer,
      onMenuSelect: this.onMenuSelect,
      onMenuDeselect: this.onMenuDeselect,
      onPopupScroll: props.onPopupScroll,
      showAction: props.showAction,
      ref: this.saveSelectTriggerRef,
      menuItemSelectedIcon: props.menuItemSelectedIcon,
      action: action
    }, React.createElement("div", {
      id: props.id,
      style: props.style,
      ref: this.saveRootRef,
      onBlur: this.onOuterBlur,
      onFocus: this.onOuterFocus,
      className: classnames(rootCls),
      onMouseDown: this.markMouseDown,
      onMouseUp: this.markMouseLeave,
      onMouseOut: this.markMouseLeave
    }, defaultTitleRender));
  };

  return OneSelect;
}(PureComponent);

_defineProperty(OneSelect, "propTypes", SelectPropTypes);

_defineProperty(OneSelect, "defaultProps", {
  prefixCls: 'new-fc-one-select',
  defaultOpen: false,
  labelInValue: false,
  defaultActiveFirstOption: true,
  showSearch: true,
  allowClear: false,
  placeholder: '',
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  onSelect: noop,
  onSearch: noop,
  onDeselect: noop,
  onInputKeyDown: noop,
  showArrow: true,
  dropdownMatchSelectWidth: true,
  dropdownStyle: {},
  dropdownMenuStyle: {},
  optionFilterProp: 'value',
  optionLabelProp: 'value',
  notFoundContent: 'Not Found',
  backfill: false,
  showAction: ['click'],
  tokenSeparators: [],
  autoClearSearchValue: true,
  titleCallback: {
    type: 'list',
    // 三类回填 enum, list, count
    selectorName: '' // 选择已选计数需要填写

  },
  disabledReason: '',
  selectorName: '',
  size: 'small',
  suffixIcon: null,
  checkboxPrefixCls: 'new-fc-one-checkbox'
});

_defineProperty(OneSelect, "getOptionsFromChildren", function (children, options) {
  if (options === void 0) {
    options = [];
  }

  React.Children.forEach(children, function (child) {
    if (!child) {
      return;
    }

    if (child.type.isSelectOptGroup) {
      OneSelect.getOptionsFromChildren(child.props.children, options);
    } else {
      options.push(child);
    }
  });
  return options;
});

_defineProperty(OneSelect, "getInputValueForCombobox", function (props, optionsInfo, useDefaultValue) {
  var value = [];

  if ('value' in props && !useDefaultValue) {
    value = toArray(props.value);
  }

  if ('defaultValue' in props && useDefaultValue) {
    value = toArray(props.defaultValue);
  }

  if (value.length) {
    value = value[0];
  } else {
    return '';
  }

  var label = value;

  if (props.labelInValue) {
    label = value.label;
  } else if (optionsInfo[getMapKey(value)]) {
    label = optionsInfo[getMapKey(value)].label;
  }

  if (label === undefined) {
    label = '';
  }

  return label;
});

_defineProperty(OneSelect, "getLabelFromOption", function (props, option) {
  return getPropValue(option, props.optionLabelProp);
});

_defineProperty(OneSelect, "getOptionsInfoFromProps", function (props, preState) {
  var options = OneSelect.getOptionsFromChildren(props.children);
  var optionsInfo = {};
  options.forEach(function (option) {
    var singleValue = getValuePropValue(option);
    optionsInfo[getMapKey(singleValue)] = {
      option: option,
      value: singleValue,
      label: OneSelect.getLabelFromOption(props, option),
      title: option.props.title
    };
  });

  if (preState) {
    // keep option info in pre state value.
    var oldOptionsInfo = preState.optionsInfo;
    var value = preState.value;
    value.forEach(function (v) {
      var key = getMapKey(v);

      if (!optionsInfo[key] && oldOptionsInfo[key] !== undefined) {
        optionsInfo[key] = oldOptionsInfo[key];
      }
    });
  }

  return optionsInfo;
});

_defineProperty(OneSelect, "getValueFromProps", function (props, useDefaultValue) {
  var value = [];

  if ('defaultValue' in props && useDefaultValue) {
    value = toArray(props.defaultValue);
  } else if ('value' in props) {
    value = toArray(props.value);
  }

  if (props.labelInValue) {
    value = value.map(function (v) {
      return v.key;
    });
  }

  return value;
});

export { OneSelect as default };