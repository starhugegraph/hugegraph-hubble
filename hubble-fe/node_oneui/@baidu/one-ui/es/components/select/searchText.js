function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var SearchText =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SearchText, _PureComponent);

  function SearchText(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "formatTextWithColor", function (text, searchValue) {
      var pivolIndex = text.indexOf(searchValue);
      var prefixCls = _this.props.prefixCls;

      if (pivolIndex < 0) {
        return React.createElement("span", null, text);
      }

      var textArray = _.flattenDeep(text.split(searchValue).map(function (node, index) {
        return index === 0 ? [React.createElement("span", {
          key: index
        }, node)] : [React.createElement("span", {
          key: index + "-highlight",
          className: prefixCls + "-search-text-highlight"
        }, searchValue), React.createElement("span", {
          key: index
        }, node)];
      }));

      var strDom = React.createElement("span", null, textArray.map(function (node) {
        return node;
      }));
      return strDom;
    });

    _this.state = {
      searchValue: props.searchValue || ''
    };
    return _this;
  }

  var _proto = SearchText.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var searchValue = nextProps.searchValue;
    var currentSearchValue = this.state.searchValue;

    if (searchValue !== currentSearchValue) {
      this.setState({
        searchValue: searchValue
      });
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        text = _this$props.text,
        showSearch = _this$props.showSearch,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled;
    var searchValue = this.state.searchValue;
    var searchTextClassName = classNames((_classNames = {}, _classNames[prefixCls + "-search-text-disabled"] = disabled, _classNames), className);

    if (!showSearch || !searchValue) {
      return React.createElement("span", {
        className: className
      }, text);
    }

    return React.createElement("span", {
      className: searchTextClassName
    }, this.formatTextWithColor(text, searchValue));
  };

  return SearchText;
}(PureComponent);

_defineProperty(SearchText, "propTypes", {
  text: PropTypes.string,
  showSearch: PropTypes.bool,
  searchValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  prefixCls: PropTypes.string
});

_defineProperty(SearchText, "defaultProps", {
  className: '',
  disabled: false,
  prefixCls: 'new-fc-one-select'
});

export { SearchText as default };