"use strict";

exports.__esModule = true;
exports["default"] = exports.dataSourceOption = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _pull = _interopRequireDefault(require("lodash/pull"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _tag = _interopRequireDefault(require("./tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dataSourceOption = _propTypes["default"].shape({
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]).isRequired,
  value: _propTypes["default"].string.isRequired,
  tagProps: _propTypes["default"].object
});

exports.dataSourceOption = dataSourceOption;

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
        (0, _pull["default"])(selectedValue, value);
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
    var groupTagClassName = (0, _classnames["default"])(className, prefixCls + "-group-wrapper");
    return _react["default"].createElement("div", {
      className: groupTagClassName
    }, dataSource.map(function (tag, index) {
      var value = tag.value,
          label = tag.label,
          _tag$tagProps = tag.tagProps,
          tagProps = _tag$tagProps === void 0 ? {} : _tag$tagProps;
      var checked = selectedValue.indexOf(value) > -1;
      var onClose = tagProps.onClose;

      if (onClose) {
        tagProps.onClose = (0, _partial["default"])(onClose, value);
      }

      return _react["default"].createElement(_tag["default"], _extends({
        key: index,
        size: size,
        checkable: true,
        checked: checked,
        onChange: (0, _partial["default"])(_this2.onChangeGroup, value)
      }, tagProps), label);
    }));
  };

  return GroupTag;
}(_react.PureComponent);

_defineProperty(GroupTag, "propTypes", {
  /**
   * value，区分单选和多选，单选取数组第1个
   */
  value: _propTypes["default"].arrayOf(_propTypes["default"].string),
  defaultValue: _propTypes["default"].arrayOf(_propTypes["default"].string),

  /**
   * mode 单选还是多选
   */
  mode: _propTypes["default"].oneOf(['unique', 'multiple']),

  /**
   * 数据源
   */
  dataSource: _propTypes["default"].arrayOf(dataSourceOption),
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  size: _propTypes["default"].oneOf(['small', 'medium'])
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

(0, _reactLifecyclesCompat.polyfill)(GroupTag);
var _default = GroupTag;
exports["default"] = _default;