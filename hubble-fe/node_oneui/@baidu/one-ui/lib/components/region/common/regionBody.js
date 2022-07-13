"use strict";

exports.__esModule = true;
exports["default"] = exports.formatDisabledValueKeys = exports.transNewKeyToOld = exports.formatOldKeyToNew = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _partial = _interopRequireDefault(require("lodash/partial"));

var _values = _interopRequireDefault(require("lodash/values"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _icon = _interopRequireDefault(require("../../icon"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var _regionTools = require("../../../core/regionTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatOldKeyToNew = function formatOldKeyToNew(selectedValue, isNewRegionKeyMode) {
  if (isNewRegionKeyMode && selectedValue) {
    return selectedValue.map(function (value) {
      return (0, _regionTools.transOldKeyToNewRegionKey)(value);
    });
  }

  return selectedValue;
};

exports.formatOldKeyToNew = formatOldKeyToNew;

var transNewKeyToOld = function transNewKeyToOld(selectedValue, isNewRegionKeyMode) {
  if (isNewRegionKeyMode && selectedValue) {
    return selectedValue.map(function (value) {
      return (0, _regionTools.transNewKeyToOldRegionKey)(value);
    });
  }

  return selectedValue;
};

exports.transNewKeyToOld = transNewKeyToOld;

var formatDisabledValueKeys = function formatDisabledValueKeys(disabledValue, isNewRegionKeyMode) {
  return isNewRegionKeyMode ? transNewKeyToOld(disabledValue, isNewRegionKeyMode) : disabledValue;
};

exports.formatDisabledValueKeys = formatDisabledValueKeys;

var RegionBody =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RegionBody, _PureComponent);

  function RegionBody(props) {
    var _openValue;

    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChangCheckbox", function (option, e) {
      var _currentCheckedMap, _currentIndeterminate;

      var value = option.value;
      var checked = e.target.checked;
      var _this$state = _this.state,
          checkedMap = _this$state.checkedMap,
          indeterminateMap = _this$state.indeterminateMap;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          showDistrict = _this$props.showDistrict,
          disabledValue = _this$props.disabledValue,
          customRegion = _this$props.customRegion,
          isNewRegionKeyMode = _this$props.isNewRegionKeyMode,
          exceptionValues = _this$props.exceptionValues;
      var currentCheckedMap = (_currentCheckedMap = {}, _currentCheckedMap[value] = checked, _currentCheckedMap);
      var currentIndeterminateMap = (_currentIndeterminate = {}, _currentIndeterminate[value] = false, _currentIndeterminate);
      var disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
      (0, _regionTools.renderChildrenCheckMap)(value, currentCheckedMap, checked, currentIndeterminateMap, showDistrict, disabledValueKeys, customRegion);
      var newState = {};

      var newCheckedMap = _extends({}, checkedMap, currentCheckedMap);

      (0, _regionTools.renderParentMap)(value, newCheckedMap, currentIndeterminateMap, disabledValueKeys, customRegion);
      newState.checkedMap = newCheckedMap;
      newState.indeterminateMap = _extends({}, indeterminateMap, currentIndeterminateMap);

      if (!('selectedValue' in _this.props)) {
        _this.setState(newState);
      }

      if (onChange) {
        var selectedValue = (0, _regionTools.formatCheckedArray)(newCheckedMap, exceptionValues);
        onChange({
          target: {
            value: value,
            checked: checked
          },
          selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickRegionItem", function (option, e) {
      var _newValue;

      var disabled = e.target.dataset.disabled;
      var showDistrict = _this.props.showDistrict;
      var regionFiliation = _this.regionFiliation;
      var level = option.level,
          value = option.value;
      var _this$state2 = _this.state,
          openValue = _this$state2.openValue,
          openLevel = _this$state2.openLevel;
      var canClick = option.canClick;

      if (!canClick) {
        var _extends2;

        _this.setState({
          openValue: _extends({}, openValue, (_extends2 = {}, _extends2[level] = value, _extends2)),
          openLevel: option.level
        });

        return;
      }

      if (disabled && +disabled === 1) {
        return;
      }

      var newValue = value;
      var newLevel = openLevel;
      newValue = (_newValue = {}, _newValue[level] = value, _newValue);

      if (level !== _regionTools.levelMap.district && regionFiliation[value] && regionFiliation[value].length) {
        // 不等于区层级
        newLevel = level + 1;
      }

      if (showDistrict && _this.directCityCode.indexOf(value) > -1) {
        // 直辖市的话，直接展示区
        newLevel = _regionTools.levelMap.district;
        newValue[_regionTools.levelMap.city] = value;
      }

      _this.setState({
        openLevel: newLevel,
        openValue: _extends({}, openValue, newValue)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSearchItem", function (e) {
      var _this$props2 = _this.props,
          onClickSearchItem = _this$props2.onClickSearchItem,
          onChange = _this$props2.onChange,
          disabledValue = _this$props2.disabledValue,
          showDistrict = _this$props2.showDistrict,
          customRegion = _this$props2.customRegion,
          isNewRegionKeyMode = _this$props2.isNewRegionKeyMode,
          exceptionValues = _this$props2.exceptionValues;
      var index = e.target.dataset.index;
      var _this$state3 = _this.state,
          searchOptions = _this$state3.searchOptions,
          checkedMap = _this$state3.checkedMap,
          indeterminateMap = _this$state3.indeterminateMap;
      var option = searchOptions[+index] || {};
      var value = option.value || [];
      var key = value[0];

      if (onClickSearchItem) {
        onClickSearchItem(e);
      }

      if (key) {
        var _extends3, _extends4;

        var checked = true;
        var newState = {};

        var newIndeterminateMap = _extends((_extends3 = {}, _extends3[key] = false, _extends3), indeterminateMap);

        var newCheckedMap = _extends({}, checkedMap, (_extends4 = {}, _extends4[key] = checked, _extends4));

        var disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
        (0, _regionTools.renderChildrenCheckMap)(key, newCheckedMap, checked, newIndeterminateMap, showDistrict, disabledValueKeys, customRegion);
        (0, _regionTools.renderParentMap)(key, newCheckedMap, newIndeterminateMap, disabledValueKeys, customRegion);
        var openValue = {};
        var openLevel = value.length;
        value.forEach(function (currentKey, index) {
          var currentIndex = value.length - index;

          if (currentIndex) {
            openValue[currentIndex] = +currentKey;
          }
        });

        if (_this.directCityCode.indexOf(openValue[_regionTools.levelMap.province]) > -1) {
          // 直辖市
          openValue[_regionTools.levelMap.district] = openValue[_regionTools.levelMap.city];
          openValue[_regionTools.levelMap.city] = openValue[_regionTools.levelMap.province];

          if (showDistrict) {
            openLevel = _regionTools.levelMap.district;
          }
        }

        newState.openValue = openValue;
        newState.openLevel = openLevel;

        if (!('selectedValue' in _this.props)) {
          newState.checkedMap = newCheckedMap;
          newState.indeterminateMap = newIndeterminateMap;
        }

        if (onChange) {
          var selectedValue = (0, _regionTools.formatCheckedArray)(newCheckedMap, exceptionValues);
          onChange({
            target: {
              value: value,
              checked: checked
            },
            selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
          });
        }

        _this.setState(newState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderArrow", function (option, level) {
      var showDistrict = _this.props.showDistrict;
      var regionFiliation = _this.regionFiliation;
      var showArrow = false;

      if ((showDistrict || !showDistrict && level !== _regionTools.levelMap.city) && regionFiliation[option.value] && regionFiliation[option.value].length) {
        showArrow = true;
      }

      if (!showDistrict && _this.directCityCode.indexOf(option.value) > -1) {
        // 不展示区，并且直辖市的话，就应该只有一层
        showArrow = false;
      }

      return showArrow;
    });

    _defineProperty(_assertThisInitialized(_this), "renderCheckbox", function (option) {
      var value = option.value;
      var _this$state4 = _this.state,
          checkedMap = _this$state4.checkedMap,
          indeterminateMap = _this$state4.indeterminateMap;
      var disabledValue = Object.keys(_this.props.disabledValue);
      var checked = checkedMap[value];
      var indeterminate = indeterminateMap[value];
      var checkboxProps = {
        checked: checked,
        indeterminate: indeterminate,
        onChange: (0, _partial["default"])(_this.onChangCheckbox, option),
        prefixCls: _this.props.checkboxPrefixCls
      };

      if (disabledValue.indexOf("" + value) > -1) {
        checkboxProps.disabled = true;
      }

      return _react["default"].createElement(_checkbox["default"], checkboxProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCheckboxList", function (options, level) {
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          disabledValue = _this$props3.disabledValue,
          exceptionValues = _this$props3.exceptionValues;
      var disabledKeys = Object.keys(disabledValue);
      var openValue = _this.state.openValue;
      var currentOpenValue = openValue[level];
      return _react["default"].createElement("div", {
        className: prefixCls + "-checkbox-list"
      }, options.map(function (option) {
        var _classnames;

        if (exceptionValues.indexOf(+option.value) > -1) {
          return;
        }

        var selected = false;

        if (+currentOpenValue === option.value) {
          selected = true;
        }

        var disabled = disabledKeys.indexOf("" + option.value) > -1;
        var itemCls = (0, _classnames2["default"])(prefixCls + "-checkbox-list-item", (_classnames = {}, _classnames[prefixCls + "-checkbox-list-item-selected"] = selected, _classnames[prefixCls + "-checkbox-list-item-disabled"] = disabled, _classnames[prefixCls + "-checkbox-list-item-normal"] = !disabled, _classnames));

        var showArrow = _this.renderArrow(option, level);

        option.canClick = showArrow;

        var renderItem = _react["default"].createElement("span", null, _this.renderCheckbox(option), _react["default"].createElement("span", {
          className: prefixCls + "-checkbox-list-item-text",
          "data-disabled": disabled ? 1 : 0
        }, option.label));

        return _react["default"].createElement("div", {
          className: itemCls,
          key: option.value,
          "data-disabled": disabled ? 1 : 0,
          onClick: (0, _partial["default"])(_this.onClickRegionItem, _extends({}, option, {
            level: level
          })),
          "data-value": option.value
        }, disabled && disabledValue[option.value] ? _react["default"].createElement(_tooltip["default"], {
          title: disabledValue[option.value],
          key: option.value,
          placement: "topLeft"
        }, renderItem) : renderItem, showArrow ? _react["default"].createElement(_icon["default"], {
          "data-disabled": disabled ? 1 : 0,
          type: "angle-right"
        }) : null);
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckAllChange", function (e) {
      var checked = e.target.checked;
      var _this$props4 = _this.props,
          onChangeCheckAll = _this$props4.onChangeCheckAll,
          isNewRegionKeyMode = _this$props4.isNewRegionKeyMode,
          exceptionValues = _this$props4.exceptionValues,
          showDistrict = _this$props4.showDistrict,
          disabledValue = _this$props4.disabledValue;
      var disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue || []), isNewRegionKeyMode);

      var _formatCheckAllMap = (0, _regionTools.formatCheckAllMap)(checked, showDistrict, disabledValueKeys, exceptionValues),
          checkedMap = _formatCheckAllMap.checkedMap,
          indeterminateMap = _formatCheckAllMap.indeterminateMap;

      if (!('selectedValue' in _this.props)) {
        _this.setState({
          checkedMap: checkedMap,
          indeterminateMap: indeterminateMap
        });
      }

      if (onChangeCheckAll) {
        var selectedValue = (0, _regionTools.formatCheckedArray)(checkedMap, exceptionValues);
        onChangeCheckAll({
          selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderShowCheckAll", function () {
      var _this$props5 = _this.props,
          prefixCls = _this$props5.prefixCls,
          exceptionValues = _this$props5.exceptionValues,
          isNewRegionKeyMode = _this$props5.isNewRegionKeyMode,
          showDistrict = _this$props5.showDistrict,
          disabledValue = _this$props5.disabledValue;
      var selectedValue = _this.props.selectedValue;
      selectedValue = transNewKeyToOld(selectedValue, isNewRegionKeyMode);
      var disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue || []), isNewRegionKeyMode);

      var _getCheckAllStatus = (0, _regionTools.getCheckAllStatus)(selectedValue, showDistrict, disabledValueKeys, exceptionValues),
          checked = _getCheckAllStatus.checked,
          indeterminate = _getCheckAllStatus.indeterminate;

      var showCheckAllProps = {
        checked: checked,
        indeterminate: indeterminate,
        onChange: _this.onCheckAllChange,
        prefixCls: _this.props.checkboxPrefixCls
      };
      return _react["default"].createElement("div", {
        className: prefixCls + "-country-item"
      }, _react["default"].createElement("div", {
        className: prefixCls + "-country-checkbox"
      }, _react["default"].createElement(_checkbox["default"], showCheckAllProps), _react["default"].createElement("span", null, "\u5168\u90E8")));
    });

    _defineProperty(_assertThisInitialized(_this), "renderCountryAndProvince", function () {
      var firstOptions = _this.firstOptions;
      var prefixCls = _this.props.prefixCls;
      var countryCls = (0, _classnames2["default"])(prefixCls + "-level", prefixCls + "-country");
      var showCheckAll = _this.props.showCheckAll;
      return _react["default"].createElement("div", {
        className: countryCls
      }, showCheckAll && firstOptions.length ? _this.renderShowCheckAll() : null, firstOptions.map(function (option) {
        return _react["default"].createElement("div", {
          className: prefixCls + "-country-item",
          key: option.value
        }, _react["default"].createElement("div", {
          className: prefixCls + "-country-checkbox"
        }, _this.renderCheckbox(option), _react["default"].createElement("span", null, option.label)), _this.renderCheckboxList(option.children, _regionTools.levelMap.province));
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderOtherLevel", function (level) {
      var _this$props6 = _this.props,
          prefixCls = _this$props6.prefixCls,
          customRegion = _this$props6.customRegion,
          exceptionValues = _this$props6.exceptionValues;
      var key = _this.state.openValue[level - 1];
      var options = (0, _regionTools.getChildrenByKey)({
        key: key,
        level: level,
        customRegion: customRegion,
        exceptionValues: exceptionValues
      }) || [];
      return _react["default"].createElement("div", {
        className: prefixCls + "-level"
      }, _this.renderCheckboxList(options, level));
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearchRegion", function () {
      var _this$state5 = _this.state,
          searchOptions = _this$state5.searchOptions,
          searchValue = _this$state5.searchValue;
      var _this$props7 = _this.props,
          prefixCls = _this$props7.prefixCls,
          notFountNode = _this$props7.notFountNode;

      if (!searchOptions.length) {
        return _react["default"].createElement("div", {
          className: prefixCls + "-panel-search-container"
        }, _react["default"].createElement("div", {
          className: prefixCls + "-not-found-container"
        }, notFountNode));
      }

      return _react["default"].createElement("div", {
        className: prefixCls + "-panel-search-container"
      }, searchOptions.map(function (option, index) {
        return _react["default"].createElement("div", {
          className: prefixCls + "-panel-search-item",
          key: index,
          onClick: _this.onClickSearchItem,
          "data-index": index
        }, option.label && option.label.split('').map(function (text, labelIndex) {
          if (searchValue.indexOf(text) > -1) {
            return _react["default"].createElement("span", {
              "data-index": index,
              key: labelIndex,
              className: prefixCls + "-panel-search-item-highlight"
            }, text);
          }

          if (text === '>') {
            return _react["default"].createElement("span", {
              "data-index": index,
              key: labelIndex
            }, ' ', text, ' ');
          }

          return _react["default"].createElement("span", {
            "data-index": index,
            key: labelIndex
          }, text);
        }));
      }));
    });

    var _customRegion = props.customRegion;
    _this.firstOptions = (0, _regionTools.firstLevelRegion)(_customRegion);
    _this.regionNames = (0, _regionTools.getRegionNames)(_customRegion);
    _this.regionFiliation = (0, _regionTools.getRegionFiliation)(_customRegion);
    _this.directCityCode = (0, _regionTools.getDirectCityCode)(_customRegion);
    var map = RegionBody.formatStateMap(props);
    _this.state = {
      checkedMap: map.checkedMap,
      indeterminateMap: map.indeterminateMap,
      openLevel: _regionTools.levelMap.province,
      openValue: (_openValue = {}, _openValue[_regionTools.levelMap.province] = null, _openValue[_regionTools.levelMap.city] = null, _openValue[_regionTools.levelMap.district] = null, _openValue),
      searchValue: props.searchValue || '',
      searchOptions: []
    };
    return _this;
  }

  var _proto = RegionBody.prototype;

  _proto.render = function render() {
    var _this$props8 = this.props,
        prefixCls = _this$props8.prefixCls,
        searchBoxWidth = _this$props8.searchBoxWidth,
        showDistrict = _this$props8.showDistrict;
    var _this$state6 = this.state,
        openLevel = _this$state6.openLevel,
        searchValue = _this$state6.searchValue;

    if (searchValue) {
      // 搜索模式
      return _react["default"].createElement("div", {
        className: prefixCls + "-panel",
        style: {
          width: searchBoxWidth + "px"
        }
      }, this.renderSearchRegion());
    }

    return _react["default"].createElement("div", {
      className: prefixCls + "-panel",
      style: {
        width: searchBoxWidth + "px"
      }
    }, this.renderCountryAndProvince(), openLevel > _regionTools.levelMap.province ? this.renderOtherLevel(_regionTools.levelMap.city) : null, openLevel === _regionTools.levelMap.district && showDistrict ? this.renderOtherLevel(_regionTools.levelMap.district) : null);
  };

  return RegionBody;
}(_react.PureComponent);

_defineProperty(RegionBody, "formatStateMap", function (props) {
  var showDistrict = props.showDistrict,
      customRegion = props.customRegion,
      isNewRegionKeyMode = props.isNewRegionKeyMode,
      disabledValue = props.disabledValue;
  var selectedValue = props.selectedValue;
  selectedValue = transNewKeyToOld(selectedValue, isNewRegionKeyMode);

  if (!selectedValue) {
    return {
      checkedMap: {},
      indeterminateMap: {}
    };
  }

  var disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
  var selectCheckedMap = (0, _regionTools.formatSelectedValueToMap)(selectedValue, showDistrict, disabledValueKeys, customRegion);
  var checkedMap = selectCheckedMap.checkedMap;
  var indeterminateMap = selectCheckedMap.indeterminateMap;
  (0, _regionTools.formatToIndeterminateMap)(selectedValue, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
  return {
    checkedMap: checkedMap,
    indeterminateMap: indeterminateMap
  };
});

_defineProperty(RegionBody, "propTypes", {
  prefixCls: _propTypes["default"].string,
  customRegion: _propTypes["default"].object,
  selectedValue: _propTypes["default"].array,
  disabledValue: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  searchValue: _propTypes["default"].string,
  searchBoxWidth: _propTypes["default"].number,
  notFountNode: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  onClickSearchItem: _propTypes["default"].func.isRequired,
  showDistrict: _propTypes["default"].bool.isRequired,
  isNewRegionKeyMode: _propTypes["default"].bool,
  exceptionValues: _propTypes["default"].array,
  checkboxPrefixCls: _propTypes["default"].string,
  showCheckAll: _propTypes["default"].bool,
  onChangeCheckAll: _propTypes["default"].func
});

_defineProperty(RegionBody, "defaultProps", {
  prefixCls: 'new-fc-one-region',
  searchBoxWidth: 360,
  notFountNode: '没有相关地域',
  disabledValue: {},
  isNewRegionKeyMode: false,
  exceptionValues: [],
  checkboxPrefixCls: 'new-fc-one-checkbox',
  showCheckAll: false
});

_defineProperty(RegionBody, "getDerivedStateFromProps", function (nextProps, state) {
  var searchValue = state.searchValue;
  var showDistrict = nextProps.showDistrict,
      disabledValue = nextProps.disabledValue,
      customRegion = nextProps.customRegion,
      isNewRegionKeyMode = nextProps.isNewRegionKeyMode,
      _nextProps$exceptionV = nextProps.exceptionValues,
      exceptionValues = _nextProps$exceptionV === void 0 ? [] : _nextProps$exceptionV;
  var newState = {};
  var disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
  var regionNames = (0, _regionTools.getRegionNames)(customRegion);

  if (nextProps.searchValue !== searchValue) {
    newState.searchValue = nextProps.searchValue;
    var options = [];
    var regionValues = (0, _values["default"])(regionNames);
    var regionKeysByNames = Object.keys(regionNames);

    if (nextProps.searchValue) {
      regionValues.forEach(function (name, index) {
        var regionKey = regionKeysByNames[index];
        /** 满足四个条件
        * 1、有搜索到
        * 2、不能选择区县时，区县相关不能被搜索到
        * 3、disabledValue有值的时候，里面的value也不能被取到
        * 4、exceptionValues里面的值也不能被取到
        */

        if (name.indexOf(nextProps.searchValue) > -1 && !((0, _regionTools.getCurrentLevelByKey)(regionKey) === _regionTools.levelMap.district && !showDistrict) && disabledValueKeys.indexOf("" + regionKey) === -1 && exceptionValues.indexOf(+regionKey) === -1) {
          options.push((0, _regionTools.getSearchLabel)(regionKey, customRegion));
        }
      });
    }

    newState.searchOptions = options;
  }

  if ('selectedValue' in nextProps) {
    var obj = RegionBody.formatStateMap(nextProps);
    newState.checkedMap = obj.checkedMap;
    newState.indeterminateMap = obj.indeterminateMap;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(RegionBody);
var _default = RegionBody;
exports["default"] = _default;