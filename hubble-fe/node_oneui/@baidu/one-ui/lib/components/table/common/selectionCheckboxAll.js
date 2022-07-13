"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _dropdown = _interopRequireDefault(require("../../dropdown"));

var _menu = _interopRequireDefault(require("../../menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectionCheckboxAll =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SelectionCheckboxAll, _Component);

  function SelectionCheckboxAll(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleSelectAllChagne", function (e) {
      var checked = e.target.checked;

      _this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
    });

    _this.defaultSelections = props.hideDefaultSelections ? [] : [{
      key: 'all',
      text: props.locale.selectAll,
      onSelect: function onSelect() {}
    }, {
      key: 'invert',
      text: props.locale.selectInvert,
      onSelect: function onSelect() {}
    }];
    _this.state = {
      checked: _this.getCheckState(props),
      indeterminate: _this.getIndeterminateState(props)
    };
    return _this;
  }

  var _proto = SelectionCheckboxAll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.subscribe();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setCheckState(nextProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  _proto.getCheckState = function getCheckState(props) {
    var store = props.store,
        data = props.data;
    var checked;

    if (!data.length) {
      checked = false;
    } else {
      checked = store.getState().selectionDirty ? this.checkSelection(data, 'every', false) : this.checkSelection(data, 'every', false) || this.checkSelection(data, 'every', true);
    }

    return checked;
  };

  _proto.getIndeterminateState = function getIndeterminateState(props) {
    var store = props.store,
        data = props.data;
    var indeterminate;

    if (!data.length) {
      indeterminate = false;
    } else {
      indeterminate = store.getState().selectionDirty ? this.checkSelection(data, 'some', false) && !this.checkSelection(data, 'every', false) : this.checkSelection(data, 'some', false) && !this.checkSelection(data, 'every', false) || this.checkSelection(data, 'some', true) && !this.checkSelection(data, 'every', true);
    }

    return indeterminate;
  };

  _proto.setCheckState = function setCheckState(props) {
    var checked = this.getCheckState(props);
    var indeterminate = this.getIndeterminateState(props);

    if (checked !== this.state.checked) {
      this.setState({
        checked: checked
      });
    }

    if (indeterminate !== this.state.indeterminate) {
      this.setState({
        indeterminate: indeterminate
      });
    }
  };

  _proto.checkSelection = function checkSelection(data, type, byDefaultChecked) {
    var _this$props = this.props,
        store = _this$props.store,
        getCheckboxPropsByItem = _this$props.getCheckboxPropsByItem,
        getRecordKey = _this$props.getRecordKey; // type should be 'every' | 'some'

    if (type === 'every' || type === 'some') {
      return byDefaultChecked ? data[type](function (item, i) {
        return getCheckboxPropsByItem(item, i).defaultChecked;
      }) : data[type](function (item, i) {
        return store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0;
      });
    }

    return false;
  };

  _proto.subscribe = function subscribe() {
    var _this2 = this;

    var store = this.props.store;
    this.unsubscribe = store.subscribe(function () {
      _this2.setCheckState(_this2.props);
    });
  };

  _proto.renderMenus = function renderMenus(selections) {
    var _this3 = this;

    return selections.map(function (selection, index) {
      return _react["default"].createElement(_menu["default"].Item, {
        key: selection.key || index
      }, _react["default"].createElement("div", {
        onClick: function onClick() {
          _this3.props.onSelect(selection.key, index, selection.onSelect);
        }
      }, selection.text));
    });
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        prefixCls = _this$props2.prefixCls,
        selections = _this$props2.selections,
        getPopupContainer = _this$props2.getPopupContainer;
    var _this$state = this.state,
        checked = _this$state.checked,
        indeterminate = _this$state.indeterminate;
    var selectionPrefixCls = prefixCls + "-selection";
    var customSelections = null;

    if (selections) {
      var newSelections = Array.isArray(selections) ? this.defaultSelections.concat(selections) : this.defaultSelections;

      var menu = _react["default"].createElement(_menu["default"], {
        className: selectionPrefixCls + "-menu",
        selectedKeys: []
      }, this.renderMenus(newSelections));

      customSelections = newSelections.length > 0 ? _react["default"].createElement(_dropdown["default"], {
        overlay: menu,
        getPopupContainer: getPopupContainer
      }, _react["default"].createElement("div", {
        className: selectionPrefixCls + "-down"
      }, _react["default"].createElement(_oneUiIcon.IconChevronDown, null))) : null;
    }

    return _react["default"].createElement("div", {
      className: selectionPrefixCls
    }, _react["default"].createElement(_checkbox["default"], {
      className: (0, _classnames["default"])((_classNames = {}, _classNames[selectionPrefixCls + "-select-all-custom"] = customSelections, _classNames)),
      checked: checked,
      indeterminate: indeterminate,
      disabled: disabled,
      onChange: this.handleSelectAllChagne
    }), customSelections);
  };

  return SelectionCheckboxAll;
}(_react.Component);

exports["default"] = SelectionCheckboxAll;

_defineProperty(SelectionCheckboxAll, "propTypes", {
  store: _propTypes["default"].object,
  locale: _propTypes["default"].any,
  disabled: _propTypes["default"].bool,
  getCheckboxPropsByItem: _propTypes["default"].func,
  getRecordKey: _propTypes["default"].func,

  /* eslint-disable react/no-unused-prop-types */
  data: _propTypes["default"].array,
  prefixCls: _propTypes["default"].string,
  onSelect: _propTypes["default"].func,
  hideDefaultSelections: _propTypes["default"].bool,
  selections: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].bool]),
  getPopupContainer: _propTypes["default"].func
});

module.exports = exports.default;