function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file 搜索框
 * @author xuwenjun
 * @date 2018/11/22
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import _ from 'lodash';
import Icon from '../icon';
import Layer from '../popLayer';
import Menu from '../menu';
import SearchText from '../select/searchText';
import Button from '../button';
import { getLengthInBytes } from '../../core/commonTools'; // import {defaultInputWidth} from '../../core/inputTools';

var MenuItem = Menu.Item;

function fixControlledValue(value) {
  if (value == null) {
    return '';
  }

  return value;
}

function isFunc(value) {
  return typeof value === 'function';
}

var Search =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Search, _PureComponent);

  function Search(args) {
    var _this;

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var value = e.target.value;
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(e);
      }

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      if (!('isShowDropDown' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
      if (_this.search) {
        _this.search.focus();
      }

      _this.onVisibleChange(true);

      _this.setState({
        hasFocus: true
      });

      var onFocus = _this.props.onFocus;

      if (isFunc(onFocus)) {
        onFocus(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      var me = _assertThisInitialized(_this);

      setTimeout(function () {
        if (me.___stopBlur___) {
          me.___stopBlur___ = false;
          return;
        }

        me.setState({
          hasFocus: false
        });

        _this.onVisibleChange(false);

        if (me.search) {
          me.search.blur();
        }
      }, 250);
      var onBlur = _this.props.onBlur;

      if (isFunc(onBlur)) {
        onBlur(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getInputClassName", function () {
      var _classNames;

      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          size = _this$props.size,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly;
      return classNames(prefixCls, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-readOnly"] = readOnly, _classNames));
    });

    _defineProperty(_assertThisInitialized(_this), "getSubMenuItem", function (option) {
      var menuItemProps = {
        key: option.value,
        ref: _.partial(_this.addAnchor, 'getMenuItemRef')
      };

      if (option.disabled) {
        menuItemProps.disabled = true;
      }

      return React.createElement(MenuItem, menuItemProps, React.createElement(SearchText, {
        text: option.label,
        showSearch: true,
        searchValue: _this.state.value
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuClick", function (e) {
      _this.___stopBlur___ = false;

      _this.onVisibleChange(false);

      var _this$props2 = _this.props,
          handleMenuClick = _this$props2.handleMenuClick,
          options = _this$props2.options;

      if (handleMenuClick) {
        handleMenuClick(e);
      }

      if (!('value' in _this.props)) {
        var selectOption = options.filter(function (option) {
          return option.value === e.key;
        }) || [];

        _this.setState({
          value: selectOption[0].label || e.key
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var _this$props3 = _this.props,
          onPressEnter = _this$props3.onPressEnter,
          onKeyDown = _this$props3.onKeyDown,
          onSearch = _this$props3.onSearch;

      if (e.keyCode === 13) {
        var search = _this.search;
        var _e = {
          target: search
        };
        _e.target.value = _this.state.value;

        if (onPressEnter) {
          onPressEnter(_e);
        } else {
          onSearch(_e);
        }

        _this.onVisibleChange(false);

        if (search) {
          search.blur();
        }

        _this.setState({
          hasFocus: false
        });
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addAnchor", function (key, el) {
      _this[key] = el;
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      var options = _this.props.options;
      var search = _this.search;
      _this.___stopBlur___ = true;

      if (search) {
        search.focus();
      }

      _this.setState({
        value: '',
        hasFocus: true
      });

      if (!_.isEmpty(options)) {
        _this.onVisibleChange(true);
      }

      var e = {
        target: search
      };
      e.target.value = '';
      var onClearClick = _this.props.onClearClick;

      if (isFunc(onClearClick)) {
        onClearClick(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearch", function () {
      var _this$props4 = _this.props,
          disabled = _this$props4.disabled,
          defaultQuery = _this$props4.defaultQuery,
          onSearch = _this$props4.onSearch;

      var _assertThisInitialize = _assertThisInitialized(_this),
          container = _assertThisInitialize.container,
          search = _assertThisInitialize.search;

      if (disabled) {
        return;
      }

      var value = search.value;

      if (!value && defaultQuery && defaultQuery.value) {
        value = defaultQuery.value;
        _this.___stopBlur___ = true;

        _this.setState({
          value: value
        });
      }

      _this.onVisibleChange(false);

      var e = {
        target: container
      };
      e.target.value = value;

      if (isFunc(onSearch)) {
        onSearch(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderIcon", function () {
      var _classNames2;

      var _this$props5 = _this.props,
          prefixCls = _this$props5.prefixCls,
          isShowSearchIcon = _this$props5.isShowSearchIcon,
          searchIconType = _this$props5.searchIconType,
          buttonWidth = _this$props5.buttonWidth,
          height = _this$props5.height,
          disabled = _this$props5.disabled,
          size = _this$props5.size,
          readOnly = _this$props5.readOnly;
      var _this$state = _this.state,
          value = _this$state.value,
          hasFocus = _this$state.hasFocus;
      var len = getLengthInBytes(value);
      var closeProps = {
        type: 'fail',
        className: classNames((_classNames2 = {}, _classNames2[prefixCls + "-icon"] = true, _classNames2[prefixCls + "-icon-close"] = true, _classNames2[prefixCls + "-icon-close-show"] = len && hasFocus, _classNames2[prefixCls + "-icon-close-spacing"] = searchIconType === 'button', _classNames2)),
        onClick: _this.handleClose
      };
      var searchProps = {
        type: 'link',
        onClick: _this.handleSearch,
        size: size,
        disabled: disabled,
        readOnly: readOnly
      };
      var style = {};

      if (buttonWidth != null) {
        style.width = buttonWidth;
      }

      if (height != null) {
        style.height = height;
      }

      var buttonProps = {
        type: 'primary',
        className: prefixCls + "-icon-search-btn",
        disabled: disabled,
        onClick: _this.handleSearch,
        style: style,
        size: size,
        readOnly: readOnly
      };
      return React.createElement("div", {
        ref: _.partial(_this.addAnchor, 'searchIconAnchor'),
        className: prefixCls + "-icon-wrap"
      }, React.createElement(Icon, closeProps), isShowSearchIcon && React.createElement("span", null, searchIconType === 'icon' && React.createElement(Button, _extends({}, searchProps, {
        icon: "search"
      })), searchIconType === 'button' && React.createElement(Button, buttonProps, "\u641C\u7D22")));
    });

    _defineProperty(_assertThisInitialized(_this), "renderInput", function () {
      var _this$props6 = _this.props,
          defaultQuery = _this$props6.defaultQuery,
          height = _this$props6.height;
      var _this$state2 = _this.state,
          value = _this$state2.value,
          searchIconWidth = _this$state2.searchIconWidth;
      var otherProps = omit(_this.props, ['prefixCls', 'defaultQuery', 'onPressEnter', 'onSearch', 'onClearClick', 'handleMenuClick', 'options', 'isShowDropDown', 'isShowSearchIcon', 'dropdownHeight', 'dropdownMatchSelectWidth', 'overlay', 'searchIconType', 'buttonWidth', 'onVisibleChange', 'showSearchIcon']);

      if (value != null) {
        otherProps.value = fixControlledValue(value);
        delete otherProps.defaultValue;
      }

      var prefixQuery = defaultQuery.prefix,
          valueQuery = defaultQuery.value;

      if (prefixQuery && valueQuery) {
        otherProps.placeholder = prefixQuery + ": " + valueQuery;
      }

      otherProps.style = {
        // width: width || defaultInputWidth,
        paddingRight: searchIconWidth + 4
      };

      if (height != null) {
        otherProps.style.height = height;
      }

      otherProps.onFocus = _this.onFocus;
      otherProps.onBlur = _this.onBlur;
      otherProps.onChange = _this.onChange;
      return React.createElement("input", _extends({}, otherProps, {
        className: classNames(_this.getInputClassName()),
        onKeyDown: _this.handleKeyDown,
        ref: _.partial(_this.addAnchor, 'search')
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderLayer", function () {
      var _this$props7 = _this.props,
          options = _this$props7.options,
          dropdownHeight = _this$props7.dropdownHeight,
          prefixCls = _this$props7.prefixCls,
          size = _this$props7.size;
      var optionsLength = options.length;
      var menu = React.createElement(Menu, {
        style: {
          height: dropdownHeight
        },
        onClick: _this.handleMenuClick,
        theme: "light",
        selectable: false,
        className: prefixCls + "-layer-menu",
        size: size === 'xsmall' ? 'small' : size
      }, options.map(function (option, index) {
        return _this.getSubMenuItem(option, optionsLength, index);
      }));
      return menu;
    });

    var _value = args.value,
        isShowDropDown = args.isShowDropDown,
        defaultValue = args.defaultValue;
    _this.state = {
      searchIconWidth: 0,
      hasFocus: false,
      value: _value || defaultValue || '',
      visible: isShowDropDown || false
    };
    return _this;
  }

  var _proto = Search.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var me = this;
    me.___searchIconTimer___ = setInterval(function () {
      var searchIconAnchor = me.searchIconAnchor;

      if (!searchIconAnchor) {
        me.setState({
          searchIconWidth: 0
        });
        return;
      }

      var searchIconWidth = searchIconAnchor.offsetWidth;

      if (searchIconWidth === me.state.searchIconWidth) {
        return;
      }

      me.setState({
        searchIconWidth: searchIconWidth
      });
    }, 100);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        isShowDropDown = nextProps.isShowDropDown;

    if ('value' in nextProps && value !== this.props.value) {
      this.setState({
        value: value
      });
    }

    if ('isShowDropDown' in nextProps) {
      this.setState({
        visible: isShowDropDown
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.___searchIconTimer___);
  };

  _proto.render = function render() {
    var _classNames3, _classNames4;

    var _this$props8 = this.props,
        prefixCls = _this$props8.prefixCls,
        width = _this$props8.width,
        height = _this$props8.height,
        disabled = _this$props8.disabled,
        overlay = _this$props8.overlay,
        searchIconType = _this$props8.searchIconType,
        size = _this$props8.size,
        dropdownMatchSelectWidth = _this$props8.dropdownMatchSelectWidth,
        className = _this$props8.className,
        options = _this$props8.options,
        showSearchIcon = _this$props8.showSearchIcon;
    var visible = this.state.visible;
    var style = {};

    if (width != null) {
      style.width = width;
    }

    if (height != null) {
      style.height = height;
    }

    var containerProps = {
      ref: _.partial(this.addAnchor, 'container'),
      style: style,
      className: classNames(className, (_classNames3 = {}, _classNames3[prefixCls + "-container"] = true, _classNames3[prefixCls + "-container-disabled"] = disabled, _classNames3[prefixCls + "-container-focused"] = this.state.hasFocus, _classNames3), prefixCls + "-container-" + searchIconType, prefixCls + "-container-" + size)
    };
    var detailProps = {
      className: prefixCls + "-detail",
      style: style
    };
    var overlayClassName = classNames((_classNames4 = {}, _classNames4[prefixCls + "-layer"] = true, _classNames4[className + "-layer"] = className, _classNames4));
    var layerProps = {
      visible: visible && (overlay ? true : !!options.length),
      overlayClassName: overlayClassName,
      overlay: overlay != null ? overlay : this.renderLayer()
    };

    if ('dropdownMatchSelectWidth' in this.props) {
      layerProps.dropdownMatchSelectWidth = dropdownMatchSelectWidth;
    }

    return React.createElement("div", containerProps, React.createElement(Layer, layerProps, React.createElement("div", detailProps, this.renderInput(), showSearchIcon ? this.renderIcon() : null)));
  };

  return Search;
}(PureComponent);

_defineProperty(Search, "propTypes", {
  /** 元素的唯一id */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 搜索框大小，(xsmall/small/medium/large) */
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),

  /** 搜索框按钮宽度 */
  buttonWidth: PropTypes.number,

  /** 搜索框宽度 */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** 搜索框高度 */
  height: PropTypes.number,

  /** 搜索框是否可用 */
  disabled: PropTypes.bool,

  /** 搜索框值 */
  value: PropTypes.any,

  /** 搜索框默认值 */
  defaultValue: PropTypes.string,

  /** 搜索框自定义类名 */
  className: PropTypes.string,

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 回车按键回调函数 */
  onPressEnter: PropTypes.func,

  /** 按键回调函数 */
  onKeyDown: PropTypes.func,

  /** 值改变时回调函数 */
  onChange: PropTypes.func,

  /** 点击搜索时回调函数 */
  onSearch: PropTypes.func,

  /** 点击清空按钮时回调函数 */
  onClearClick: PropTypes.func,

  /** 获得焦点时回调函数 */
  onFocus: PropTypes.func,

  /** 失去焦点时回调函数 */
  onBlur: PropTypes.func,

  /** 面板展开/收起时回调函数 */
  onVisibleChange: PropTypes.func,

  /** 值为空时占位字符串 */
  placeholder: PropTypes.string,

  /** 元素的类型 */
  type: PropTypes.string,

  /** 元素的名称 */
  name: PropTypes.string,

  /** 是否使用输入字段的自动完成功能 */
  autoComplete: PropTypes.string,

  /** 是否使用输入字段的自动完成功能 */
  spellCheck: PropTypes.bool,

  /** 在页面加载时是否获得焦点 */
  autoFocus: PropTypes.bool,

  /** 值为空，点击搜索时代入输入框的值 */
  defaultQuery: PropTypes.object,
  // 下拉框

  /** 下拉框中数据源，{key：value}数组 */
  options: PropTypes.array,

  /** 下拉框高度 */
  dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 是否展现下拉框 为true时，options或overlay不为空时，才出现下拉框 */
  isShowDropDown: PropTypes.bool,

  /** 是否展现搜索功能图标 */
  isShowSearchIcon: PropTypes.bool,
  dropdownMatchSelectWidth: PropTypes.bool,

  /** 下拉框中item点击回调函数 */
  handleMenuClick: PropTypes.func,

  /** 下拉框内容自定义render，需要返回dom结构 */
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** 搜索功能的按钮样式，(icon/button) */
  searchIconType: PropTypes.string,
  // showSearchIcon
  showSearchIcon: PropTypes.bool,
  // readOnly
  readOnly: PropTypes.bool
});

_defineProperty(Search, "defaultProps", {
  prefixCls: 'new-fc-one-input-search',
  type: 'text',
  disabled: false,
  defaultQuery: {},
  isShowSearchIcon: true,
  dropdownHeight: 'auto',
  options: [],
  searchIconType: 'icon',
  size: 'small',
  showSearchIcon: true
});

export { Search as default };