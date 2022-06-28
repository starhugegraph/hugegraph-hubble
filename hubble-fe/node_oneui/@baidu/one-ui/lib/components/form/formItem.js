"use strict";

exports.__esModule = true;
exports["default"] = exports.FIELD_DATA_PROP = exports.FIELD_META_PROP = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _grid = _interopRequireDefault(require("../grid"));

var _commonTools = require("../../core/commonTools");

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Row = _grid["default"].Row,
    Col = _grid["default"].Col;
var FIELD_META_PROP = 'data-__meta';
exports.FIELD_META_PROP = FIELD_META_PROP;
var FIELD_DATA_PROP = 'data-__field';
exports.FIELD_DATA_PROP = FIELD_DATA_PROP;

var FormItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FormItem, _PureComponent);

  function FormItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "helpShow", false);

    _defineProperty(_assertThisInitialized(_this), "getHelpMessage", function () {
      var help = _this.props.help;

      if (help === undefined && _this.getOnlyControl()) {
        var errors = _this.getField().errors;

        if (errors) {
          return (0, _commonTools.intersperseSpace)(errors.map(function (e, index) {
            var node = null;

            if (_react["default"].isValidElement(e)) {
              node = e;
            } else if (_react["default"].isValidElement(e.message)) {
              node = e.message;
            }

            return node ? _react["default"].cloneElement(node, {
              key: index
            }) : e.message;
          }));
        }

        return '';
      }

      return help;
    });

    _defineProperty(_assertThisInitialized(_this), "getControls", function (children, recursively) {
      var controls = [];

      var childrenArray = _react["default"].Children.toArray(children);

      for (var i = 0; i < childrenArray.length; i++) {
        if (!recursively && controls.length > 0) {
          break;
        }

        var child = childrenArray[i];

        if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
          continue;
        }

        if (!child.props) {
          continue;
        }

        if (FIELD_META_PROP in child.props) {
          controls.push(child);
        } else if (child.props.children) {
          controls = controls.concat(_this.getControls(child.props.children, recursively));
        }
      }

      return controls;
    });

    _defineProperty(_assertThisInitialized(_this), "getOnlyControl", function () {
      var child = _this.getControls(_this.props.children, false)[0];

      return child !== undefined ? child : null;
    });

    _defineProperty(_assertThisInitialized(_this), "getChildProp", function (prop) {
      var child = _this.getOnlyControl();

      return child && child.props && child.props[prop];
    });

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.getChildProp('id');
    });

    _defineProperty(_assertThisInitialized(_this), "getMeta", function () {
      return _this.getChildProp(FIELD_META_PROP);
    });

    _defineProperty(_assertThisInitialized(_this), "getField", function () {
      return _this.getChildProp(FIELD_DATA_PROP);
    });

    _defineProperty(_assertThisInitialized(_this), "onHelpAnimEnd", function (key, helpShow) {
      _this.helpShow = helpShow;

      if (!helpShow) {
        _this.setState({});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderHelp", function (prefixCls) {
      var help = _this.getHelpMessage();

      var children = help ? _react["default"].createElement("div", {
        className: prefixCls + "-explain",
        key: "help"
      }, help) : null;

      if (children) {
        _this.helpShow = !!children;
      }

      return _react["default"].createElement(_rcAnimate["default"], {
        transitionName: "show-help",
        component: "",
        transitionAppear: true,
        key: "help",
        onEnd: _this.onHelpAnimEnd
      }, children);
    });

    _defineProperty(_assertThisInitialized(_this), "renderExtra", function (prefixCls) {
      var extra = _this.props.extra;
      return extra ? _react["default"].createElement("div", {
        className: prefixCls + "-extra"
      }, extra) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderValidateWrapper", function (prefixCls, c1, c2, c3) {
      var props = _this.props;
      var hasFeedback = props.hasFeedback;
      var onlyControl = _this.getOnlyControl;
      var validateStatus = props.validateStatus === undefined && onlyControl ? _this.getValidateStatus() : props.validateStatus;
      var classes = prefixCls + "-item-control";

      if (validateStatus) {
        var _classNames;

        classes = (0, _classnames["default"])(prefixCls + "-item-control", (_classNames = {}, _classNames[prefixCls + "-has-feedback"] = hasFeedback || validateStatus === 'validating', _classNames[prefixCls + "-has-success"] = validateStatus === 'success', _classNames[prefixCls + "-has-warning"] = validateStatus === 'warning', _classNames[prefixCls + "-has-error"] = validateStatus === 'error', _classNames[prefixCls + "-is-validating"] = validateStatus === 'validating', _classNames));
      } // let iconType = '';
      // switch (validateStatus) {
      //     case 'success':
      //         iconType = 'success';
      //         break;
      //     case 'warning':
      //         iconType = 'warning';
      //         break;
      //     case 'error':
      //         iconType = 'fail';
      //         break;
      //     case 'validating':
      //         iconType = 'loading';
      //         break;
      //     default:
      //         iconType = '';
      //         break;
      // }
      // const icon = hasFeedback && iconType ? (
      //     <span className={`${prefixCls}-item-children-icon`}>
      //         <Icon type={iconType} theme={iconType === 'loading' ? 'outlined' : 'filled'} />
      //     </span>
      // ) : null;


      return _react["default"].createElement("div", {
        className: classes
      }, _react["default"].createElement("span", {
        className: prefixCls + "-item-children"
      }, c1), c2, c3);
    });

    _defineProperty(_assertThisInitialized(_this), "renderWrapper", function (prefixCls, children) {
      return _react["default"].createElement(_context.FormContext.Consumer, {
        key: "wrapper"
      }, function (_ref) {
        var contextWrapperCol = _ref.wrapperCol,
            vertical = _ref.vertical;
        var wrapperCol = _this.props.wrapperCol;
        var mergedWrapperCol = ('wrapperCol' in _this.props ? wrapperCol : contextWrapperCol) || {};
        var className = (0, _classnames["default"])(prefixCls + "-item-control-wrapper", mergedWrapperCol.className); // No pass FormContext since it's useless

        return _react["default"].createElement(_context.FormContext.Provider, {
          value: {
            vertical: vertical
          }
        }, _react["default"].createElement(Col, _extends({}, mergedWrapperCol, {
          className: className
        }), children));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isRequired", function () {
      var required = _this.props.required;

      if (required !== undefined) {
        return required;
      }

      if (_this.getOnlyControl()) {
        var meta = _this.getMeta() || {};
        var validate = meta.validate || [];
        return validate.filter(function (item) {
          return !!item.rules;
        }).some(function (item) {
          return item.rules.some(function (rule) {
            return rule.required;
          });
        });
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "onLabelClick", function () {
      var id = _this.props.id || _this.getId();

      if (!id) {
        return;
      }

      var formItemNode = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

      var control = formItemNode.querySelector("[id=\"" + id + "\"]");

      if (control && control.focus) {
        control.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderLabel", function (prefixCls) {
      return _react["default"].createElement(_context.FormContext.Consumer, {
        key: "label"
      }, function (_ref2) {
        var _classNames2;

        var vertical = _ref2.vertical,
            contextLabelAlign = _ref2.labelAlign,
            contextLabelCol = _ref2.labelCol,
            contextColon = _ref2.colon;
        var _this$props = _this.props,
            label = _this$props.label,
            labelCol = _this$props.labelCol,
            labelAlign = _this$props.labelAlign,
            colon = _this$props.colon,
            id = _this$props.id,
            htmlFor = _this$props.htmlFor;

        var required = _this.isRequired();

        var mergedLabelCol = ('labelCol' in _this.props ? labelCol : contextLabelCol) || {};
        var mergedLabelAlign = 'labelAlign' in _this.props ? labelAlign : contextLabelAlign;
        var labelClsBasic = prefixCls + "-item-label";
        var labelColClassName = (0, _classnames["default"])(labelClsBasic, mergedLabelAlign === 'left' && labelClsBasic + "-left", mergedLabelCol.className);
        var labelChildren = label; // Keep label is original where there should have no colon

        var computedColon = colon === true || contextColon !== false && colon !== false;
        var haveColon = computedColon && !vertical; // Remove duplicated user input colon

        if (haveColon && typeof label === 'string' && label.trim() !== '') {
          labelChildren = label.replace(/[：|:]\s*$/, '');
        }

        var labelClassName = (0, _classnames["default"])((_classNames2 = {}, _classNames2[prefixCls + "-item-required"] = required, _classNames2[prefixCls + "-item-no-colon"] = !computedColon, _classNames2));
        return label ? _react["default"].createElement(Col, _extends({}, mergedLabelCol, {
          className: labelColClassName
        }), _react["default"].createElement("label", {
          htmlFor: htmlFor || id || _this.getId(),
          className: labelClassName,
          title: typeof label === 'string' ? label : '',
          onClick: _this.onLabelClick
        }, labelChildren)) : null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (prefixCls) {
      var children = _this.props.children;
      return [_this.renderLabel(prefixCls), _this.renderWrapper(prefixCls, _this.renderValidateWrapper(prefixCls, children, _this.renderHelp(prefixCls), _this.renderExtra(prefixCls)))];
    });

    return _this;
  }

  var _proto = FormItem.prototype;

  _proto.getValidateStatus = function getValidateStatus() {
    var onlyControl = this.getOnlyControl();

    if (!onlyControl) {
      return '';
    }

    var field = this.getField();

    if (field.validating) {
      return 'validating';
    }

    if (field.errors) {
      return 'error';
    }

    var fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;

    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success';
    }

    return '';
  };

  _proto.render = function render() {
    var _itemClassName;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        style = _this$props2.style,
        className = _this$props2.className;
    var children = this.renderChildren(prefixCls);
    var itemClassName = (_itemClassName = {}, _itemClassName[prefixCls + "-item"] = true, _itemClassName[prefixCls + "-item-with-help"] = this.helpShow, _itemClassName["" + className] = !!className, _itemClassName);
    return _react["default"].createElement(Row, {
      className: (0, _classnames["default"])(itemClassName),
      style: style,
      key: "row"
    }, children);
  };

  return FormItem;
}(_react.PureComponent);

exports["default"] = FormItem;

_defineProperty(FormItem, "propTypes", {
  prefixCls: _propTypes["default"].string,
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  labelAlign: _propTypes["default"].string,
  labelCol: _propTypes["default"].object,
  help: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].bool]),
  validateStatus: _propTypes["default"].oneOf(['success', 'warning', 'error', 'validating', '']),
  hasFeedback: _propTypes["default"].bool,
  wrapperCol: _propTypes["default"].object,
  className: _propTypes["default"].string,
  htmlFor: _propTypes["default"].string,
  id: _propTypes["default"].string,
  children: _propTypes["default"].node,
  colon: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  extra: _propTypes["default"].node,
  required: _propTypes["default"].bool
});

_defineProperty(FormItem, "defaultProps", {
  prefixCls: 'new-fc-one-form',
  className: '',
  style: {},
  hasFeedback: false
});