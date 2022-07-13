"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _icon = _interopRequireDefault(require("../icon"));

var _popLayer = _interopRequireDefault(require("../popLayer"));

var _menu = _interopRequireDefault(require("../menu"));

var _searchText = _interopRequireDefault(require("../select/searchText"));

var _button = _interopRequireDefault(require("../button"));

var _commonTools = require("../../core/commonTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import {defaultInputWidth} from '../../core/inputTools';
var MenuItem = _menu["default"].Item;

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
      return (0, _classnames["default"])(prefixCls, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-readOnly"] = readOnly, _classNames));
    });

    _defineProperty(_assertThisInitialized(_this), "getSubMenuItem", function (option) {
      var menuItemProps = {
        key: option.value,
        ref: _lodash["default"].partial(_this.addAnchor, 'getMenuItemRef')
      };

      if (option.disabled) {
        menuItemProps.disabled = true;
      }

      return _react["default"].createElement(MenuItem, menuItemProps, _react["default"].createElement(_searchText["default"], {
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

      if (!_lodash["default"].isEmpty(options)) {
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
      var len = (0, _commonTools.getLengthInBytes)(value);
      var closeProps = {
        type: 'fail',
        className: (0, _classnames["default"])((_classNames2 = {}, _classNames2[prefixCls + "-icon"] = true, _classNames2[prefixCls + "-icon-close"] = true, _classNames2[prefixCls + "-icon-close-show"] = len && hasFocus, _classNames2[prefixCls + "-icon-close-spacing"] = searchIconType === 'button', _classNames2)),
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
      return _react["default"].createElement("div", {
        ref: _lodash["default"].partial(_this.addAnchor, 'searchIconAnchor'),
        className: prefixCls + "-icon-wrap"
      }, _react["default"].createElement(_icon["default"], closeProps), isShowSearchIcon && _react["default"].createElement("span", null, searchIconType === 'icon' && _react["default"].createElement(_button["default"], _extends({}, searchProps, {
        icon: "search"
      })), searchIconType === 'button' && _react["default"].createElement(_button["default"], buttonProps, "\u641C\u7D22")));
    });

    _defineProperty(_assertThisInitialized(_this), "renderInput", function () {
      var _this$props6 = _this.props,
          defaultQuery = _this$props6.defaultQuery,
          height = _this$props6.height;
      var _this$state2 = _this.state,
          value = _this$state2.value,
          searchIconWidth = _this$state2.searchIconWidth;
      var otherProps = (0, _omit["default"])(_this.props, ['prefixCls', 'defaultQuery', 'onPressEnter', 'onSearch', 'onClearClick', 'handleMenuClick', 'options', 'isShowDropDown', 'isShowSearchIcon', 'dropdownHeight', 'dropdownMatchSelectWidth', 'overlay', 'searchIconType', 'buttonWidth', 'onVisibleChange', 'showSearchIcon']);

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
      return _react["default"].createElement("input", _extends({}, otherProps, {
        className: (0, _classnames["default"])(_this.getInputClassName()),
        onKeyDown: _this.handleKeyDown,
        ref: _lodash["default"].partial(_this.addAnchor, 'search')
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderLayer", function () {
      var _this$props7 = _this.props,
          options = _this$props7.options,
          dropdownHeight = _this$props7.dropdownHeight,
          prefixCls = _this$props7.prefixCls,
          size = _this$props7.size;
      var optionsLength = options.length;

      var menu = _react["default"].createElement(_menu["default"], {
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
      ref: _lodash["default"].partial(this.addAnchor, 'container'),
      style: style,
      className: (0, _classnames["default"])(className, (_classNames3 = {}, _classNames3[prefixCls + "-container"] = true, _classNames3[prefixCls + "-container-disabled"] = disabled, _classNames3[prefixCls + "-container-focused"] = this.state.hasFocus, _classNames3), prefixCls + "-container-" + searchIconType, prefixCls + "-container-" + size)
    };
    var detailProps = {
      className: prefixCls + "-detail",
      style: style
    };
    var overlayClassName = (0, _classnames["default"])((_classNames4 = {}, _classNames4[prefixCls + "-layer"] = true, _classNames4[className + "-layer"] = className, _classNames4));
    var layerProps = {
      visible: visible && (overlay ? true : !!options.length),
      overlayClassName: overlayClassName,
      overlay: overlay != null ? overlay : this.renderLayer()
    };

    if ('dropdownMatchSelectWidth' in this.props) {
      layerProps.dropdownMatchSelectWidth = dropdownMatchSelectWidth;
    }

    return _react["default"].createElement("div", containerProps, _react["default"].createElement(_popLayer["default"], layerProps, _react["default"].createElement("div", detailProps, this.renderInput(), showSearchIcon ? this.renderIcon() : null)));
  };

  return Search;
}(_react.PureComponent);

exports["default"] = Search;

_defineProperty(Search, "propTypes", {
  /** 元素的唯一id */
  id: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** 搜索框大小，(xsmall/small/medium/large) */
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large']),

  /** 搜索框按钮宽度 */
  buttonWidth: _propTypes["default"].number,

  /** 搜索框宽度 */
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /** 搜索框高度 */
  height: _propTypes["default"].number,

  /** 搜索框是否可用 */
  disabled: _propTypes["default"].bool,

  /** 搜索框值 */
  value: _propTypes["default"].any,

  /** 搜索框默认值 */
  defaultValue: _propTypes["default"].string,

  /** 搜索框自定义类名 */
  className: _propTypes["default"].string,

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 回车按键回调函数 */
  onPressEnter: _propTypes["default"].func,

  /** 按键回调函数 */
  onKeyDown: _propTypes["default"].func,

  /** 值改变时回调函数 */
  onChange: _propTypes["default"].func,

  /** 点击搜索时回调函数 */
  onSearch: _propTypes["default"].func,

  /** 点击清空按钮时回调函数 */
  onClearClick: _propTypes["default"].func,

  /** 获得焦点时回调函数 */
  onFocus: _propTypes["default"].func,

  /** 失去焦点时回调函数 */
  onBlur: _propTypes["default"].func,

  /** 面板展开/收起时回调函数 */
  onVisibleChange: _propTypes["default"].func,

  /** 值为空时占位字符串 */
  placeholder: _propTypes["default"].string,

  /** 元素的类型 */
  type: _propTypes["default"].string,

  /** 元素的名称 */
  name: _propTypes["default"].string,

  /** 是否使用输入字段的自动完成功能 */
  autoComplete: _propTypes["default"].string,

  /** 是否使用输入字段的自动完成功能 */
  spellCheck: _propTypes["default"].bool,

  /** 在页面加载时是否获得焦点 */
  autoFocus: _propTypes["default"].bool,

  /** 值为空，点击搜索时代入输入框的值 */
  defaultQuery: _propTypes["default"].object,
  // 下拉框

  /** 下拉框中数据源，{key：value}数组 */
  options: _propTypes["default"].array,

  /** 下拉框高度 */
  dropdownHeight: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** 是否展现下拉框 为true时，options或overlay不为空时，才出现下拉框 */
  isShowDropDown: _propTypes["default"].bool,

  /** 是否展现搜索功能图标 */
  isShowSearchIcon: _propTypes["default"].bool,
  dropdownMatchSelectWidth: _propTypes["default"].bool,

  /** 下拉框中item点击回调函数 */
  handleMenuClick: _propTypes["default"].func,

  /** 下拉框内容自定义render，需要返回dom结构 */
  overlay: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),

  /** 搜索功能的按钮样式，(icon/button) */
  searchIconType: _propTypes["default"].string,
  // showSearchIcon
  showSearchIcon: _propTypes["default"].bool,
  // readOnly
  readOnly: _propTypes["default"].bool
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

module.exports = exports.default;