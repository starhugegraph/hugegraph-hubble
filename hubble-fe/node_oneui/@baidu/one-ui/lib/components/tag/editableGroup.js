"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _tag = _interopRequireDefault(require("./tag"));

var _group = require("./group");

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _input = _interopRequireDefault(require("../input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var groupTagClassName = (0, _classnames["default"])(className, prefixCls + "-group-wrapper");
    return _react["default"].createElement("div", {
      className: groupTagClassName
    }, dataSource.map(function (tag, index) {
      var label = tag.label,
          value = tag.value,
          tagProps = tag.tagProps;
      var isLongTag = label.length > 20;

      var tagElem = _react["default"].createElement(_tag["default"], _extends({
        key: index,
        closable: true,
        onClose: (0, _partial["default"])(_this2.handleClose, value)
      }, tagProps), isLongTag ? label.slice(0, 20) + "..." : label);

      return isLongTag ? _react["default"].createElement(_tooltip["default"], {
        title: tag,
        key: index
      }, tagElem) : tagElem;
    }), inputVisible && _react["default"].createElement(_input["default"], {
      inputRef: this.saveInputRef,
      size: size,
      style: {
        width: inputWidth
      },
      value: inputValue,
      onChange: this.handleInputChange,
      onBlur: this.handleInputConfirm,
      onPressEnter: this.handleInputConfirm
    }), !inputVisible && _react["default"].createElement(_tag["default"], {
      onClick: this.showInput,
      className: prefixCls + "-add-tag"
    }, "+ \u6DFB\u52A0"));
  };

  return EditableGroup;
}(_react.PureComponent);

_defineProperty(EditableGroup, "propTypes", {
  dataSource: _propTypes["default"].arrayOf(_group.dataSourceOption),
  defaultDataSource: _propTypes["default"].arrayOf(_group.dataSourceOption),
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  onClose: _propTypes["default"].func,
  size: _propTypes["default"].oneOf(['small', 'medium']),
  onInputConfirm: _propTypes["default"].func
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

(0, _reactLifecyclesCompat.polyfill)(EditableGroup);
var _default = EditableGroup;
exports["default"] = _default;
module.exports = exports.default;