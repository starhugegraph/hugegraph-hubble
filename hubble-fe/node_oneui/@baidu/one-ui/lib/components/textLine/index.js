"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _commonTools = require("../../core/commonTools");

var _textLineTools = require("../../core/textLineTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * TextLine component.
 */
var TextLine =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TextLine, _PureComponent);

  function TextLine(args) {
    var _this;

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onStateChange", function (obj) {
      _this.setState(obj);
    });

    _defineProperty(_assertThisInitialized(_this), "onTextAreaInput", function (e) {
      var fullValue = e.target.value.split(_this.props.lineBreak);

      if (_this.___imeStart___) {
        _this.setState({
          fullValue: fullValue
        });
      } else {
        _this.dispatchOnChange(fullValue);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDelAll", function () {
      _this.dispatchOnChange([]);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelSingle", function (index) {
      var newValue = [].concat(_this.props.value);
      newValue.splice(index, 1);

      _this.dispatchOnChange(newValue, index);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelErrorValues", function (indexArray) {
      var newValue = [].concat(_this.props.value); // 必须逆序

      var indexLen = indexArray.length;

      for (var i = indexLen; i > 0; i--) {
        newValue.splice(indexArray[i - 1], 1);
      }

      _this.dispatchOnChange(newValue);
    });

    _defineProperty(_assertThisInitialized(_this), "onStickErrorValues", function (indexArray) {
      var newValue = [].concat(_this.props.value);
      var _this$state = _this.state,
          errorMessageObj = _this$state.errorMessageObj,
          fullValue = _this$state.fullValue;
      var newErrorMessageObj = {};
      var temp = []; // 存放遍历错误的实际位置

      var result = []; // 必须逆序

      var indexLen = indexArray.length;

      for (var i = indexLen; i > 0; i--) {
        var realI = i - 1;
        var realErrorIndex = indexArray[realI]; // 按顺序的话，必须每次都放在前面

        result = [].concat(newValue.splice(realErrorIndex, 1), result);
        newErrorMessageObj[realI] = errorMessageObj[realErrorIndex];
        temp.push(realI);
      }

      var fullValueLen = fullValue.length;

      for (var _i = 0; _i < fullValueLen; _i++) {
        var realErrorMess = errorMessageObj[_i];

        if (realErrorMess && indexArray.indexOf(_i) === -1) {
          newErrorMessageObj[temp.length] = realErrorMess;
          temp.push(_i);
        } else if (!realErrorMess) {
          temp.push(_i);
        }
      }

      _this.setState({
        errorMessageObj: newErrorMessageObj
      });

      _this.dispatchOnChange([].concat(result, newValue), null, (0, _textLineTools.handleErrorObj)(newErrorMessageObj).errorMessageArrayObj);

      _this.contentAnchor.scrollTop = 0;
    });

    _defineProperty(_assertThisInitialized(_this), "onTextAreaKeyDown", function (e) {
      var keyCode = e.keyCode;
      var focusLine = _this.state.focusLine;
      var value = _this.props.value;
      var onStateChange = _this.onStateChange;
      var newfocusLine = focusLine + 1;
      var valueLen = value.length; // 回车符、换行符

      if (keyCode === 13 || keyCode === 10) {
        onStateChange({
          focusLine: newfocusLine
        }); // 方向键向下
      } else if (keyCode === 40) {
        if (valueLen > newfocusLine) {
          onStateChange({
            focusLine: newfocusLine
          });
        } // 方向键向上

      } else if (keyCode === 38) {
        if (focusLine >= 1) {
          onStateChange({
            focusLine: focusLine - 1
          });
        } // 方向键向左、向右、其他批量粘贴等

      } else {
        _this.handleFocusLine();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      var contentRef = _this.contentAnchor;

      _this.setState({
        hoverLine: Math.floor((contentRef.scrollTop + e.clientY - contentRef.getBoundingClientRect().y) / 28)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTextAreaBlur", function () {
      var _this$props = _this.props,
          value = _this$props.value,
          onBlur = _this$props.onBlur;

      _this.setState({
        hasFocus: false,
        focusLine: null
      });

      onBlur({
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTextAreaCompositionStart", function () {
      _this.___imeStart___ = true;
    });

    _defineProperty(_assertThisInitialized(_this), "onTextAreaCompositionEnd", function (e) {
      _this.___imeStart___ = false;

      _this.onTextAreaInput(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusLine", function (setFocusFlag) {
      setTimeout(function () {
        var value = _this.state.fullValue;
        var valueLen = value.length;
        var selectionStart = _this.textAreaAnchor.selectionStart;
        var focusLine = _this.state.focusLine;
        var sumLen = 0;
        var newFocusLine = 0;

        for (var i = 0; i < valueLen; i++) {
          if (sumLen <= selectionStart) {
            newFocusLine = i;
            sumLen += value[i].length + 1; // 换行符的长度
          } else {
            break;
          }
        }

        if (focusLine !== newFocusLine || setFocusFlag) {
          _this.setState({
            hasFocus: true,
            focusLine: newFocusLine
          });
        }
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_this), "dispatchOnChange", function (value, index, errorMessageArrayObj, needChange) {
      if (needChange === void 0) {
        needChange = true;
      }

      _this.setState({
        fullValue: value
      });

      if (errorMessageArrayObj) {
        _this.setState({
          errorArrayObj: errorMessageArrayObj
        });
      } else {
        errorMessageArrayObj = _this.handleErrorMessage(value, index);
      }

      if (needChange) {
        _this.props.onChange({
          value: value,
          errorMessageArrayObj: errorMessageArrayObj
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleErrorMessage", function (newValue, newIndex, showError) {
      if (showError === void 0) {
        showError = true;
      }

      var _this$props2 = _this.props,
          value = _this$props2.value,
          validate = _this$props2.validate;
      var _this$state2 = _this.state,
          errorMessageObj = _this$state2.errorMessageObj,
          commonValidate = _this$state2.commonValidate;
      var realValue = newValue || value;
      var newErrorMessageObj = {};

      if (newIndex != null) {
        // 只有单个删除时，才会有newIndex
        newErrorMessageObj = _extends({}, errorMessageObj);
        var valueLen = realValue.length + 1; // 一定要 + 1，否则最后一行有错误时会一直新增

        for (var i = newIndex; i < valueLen; i++) {
          newErrorMessageObj[i] = newErrorMessageObj[i + 1];
        }
      } else {
        newErrorMessageObj = (0, _textLineTools.getErrorMessage)(realValue, [validate, commonValidate]);
      }

      var params = _extends({}, _this.props, {
        errorMessage: newErrorMessageObj,
        value: realValue
      });

      var _handleErrorMessageAr = (0, _textLineTools.handleErrorMessageArray)(params),
          newErrorMessageArrayObj = _handleErrorMessageAr.errorMessageArrayObj,
          errorIndexArray = _handleErrorMessageAr.errorIndexArray,
          afterErrorMessageObj = _handleErrorMessageAr.errorMessageObj;

      var errorMessageArrayObj = showError ? newErrorMessageArrayObj : {};

      _this.setState({
        errorMessageObj: afterErrorMessageObj,
        errorIndexArray: errorIndexArray,
        errorArrayObj: errorMessageArrayObj
      });

      return errorMessageArrayObj;
    });

    _defineProperty(_assertThisInitialized(_this), "addAnchor", function (key, el) {
      _this[key] = el;
    });

    _this.state = {
      fullValue: args.value,
      // 中文ime 输入中时，需要此字段存储全部 value 值，中文输入状态不需要dispatch 到外部，但内部需要展示
      hasFocus: false,
      // 是否得到焦点
      hoverLine: null,
      // 鼠标悬浮所在的层
      focusLine: null,
      // 焦点所在的层
      errorMessageObj: {},
      // 错误信息 {0: '搜索词长度不能超过40字符', 2: '搜索词长度不能超过40字符'}
      errorIndexArray: [],
      // 存储错误信息的顺序，避免点击错误信息后乱序 [搜索词长度不能超过40字符', '不能为空']
      errorArrayObj: [],
      // 合并 props 的errorMessageArrayObj和backendErrorMessageObj，格式为{'搜索词长度不能超过40字符': [1, 2, 3]}
      commonValidate: (0, _textLineTools.commonValidate)(args)
    };
    return _this;
  }

  var _proto = TextLine.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.handleErrorMessage(null, null, false);
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var fullValue = this.state.fullValue;
    var value = nextProps.value,
        title = nextProps.title,
        maxLen = nextProps.maxLen,
        maxLenErrorMessage = nextProps.maxLenErrorMessage,
        errorMessageArrayObj = nextProps.errorMessageArrayObj,
        backendErrorMessageObj = nextProps.backendErrorMessageObj;
    var _this$props3 = this.props,
        beforeTitle = _this$props3.title,
        beforeMaxLen = _this$props3.maxLen,
        beforeMaxLenErrorMessage = _this$props3.maxLenErrorMessage,
        beforeErrorMessageArrayObj = _this$props3.errorMessageArrayObj,
        beforeBackendErrorMessageObj = _this$props3.backendErrorMessageObj; // 保存时删除空行

    if (value.length !== fullValue.length || _lodash["default"].difference(fullValue, value).length || _lodash["default"].difference(value, fullValue).length) {
      this.setState({
        fullValue: value
      }); // this.dispatchOnChange(value, null, null, false);
    }

    if (title !== beforeTitle || maxLen !== beforeMaxLen || maxLenErrorMessage !== beforeMaxLenErrorMessage) {
      this.setState({
        commonValidate: (0, _textLineTools.commonValidate)(nextProps)
      });
    }

    if (!_lodash["default"].isEqual(errorMessageArrayObj, beforeErrorMessageArrayObj) || !_lodash["default"].isEqual(backendErrorMessageObj, beforeBackendErrorMessageObj)) {
      this.setErrorState(errorMessageArrayObj, backendErrorMessageObj, value);
    }
  };

  _proto.setErrorState = function setErrorState(errorMessageArrayObj, backendErrorMessageObj, value) {
    var errorMessageObj = {};
    var errorIndexObj = {};

    var errorArrayObj = _extends({}, errorMessageArrayObj);

    Object.keys(errorMessageArrayObj).forEach(function (error) {
      var indexArray = errorMessageArrayObj[error];

      if (Array.isArray(indexArray)) {
        indexArray.forEach(function (index) {
          errorMessageObj[index] = error;
        });
      }

      errorIndexObj[error] = true;
    });
    (0, _textLineTools.handleBackendError)(backendErrorMessageObj, value, errorMessageObj, errorIndexObj, errorArrayObj);
    this.setState({
      errorMessageObj: errorMessageObj,
      errorIndexArray: Object.keys(errorIndexObj).sort(),
      errorArrayObj: errorArrayObj
    });
  };

  _proto.render = function render() {
    var _classNames,
        _classNames2,
        _classNames3,
        _this2 = this;

    var props = this.props;
    var prefixCls = props.prefixCls,
        title = props.title,
        minLine = props.minLine,
        maxLine = props.maxLine,
        showAllDel = props.showAllDel,
        placeholder = props.placeholder,
        TitleRender = props.TitleRender,
        operationRender = props.operationRender,
        maxLen = props.maxLen,
        style = props.style,
        width = props.width,
        height = props.height,
        lineBreak = props.lineBreak,
        handleErrorMessage = props.handleErrorMessage,
        showHandleError = props.showHandleError,
        inputDisabled = props.inputDisabled;
    var realWidth = width || style.width;
    var realHeight = height || style.height;
    var _this$state3 = this.state,
        errorMessageObj = _this$state3.errorMessageObj,
        hasFocus = _this$state3.hasFocus,
        focusLine = _this$state3.focusLine,
        hoverLine = _this$state3.hoverLine,
        fullValue = _this$state3.fullValue,
        errorIndexArray = _this$state3.errorIndexArray,
        errorArrayObj = _this$state3.errorArrayObj; // 不能直接使用errorIndexArray因为初次会显示错误信息（不能为空）;

    var isShowError = !!Object.keys(errorArrayObj).length;
    var containerProps = {
      className: prefixCls
    };
    var mainClass = prefixCls + "-main";
    var mainProps = {
      className: mainClass,
      style: _extends({}, style, {
        width: realWidth,
        height: realHeight
      })
    }; // main -- title

    var mainTitle = mainClass + "-title";
    var titleProps = {
      className: mainTitle
    };
    var totalLine = fullValue.length;
    var realTotalLine = (0, _commonTools.getNoEmptyArrayLength)(fullValue);
    var titleCountProps = {
      className: (0, _classnames["default"])((_classNames = {}, _classNames[mainTitle + "-count"] = 1, _classNames[prefixCls + "-pure-error"] = maxLine != null && realTotalLine > maxLine || minLine != null && realTotalLine < minLine && realTotalLine, _classNames))
    };
    var opearteProps = {
      className: mainTitle + "-operate-area"
    };
    var delAllProps = {
      onClick: this.onDelAll
    }; // main -- content

    var mainContent = mainClass + "-content";
    var mainContentClass = (0, _classnames["default"])(mainContent, (_classNames2 = {}, _classNames2[mainContent + "-error"] = isShowError, _classNames2));
    var contentProps = {
      className: mainContentClass,
      ref: _lodash["default"].partial(this.addAnchor, 'contentAnchor'),
      style: {
        height: realHeight - 47
      }
    };
    var mainContentTable = mainContent + "-table";
    var tableProps = {
      className: mainContentTable,
      onMouseLeave: _lodash["default"].partial(this.onStateChange, {
        hoverLine: null
      }),
      onMouseMove: this.onMouseMove
    };
    var textLineNoList = mainContentTable + "-no-list";
    var textLineContent = mainContentTable + "-content";

    var onFocus = _lodash["default"].partial(this.handleFocusLine, true);

    var textAreaProps = {
      style: {
        width: realWidth - 90
      },
      disabled: inputDisabled,
      value: fullValue.join(lineBreak),
      ref: _lodash["default"].partial(this.addAnchor, 'textAreaAnchor'),
      placeholder: placeholder,
      className: mainContent + "-text-area",
      onInput: this.onTextAreaInput,
      onChange: _lodash["default"].noop,
      onCompositionStart: this.onTextAreaCompositionStart,
      onCompositionEnd: this.onTextAreaCompositionEnd,
      onFocus: onFocus,
      onBlur: this.onTextAreaBlur,
      onClick: onFocus,
      onKeyDown: this.onTextAreaKeyDown,
      spellCheck: false // 禁用拼写检查

    }; // error

    var errorClass = prefixCls + "-error";
    var errorProps = {
      className: (0, _classnames["default"])((_classNames3 = {}, _classNames3[errorClass] = isShowError, _classNames3))
    };
    return _react["default"].createElement("div", containerProps, _react["default"].createElement("div", mainProps, _react["default"].createElement("div", titleProps, TitleRender ? (0, _commonTools.showRender)(TitleRender) : _react["default"].createElement("span", null, title), maxLine != null ? _react["default"].createElement("span", titleCountProps, "(", (0, _commonTools.handleCountTips)(totalLine, maxLine), ")") : null, _react["default"].createElement("span", opearteProps, showAllDel ? _react["default"].createElement("span", delAllProps, "\u5220\u9664\u5168\u90E8") : null)), _react["default"].createElement("div", contentProps, _react["default"].createElement("table", tableProps, _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
      className: textLineNoList
    }, fullValue.map(function (currentValue, index) {
      var _classNames4, _classNames5;

      var showError = errorMessageObj[index];
      var textLineNo = textLineNoList + "-no";
      var lineNumberProps = {
        key: textLineNoList + "-" + index,
        className: (0, _classnames["default"])(textLineNo, (_classNames4 = {}, _classNames4[prefixCls + "-pure-error"] = showError, _classNames4))
      };
      var no = 'textline-real-no';
      var noContainerClass = (0, _classnames["default"])(no, (_classNames5 = {}, _classNames5[no + "-error"] = showError, _classNames5));
      return _react["default"].createElement("div", lineNumberProps, _react["default"].createElement("div", {
        className: noContainerClass
      }, index + 1));
    })), _react["default"].createElement("td", {
      className: textLineContent
    }, _react["default"].createElement("div", {
      className: textLineContent + "-container"
    }, fullValue.map(function (currentValue, index) {
      var _classNames6, _classNames7;

      var isHoverLine = hoverLine === index;
      var isFoucusLine = focusLine === index;
      var showFocus = hasFocus && isFoucusLine;
      var textLineContentOpt = textLineContent + "-opt";
      var errorMessage = errorMessageObj[index];
      var currentValueLen = (0, _commonTools.getRealLength)(props, currentValue);
      var lineAnchor = "lineAnchor" + index; // text 操作行

      var lineOptContainerProps = {
        className: (0, _classnames["default"])((_classNames6 = {}, _classNames6[textLineContentOpt] = 1, _classNames6[textLineContentOpt + "-active"] = isHoverLine || showFocus, _classNames6)),
        onMouseEnter: _lodash["default"].partial(_this2.onStateChange, {
          hoverLine: index
        }),
        ref: _lodash["default"].partial(_this2.addAnchor, lineAnchor),
        key: textLineContentOpt + "-" + index
      };
      var textCountClassName = {
        className: (0, _classnames["default"])((_classNames7 = {
          'textline-text-count': 1
        }, _classNames7[prefixCls + "-pure-error"] = currentValueLen > maxLen, _classNames7))
      };
      var delSingleProps = {
        className: (0, _classnames["default"])({
          'textline-del-single': 1,
          'new-fc-one-icon': 1,
          'new-fc-one-icon-close': 1
        }),
        onClick: _lodash["default"].partial(_this2.onDelSingle, index)
      };
      var hoverRender = isHoverLine ? operationRender || _react["default"].createElement("div", delSingleProps) : null;
      var errorLink = {
        className: prefixCls + "-error-link",
        onClick: handleErrorMessage(currentValue, index)
      };
      return _react["default"].createElement("div", lineOptContainerProps, showFocus ? _react["default"].createElement("span", textCountClassName, (0, _commonTools.handleCountTips)(currentValueLen, maxLen)) : hoverRender, hasFocus && errorMessage && isFoucusLine ? _react["default"].createElement("div", {
        className: "textline-error-message"
      }, errorMessage, showHandleError ? _react["default"].createElement("span", errorLink, "\u4F18\u5316\u64CD\u4F5C") : null) : null);
    })), _react["default"].createElement("textarea", textAreaProps))))))), _react["default"].createElement("div", errorProps, errorIndexArray.map(function (error, index) {
      var errorArray = errorArrayObj[error];

      if (!errorArray) {
        return null;
      }

      var len;

      if (Array.isArray(errorArray)) {
        len = errorArray.length;
        errorArray = (0, _commonTools.sortArraySequence)(errorArray);
      }

      var delProps = {
        className: errorClass + "-link",
        onClick: _lodash["default"].partial(_this2.onDelErrorValues, errorArray)
      };
      var viewProps = {
        className: errorClass + "-link",
        onClick: _lodash["default"].partial(_this2.onStickErrorValues, errorArray)
      };
      var key = "textline-error-" + index;
      return len ? _react["default"].createElement("div", {
        key: key
      }, error, "\uFF0C\u5171", len, "\u4E2A", _react["default"].createElement("span", viewProps, "\u67E5\u770B"), _react["default"].createElement("span", delProps, "\u5220\u9664")) : _react["default"].createElement("div", {
        key: key
      }, error);
    })));
  };

  return TextLine;
}(_react.PureComponent);

exports["default"] = TextLine;

_defineProperty(TextLine, "propTypes", {
  /** 下限，最少要输入多少行 */
  minLine: _propTypes["default"].number,

  /** 上限，最多能输入多少行 */
  maxLine: _propTypes["default"].number,

  /** 每一行的最大长度 */
  maxLen: _propTypes["default"].number,

  /** 错误信息最大长度 */
  maxLenErrorMessage: _propTypes["default"].string,

  /** 表头名称 */
  title: _propTypes["default"].string,

  /** 定制表头 */
  TitleRender: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),

  /** 定制操作符 */
  operationRender: _propTypes["default"].node,

  /** 是否展示全部删除 */
  showAllDel: _propTypes["default"].bool,

  /** 是否优化操作，不建议添加 */
  showHandleError: _propTypes["default"].bool,

  /** 默认显示文字 */
  placeholder: _propTypes["default"].string,

  /** textline的值 */
  value: _propTypes["default"].array,

  /** 换行符，一次只支持一个 */
  lineBreak: _propTypes["default"].string,

  /** 支持宽高，是指的包含 title 和实际输入框的宽高，不包含错误信息的高度 */
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  style: _propTypes["default"].object,
  isRequired: _propTypes["default"].bool,

  /** 是否需要展示重复，默认不展示重复 */
  isUnique: _propTypes["default"].bool,
  uniqueErrorMessage: _propTypes["default"].string,
  requiredErrorMessage: _propTypes["default"].string,
  minLineErrorMessage: _propTypes["default"].string,
  maxLineErrorMessage: _propTypes["default"].string,
  errorMessageArrayObj: _propTypes["default"].object,

  /** 后端传过来的错误信息，组件不会自动清空或者处理，只会展示 */
  backendErrorMessageObj: _propTypes["default"].object,

  /** 单行错误校验方法 */
  validate: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,

  /** 优化操作的方法 */
  handleErrorMessage: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  countMode: _propTypes["default"].string,
  // 计数方式，cn\en，当为cn时，一个汉字记为两个字符，当为en时，一个汉字记为两个字符。默认为cn
  getLength: _propTypes["default"].func,
  // 自定义计数方式
  inputDisabled: _propTypes["default"].bool
});

_defineProperty(TextLine, "defaultProps", {
  maxLine: null,
  minLine: null,
  maxLen: null,
  maxLenErrorMessage: '',
  title: '',
  TitleRender: null,
  operationRender: null,
  showAllDel: true,
  showHandleError: false,
  placeholder: '',
  value: [],
  lineBreak: '\n',
  width: null,
  height: null,
  style: {
    height: 245,
    width: 550
  },
  isRequired: true,
  isUnique: false,
  // 判断去重有问题，暂时不支持，因为【查看是会将错误的行都放在最前面，但是重复又是从第二个重复的行来出的，这块相悖】
  uniqueErrorMessage: '',
  requiredErrorMessage: '',
  minLineErrorMessage: '',
  maxLineErrorMessage: '',
  errorMessageArrayObj: {},
  // {'搜索词长度不能超过40字符': [1, 2, 3]}
  backendErrorMessageObj: {},
  // {'关键词1value': '搜索词长度不能超过40字符'}
  onChange: _lodash["default"].noop,
  onBlur: _lodash["default"].noop,
  validate: _lodash["default"].noop,
  handleErrorMessage: _lodash["default"].noop,
  prefixCls: 'new-fc-one-textline',
  countMode: _commonTools.CHINA_COUNT_MODE,
  getLength: null,
  inputDisabled: false
});

module.exports = exports.default;