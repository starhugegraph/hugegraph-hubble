function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../checkbox';
import Radio from '../../radio';

var SelectionBox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SelectionBox, _PureComponent);

  function SelectionBox(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getCheckState", function (props) {
      var store = props.store,
          defaultSelection = props.defaultSelection,
          rowIndex = props.rowIndex;
      var checked = false;

      if (store.getState().selectionDirty) {
        checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
      } else {
        checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 || defaultSelection.indexOf(rowIndex) >= 0;
      }

      return checked;
    });

    _this.state = {
      checked: _this.getCheckState(_props)
    };
    return _this;
  }

  var _proto = SelectionBox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.subscribe();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  _proto.subscribe = function subscribe() {
    var _this2 = this;

    var store = this.props.store;
    this.unsubscribe = store.subscribe(function () {
      var checked = _this2.getCheckState(_this2.props);

      _this2.setState({
        checked: checked
      });
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        type = _this$props.type,
        rowIndex = _this$props.rowIndex,
        disabled = _this$props.disabled,
        indeterminate = _this$props.indeterminate,
        onChange = _this$props.onChange;
    var checked = this.state.checked;

    if (type === 'radio') {
      return React.createElement(Radio, {
        disabled: disabled,
        onChange: onChange,
        value: rowIndex,
        checked: checked
      });
    }

    return React.createElement(Checkbox, {
      indeterminate: indeterminate,
      checked: checked,
      disabled: disabled,
      onChange: onChange
    });
  };

  return SelectionBox;
}(PureComponent);

_defineProperty(SelectionBox, "propTypes", {
  store: PropTypes.object,
  type: PropTypes.string,

  /* eslint-disable react/no-unused-prop-types */
  defaultSelection: PropTypes.arrayOf(PropTypes.string),
  rowIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func
});

export { SelectionBox as default };