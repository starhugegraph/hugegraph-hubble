function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IconChevronDown } from '@baidu/one-ui-icon';
import Checkbox from '../../checkbox';
import Dropdown from '../../dropdown';
import Menu from '../../menu';

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
      return React.createElement(Menu.Item, {
        key: selection.key || index
      }, React.createElement("div", {
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
      var menu = React.createElement(Menu, {
        className: selectionPrefixCls + "-menu",
        selectedKeys: []
      }, this.renderMenus(newSelections));
      customSelections = newSelections.length > 0 ? React.createElement(Dropdown, {
        overlay: menu,
        getPopupContainer: getPopupContainer
      }, React.createElement("div", {
        className: selectionPrefixCls + "-down"
      }, React.createElement(IconChevronDown, null))) : null;
    }

    return React.createElement("div", {
      className: selectionPrefixCls
    }, React.createElement(Checkbox, {
      className: classNames((_classNames = {}, _classNames[selectionPrefixCls + "-select-all-custom"] = customSelections, _classNames)),
      checked: checked,
      indeterminate: indeterminate,
      disabled: disabled,
      onChange: this.handleSelectAllChagne
    }), customSelections);
  };

  return SelectionCheckboxAll;
}(Component);

_defineProperty(SelectionCheckboxAll, "propTypes", {
  store: PropTypes.object,
  locale: PropTypes.any,
  disabled: PropTypes.bool,
  getCheckboxPropsByItem: PropTypes.func,
  getRecordKey: PropTypes.func,

  /* eslint-disable react/no-unused-prop-types */
  data: PropTypes.array,
  prefixCls: PropTypes.string,
  onSelect: PropTypes.func,
  hideDefaultSelections: PropTypes.bool,
  selections: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  getPopupContainer: PropTypes.func
});

export { SelectionCheckboxAll as default };