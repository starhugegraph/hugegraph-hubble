function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import Grid from '../grid';
import { intersperseSpace } from '../../core/commonTools';
import { FormContext } from './context';
var Row = Grid.Row,
    Col = Grid.Col;
export var FIELD_META_PROP = 'data-__meta';
export var FIELD_DATA_PROP = 'data-__field';

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
          return intersperseSpace(errors.map(function (e, index) {
            var node = null;

            if (React.isValidElement(e)) {
              node = e;
            } else if (React.isValidElement(e.message)) {
              node = e.message;
            }

            return node ? React.cloneElement(node, {
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
      var childrenArray = React.Children.toArray(children);

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

      var children = help ? React.createElement("div", {
        className: prefixCls + "-explain",
        key: "help"
      }, help) : null;

      if (children) {
        _this.helpShow = !!children;
      }

      return React.createElement(Animate, {
        transitionName: "show-help",
        component: "",
        transitionAppear: true,
        key: "help",
        onEnd: _this.onHelpAnimEnd
      }, children);
    });

    _defineProperty(_assertThisInitialized(_this), "renderExtra", function (prefixCls) {
      var extra = _this.props.extra;
      return extra ? React.createElement("div", {
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

        classes = classNames(prefixCls + "-item-control", (_classNames = {}, _classNames[prefixCls + "-has-feedback"] = hasFeedback || validateStatus === 'validating', _classNames[prefixCls + "-has-success"] = validateStatus === 'success', _classNames[prefixCls + "-has-warning"] = validateStatus === 'warning', _classNames[prefixCls + "-has-error"] = validateStatus === 'error', _classNames[prefixCls + "-is-validating"] = validateStatus === 'validating', _classNames));
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


      return React.createElement("div", {
        className: classes
      }, React.createElement("span", {
        className: prefixCls + "-item-children"
      }, c1), c2, c3);
    });

    _defineProperty(_assertThisInitialized(_this), "renderWrapper", function (prefixCls, children) {
      return React.createElement(FormContext.Consumer, {
        key: "wrapper"
      }, function (_ref) {
        var contextWrapperCol = _ref.wrapperCol,
            vertical = _ref.vertical;
        var wrapperCol = _this.props.wrapperCol;
        var mergedWrapperCol = ('wrapperCol' in _this.props ? wrapperCol : contextWrapperCol) || {};
        var className = classNames(prefixCls + "-item-control-wrapper", mergedWrapperCol.className); // No pass FormContext since it's useless

        return React.createElement(FormContext.Provider, {
          value: {
            vertical: vertical
          }
        }, React.createElement(Col, _extends({}, mergedWrapperCol, {
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

      var formItemNode = ReactDOM.findDOMNode(_assertThisInitialized(_this));
      var control = formItemNode.querySelector("[id=\"" + id + "\"]");

      if (control && control.focus) {
        control.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderLabel", function (prefixCls) {
      return React.createElement(FormContext.Consumer, {
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
        var labelColClassName = classNames(labelClsBasic, mergedLabelAlign === 'left' && labelClsBasic + "-left", mergedLabelCol.className);
        var labelChildren = label; // Keep label is original where there should have no colon

        var computedColon = colon === true || contextColon !== false && colon !== false;
        var haveColon = computedColon && !vertical; // Remove duplicated user input colon

        if (haveColon && typeof label === 'string' && label.trim() !== '') {
          labelChildren = label.replace(/[：|:]\s*$/, '');
        }

        var labelClassName = classNames((_classNames2 = {}, _classNames2[prefixCls + "-item-required"] = required, _classNames2[prefixCls + "-item-no-colon"] = !computedColon, _classNames2));
        return label ? React.createElement(Col, _extends({}, mergedLabelCol, {
          className: labelColClassName
        }), React.createElement("label", {
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
    return React.createElement(Row, {
      className: classNames(itemClassName),
      style: style,
      key: "row"
    }, children);
  };

  return FormItem;
}(PureComponent);

_defineProperty(FormItem, "propTypes", {
  prefixCls: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelAlign: PropTypes.string,
  labelCol: PropTypes.object,
  help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  validateStatus: PropTypes.oneOf(['success', 'warning', 'error', 'validating', '']),
  hasFeedback: PropTypes.bool,
  wrapperCol: PropTypes.object,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  colon: PropTypes.bool,
  style: PropTypes.object,
  extra: PropTypes.node,
  required: PropTypes.bool
});

_defineProperty(FormItem, "defaultProps", {
  prefixCls: 'new-fc-one-form',
  className: '',
  style: {},
  hasFeedback: false
});

export { FormItem as default };