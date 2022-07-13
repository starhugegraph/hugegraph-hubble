function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import warning from 'warning';
import { IconClose } from '@baidu/one-ui-icon';
import Tree from '../tree/index';
import Input from '../input';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';
import Button from '../button';
import Select from '../select';
import tools from '../../core';
var _tools$transfer = tools.transfer,
    formatTransferDisbaledKeys = _tools$transfer.formatTransferDisbaledKeys,
    getTransferData = _tools$transfer.getTransferData,
    formatParentDisabled = _tools$transfer.formatParentDisabled,
    isDisabledKeysChange = _tools$transfer.isDisabledKeysChange,
    isSelectedDisabled = _tools$transfer.isSelectedDisabled,
    isParentKeyDisabled = _tools$transfer.isParentKeyDisabled,
    isAllDataMapEqual = _tools$transfer.isAllDataMapEqual;
var TreeNode = Tree.TreeNode;
var Option = Select.Option;
var Search = Input.Search;
export var CommonTitleRender = function CommonTitleRender(props) {
  var title = props.title,
      treeName = props.treeName,
      selectedNum = props.selectedNum,
      maxSelectedNum = props.maxSelectedNum,
      showSelectedNum = props.showSelectedNum,
      showCandidateNum = props.showCandidateNum,
      unSelectedNum = props.unSelectedNum;
  var titleDetail = "" + title + treeName;
  var numberDom;

  if (selectedNum != null && showSelectedNum) {
    titleDetail = "" + titleDetail;
    numberDom = "(" + selectedNum + (maxSelectedNum ? "/" + maxSelectedNum : '') + ")";
  }

  if (unSelectedNum != null && showCandidateNum) {
    titleDetail = "" + titleDetail;
    numberDom = "(" + unSelectedNum + ")";
  }

  return React.createElement("span", {
    className: "title",
    title: title
  }, React.createElement("span", {
    className: "title-text"
  }, titleDetail), numberDom ? React.createElement("span", {
    className: "title-number"
  }, numberDom) : null);
};
CommonTitleRender.propTypes = {
  title: PropTypes.string.isRequired,
  treeName: PropTypes.string.isRequired,
  selectedNum: PropTypes.number,
  maxSelectedNum: PropTypes.number,
  showSelectedNum: PropTypes.bool,
  showCandidateNum: PropTypes.bool,
  unSelectedNum: PropTypes.number
};
CommonTitleRender.defaultProps = {
  selectedNum: null,
  maxSelectedNum: null,
  showSelectedNum: false,
  showCandidateNum: false,
  unSelectedNum: null
};
export var CommonItemRender = function CommonItemRender(props) {
  var title = props.title,
      relationText = props.relationText,
      searchValue = props.searchValue;
  var textArray = [React.createElement("span", {
    key: "normal-0"
  }, title)];

  if (searchValue) {
    var pivolIndex = title.indexOf(searchValue);

    if (pivolIndex > -1) {
      textArray = _.flattenDeep(title.split(searchValue).map(function (node, index) {
        return index === 0 ? [React.createElement("span", {
          key: index
        }, node)] : [React.createElement("span", {
          key: index + "-highlight",
          className: "highlight"
        }, searchValue), React.createElement("span", {
          key: index
        }, node)];
      }));
    }
  }

  return title ? React.createElement("span", {
    title: title,
    className: "item-title"
  }, textArray, React.createElement("span", {
    className: "relation-text"
  }, ' ', relationText)) : null; // 有构造数据的 id 不存在
};
CommonItemRender.propTypes = {
  title: PropTypes.string,
  relationText: PropTypes.string,
  searchValue: PropTypes.string
};
CommonItemRender.defaultProps = {
  title: '',
  relationText: ''
};
export var CommonSearchRender = function CommonSearchRender(props) {
  var _classNames;

  var levelOptions = props.levelOptions,
      handleLevelChange = props.handleLevelChange,
      searchBoxProps = props.searchBoxProps,
      prefixCls = props.prefixCls,
      isShowLevelSelect = props.isShowLevelSelect,
      levelKey = props.levelKey,
      onSelectFocus = props.onSelectFocus,
      customSearchProps = _objectWithoutPropertiesLoose(props, ["levelOptions", "handleLevelChange", "searchBoxProps", "prefixCls", "isShowLevelSelect", "levelKey", "onSelectFocus"]);

  var selectProps = {};

  if (levelKey != null) {
    selectProps.value = levelKey;
  }

  var searchBarClassName = classNames(prefixCls + "-search-box-bar", (_classNames = {}, _classNames[prefixCls + "-search-has-select"] = isShowLevelSelect, _classNames));
  return React.createElement("div", {
    className: searchBarClassName
  }, isShowLevelSelect ? React.createElement(Select, _extends({
    defaultValue: levelKey || levelOptions[0] && levelOptions[0].value,
    style: {
      width: 64,
      borderRadius: 0
    },
    onChange: handleLevelChange,
    onFocus: onSelectFocus
  }, selectProps), levelOptions.map(function (option) {
    return React.createElement(Option, {
      value: option.value,
      key: option.value
    }, option.label);
  })) : null, React.createElement(Search, _extends({}, searchBoxProps, customSearchProps)));
};
CommonSearchRender.propTypes = {
  levelOptions: PropTypes.array,
  handleLevelChange: PropTypes.func,
  searchBoxProps: PropTypes.object,
  isShowLevelSelect: PropTypes.bool,
  levelKey: PropTypes.string,
  onSelectFocus: PropTypes.func,
  prefixCls: PropTypes.string
};
CommonSearchRender.defaultProps = {
  levelOptions: null,
  handleLevelChange: function handleLevelChange() {},
  searchBoxProps: {},
  isShowLevelSelect: false,
  levelKey: null,
  onSelectFocus: function onSelectFocus() {},
  prefixCls: 'new-fc-one-transfer'
};
export var CommonFooterRender = function CommonFooterRender(props) {
  var candidateFooterProps = props.candidateFooterProps,
      treeName = props.treeName,
      size = props.size;
  return React.createElement("div", {
    className: "select-footer"
  }, React.createElement(Button, _extends({
    type: "link",
    size: size
  }, candidateFooterProps), "+ \u65B0\u5EFA", treeName));
};
CommonFooterRender.propTypes = {
  treeName: PropTypes.string,
  candidateFooterProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium'])
};
CommonFooterRender.defaultProps = {
  treeName: '',
  candidateFooterProps: {},
  size: 'small'
};

var getContainerClass = function getContainerClass(item) {
  var children = item.children;
  return classNames({
    'select-selected': 1,
    'select-selected-has-children': children && children.length
  });
};

var Transfer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Transfer, _Component);

  function Transfer(_args) {
    var _this;

    _this = _Component.call.apply(_Component, [this].concat(_args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onSearchChange", function (e) {
      _this.setState({
        hasEdit: true
      });

      _this.props.onSearchChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectFocus", function () {
      _this.setState({
        isShowLevelSelect: 'focus'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectParentMap", function (list, selectParentMap, parentRelationMap) {
      _.forEach(list, function (value) {
        var parentKey = parentRelationMap[value];

        if (parentKey) {
          if (selectParentMap[parentKey]) {
            selectParentMap[parentKey].push(value);
          } else {
            selectParentMap[parentKey] = [value];
          }
        }
      });

      return selectParentMap;
    });

    _defineProperty(_assertThisInitialized(_this), "getLevelText", function (text, id, parentRelationMap, allDataMap) {
      if (parentRelationMap[id] == null) {
        return text;
      }

      text.unshift(allDataMap[parentRelationMap[id]].title);
      return _this.getLevelText(text, parentRelationMap[id], parentRelationMap, allDataMap);
    });

    _defineProperty(_assertThisInitialized(_this), "allDataMapFactory", function (selectedList, allDataMap, parentRelationMap, childrenRelationMap, candidateTotalCount) {
      var allDataMapWithSelected = JSON.parse(JSON.stringify(allDataMap));

      _.forEach(selectedList, function (key) {
        try {
          allDataMapWithSelected[key].isSelectorDisabled = true;
        } catch (e) {
          warning(false, "please check selectedId:" + key + " is in allDataMap");
        }

        if (parentRelationMap[key]) {
          var parentKey = parentRelationMap[key];

          if (allDataMapWithSelected[parentKey] && allDataMapWithSelected[parentKey].isSelectorDisabled) {
            return;
          }

          if ((childrenRelationMap[parentKey] || []).every(function (id) {
            return selectedList.indexOf(id) > -1;
          })) {
            (allDataMapWithSelected[parentKey] || {}).isSelectorDisabled = true;
          }
        }
      });

      _.forIn(allDataMapWithSelected, function (value, key) {
        if (value.isSelectorDisabled && parentRelationMap[key]) {
          var parentKey = parentRelationMap[key];

          if (allDataMapWithSelected[parentKey] && allDataMapWithSelected[parentKey].isSelectorDisabled) {
            return;
          }

          if ((childrenRelationMap[parentKey] || []).every(function (id) {
            return allDataMapWithSelected[id].isSelectorDisabled;
          })) {
            (allDataMapWithSelected[parentKey] || {}).isSelectorDisabled = true;
          }
        }
      });

      _this.setState({
        allDataMap: allDataMapWithSelected,
        parentRelationMap: parentRelationMap,
        childrenRelationMap: childrenRelationMap,
        candidateTotalCount: candidateTotalCount
      });
    });

    _defineProperty(_assertThisInitialized(_this), "findRootKey", function (id, parentRelationMap) {
      if (parentRelationMap[id] == null) {
        return id;
      }

      return _this.findRootKey(parentRelationMap[id], parentRelationMap);
    });

    _defineProperty(_assertThisInitialized(_this), "findLeafNode", function (id, childrenRelationMap) {
      var childrenArray = childrenRelationMap[id] || [];
      var resultArray = [];

      _.forEach(childrenArray, function (child) {
        var leafArray = childrenRelationMap[child] || [child];
        resultArray = _.concat(resultArray, leafArray);
      });

      return resultArray;
    });

    _defineProperty(_assertThisInitialized(_this), "searchBoxFocus", function (e) {
      _this.setState({
        isShowLevelSelect: true
      });

      _this.props.onSearchBoxFocus(e);
    });

    _defineProperty(_assertThisInitialized(_this), "searchBoxBlur", function (e) {
      var value = e.target.value;

      if (value.length <= 0 && _this.state.hasEdit) {
        setTimeout(function () {
          if (_this.state.isShowLevelSelect === 'focus') {
            _this.setState({
              isShowLevelSelect: true,
              hasEdit: false
            });
          } else {
            _this.setState({
              isShowLevelSelect: false,
              hasEdit: false
            });
          }

          _this.props.onSearchBoxBlur(e, _this.state.isShowLevelSelect);
        }, 20);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearch", function (e) {
      _this.setState({
        hasSearch: true
      });

      _this.props.handleSearch(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectedExpand", function (expandedKeys) {
      _this.setState({
        expandedSelectedKeys: expandedKeys
      });

      _this.props.handleSelectedExpand(expandedKeys);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCandidateExpand", function () {
      var _this$props;

      _this.setState({
        expandedCandidateKeys: arguments.length <= 0 ? undefined : arguments[0]
      });

      (_this$props = _this.props).handleCandidateExpand.apply(_this$props, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChildren", function (selectedState, state, flag) {
      var children = selectedState.children || [];
      var disabledKeys = _this.state.disabledKeys;
      var childrenState = {};
      children.forEach(function (child) {
        if (disabledKeys.indexOf(child) === -1) {
          childrenState[child] = _extends({}, state[child], {
            isSelectorDisabled: flag
          });

          if (childrenState[child].children) {
            childrenState = _extends({}, childrenState, _this.handleChildren(childrenState[child], state, flag));
          }
        }
      });
      return childrenState;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (handleSelectParams) {
      var _extends2;

      if (_this.props.readOnly) {
        return;
      }

      var selectedId = handleSelectParams.selectedId,
          _handleSelectParams$c = handleSelectParams.childrenRelationMap,
          childrenRelationMap = _handleSelectParams$c === void 0 ? {} : _handleSelectParams$c,
          selectedList = handleSelectParams.selectedList,
          allDataMap = handleSelectParams.allDataMap,
          parentId = handleSelectParams.parentId,
          parentRelationMap = handleSelectParams.parentRelationMap,
          expandedSelectedKeys = handleSelectParams.expandedSelectedKeys,
          _handleSelectParams$s = handleSelectParams.shouldEmit,
          shouldEmit = _handleSelectParams$s === void 0 ? true : _handleSelectParams$s;
      var resultList = [].concat(selectedList);
      var disabledKeys = _this.state.disabledKeys; // selectedList中永远都只包含选中的叶子节点

      var childrenArray = _this.findLeafNode(selectedId, childrenRelationMap).filter(function (childKey) {
        return disabledKeys.indexOf(childKey) === -1;
      });

      if (childrenArray.length) {
        resultList = [].concat(resultList, childrenArray);
      } else {
        resultList = [].concat(resultList, [selectedId]);
      }

      var selectedState = allDataMap[selectedId] || {};
      var parentState = allDataMap[parentId] || {};
      var allBrotherArray = parentState.children || [];

      var newAllDataMap = _extends({}, allDataMap, (_extends2 = {}, _extends2[selectedId] = _extends({}, selectedState, {
        isSelectorDisabled: true
      }), _extends2), _this.handleChildren(selectedState, allDataMap, true)); // 单个添加，如果其兄弟节点都已添加，那么也要将父节点变为已选状态。


      if (parentId && allBrotherArray.every(function (brother) {
        return brother === selectedId || allDataMap[brother].isSelectorDisabled === true;
      })) {
        newAllDataMap[parentId].isSelectorDisabled = true;
      }

      var newExpandedKeys = _.concat(expandedSelectedKeys, selectedId);

      if (childrenRelationMap[selectedId]) {
        newExpandedKeys = _.concat(newExpandedKeys, childrenRelationMap[selectedId]);
      }

      if (parentId) {
        newExpandedKeys.push(parentId);

        if (parentRelationMap[parentId]) {
          newExpandedKeys.push(parentRelationMap[parentId]);
        }
      }

      newExpandedKeys = newExpandedKeys.map(function (key) {
        return String(key);
      });

      _this.setState({
        selectedList: _.uniq(resultList),
        allDataMap: newAllDataMap,
        expandedSelectedKeys: _.uniq(newExpandedKeys)
      });

      var event = {
        target: {
          key: selectedId
        }
      };

      if (shouldEmit) {
        _this.props.handleSelect(_.uniq(resultList), newAllDataMap, _.uniq(newExpandedKeys), event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectAll", function (selectAllParams) {
      if (_this.props.readOnly) {
        return;
      }

      var candidateList = selectAllParams.candidateList,
          childrenRelationMap = selectAllParams.childrenRelationMap,
          _selectAllParams$pare = selectAllParams.parentRelationMap,
          parentRelationMap = _selectAllParams$pare === void 0 ? {} : _selectAllParams$pare,
          allDataMap = selectAllParams.allDataMap,
          selectedLength = selectAllParams.selectedLength,
          maxSelectedNum = selectAllParams.maxSelectedNum,
          candidateTreeUnSelectedCount = selectAllParams.candidateTreeUnSelectedCount;
      var disabledKeys = _this.state.disabledKeys;

      if (maxSelectedNum && candidateTreeUnSelectedCount > maxSelectedNum - selectedLength) {
        return;
      }

      var currentSelectedList = _this.state.selectedList;
      var selectedList = [].concat(currentSelectedList);

      var newAllDataMap = _extends({}, allDataMap);

      candidateList.forEach(function (selectedId) {
        var _extends3;

        if (disabledKeys.indexOf(selectedId) !== -1) {
          return;
        }

        var result = _this.findLeafNode(selectedId, childrenRelationMap).filter(function (childKey) {
          return disabledKeys.indexOf(childKey) === -1;
        });

        var parentId = parentRelationMap[selectedId];
        var idObj = newAllDataMap[selectedId] || {};

        if (!result || !result.length) {
          result = [selectedId];
        }

        selectedList = _.uniq([].concat(selectedList, result));
        newAllDataMap = _extends({}, newAllDataMap, (_extends3 = {}, _extends3[selectedId] = _extends({}, idObj, {
          isSelectorDisabled: true
        }), _extends3), _this.handleChildren(idObj, newAllDataMap, true));

        if (parentId != null) {
          newAllDataMap[parentId] = _extends({}, newAllDataMap[parentId], {
            isSelectorDisabled: true
          });
        }
      });

      _this.setState({
        selectedList: selectedList,
        allDataMap: newAllDataMap,
        expandedSelectedKeys: Object.keys(allDataMap)
      });

      _this.props.handleSelectAll(selectedList, newAllDataMap, Object.keys(allDataMap));
    });

    _defineProperty(_assertThisInitialized(_this), "handleDelete", function (candidateParams) {
      var _extends4;

      var selectedList = candidateParams.selectedList,
          candidateId = candidateParams.candidateId,
          childrenRelationMap = candidateParams.childrenRelationMap,
          allDataMap = candidateParams.allDataMap,
          parentId = candidateParams.parentId,
          parentRelationMap = candidateParams.parentRelationMap,
          _candidateParams$shou = candidateParams.shouldEmit,
          shouldEmit = _candidateParams$shou === void 0 ? true : _candidateParams$shou;
      var disabledKeys = _this.state.disabledKeys;

      if (!allDataMap[candidateId]) {
        return;
      }

      if (_this.props.readOnly || disabledKeys.indexOf(candidateId) !== -1) {
        return;
      } // 待删除节点的所有子孙节点都会被从selectedList中移除


      var candidateArray = childrenRelationMap[candidateId] || [];

      var arr = _.clone(candidateArray);

      _.forEach(candidateArray, function (id) {
        if (childrenRelationMap[id]) {
          arr = _.concat(arr, childrenRelationMap[id]);
        }
      });

      arr = arr.filter(function (arrKey) {
        return disabledKeys.indexOf(arrKey) === -1;
      });
      var toBeRemovedArray = candidateArray.length ? arr : [candidateId];

      _.remove(selectedList, function (id) {
        return toBeRemovedArray.indexOf(id) > -1;
      }); // 修改allDataMap中的选中状态


      var selectedState = allDataMap[candidateId] || {};

      var newAllDataMap = _extends({}, allDataMap, (_extends4 = {}, _extends4[candidateId] = _extends({}, selectedState, {
        isSelectorDisabled: false
      }), _extends4), _this.handleChildren(selectedState, allDataMap, false)); // 如果待删除的节点，没有被选中的兄弟节点，那么也要将它父节点的选中态删除掉


      if (parentId) {
        newAllDataMap[parentId].isSelectorDisabled = false;

        if (parentRelationMap[parentId]) {
          newAllDataMap[parentRelationMap[parentId]].isSelectorDisabled = false;
        }
      }

      _this.setState({
        selectedList: selectedList,
        allDataMap: newAllDataMap
      });

      if (shouldEmit) {
        _this.props.handleDelete([].concat(selectedList), newAllDataMap, candidateId);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDeleteAll", function () {
      if (_this.props.readOnly) {
        return;
      }

      var _this$state = _this.state,
          allDataMap = _this$state.allDataMap,
          disabledKeys = _this$state.disabledKeys;
      var _this$props2 = _this.props,
          _this$props2$selected = _this$props2.selectedList,
          selectedList = _this$props2$selected === void 0 ? _this.state.selectedList : _this$props2$selected,
          _this$props2$children = _this$props2.childrenRelationMap,
          childrenRelationMap = _this$props2$children === void 0 ? _this.state.childrenRelationMap : _this$props2$children;
      var toBeRetainedList = [];

      _.forIn(allDataMap, function (value) {
        if (disabledKeys.indexOf(value.key) === -1) {
          value.isSelectorDisabled = false;
        } else {
          var childrenArray = _this.findLeafNode(value.key, childrenRelationMap);

          if (childrenArray.length) {
            toBeRetainedList = [].concat(toBeRetainedList, childrenArray);
          } else {
            toBeRetainedList = [].concat(toBeRetainedList, [value.key]);
          }
        }
      });

      var newSelectedList = _.intersection(toBeRetainedList, selectedList);

      var expandedSelectedKeys = newSelectedList.length ? newSelectedList : [];

      _this.setState({
        selectedList: newSelectedList,
        allDataMap: allDataMap,
        expandedSelectedKeys: expandedSelectedKeys
      });

      _this.props.handleDeleteAll(newSelectedList, allDataMap, expandedSelectedKeys);
    });

    _defineProperty(_assertThisInitialized(_this), "makeTitle", function (item, relationText) {
      var _classNames2;

      var hasSearch = _this.state.hasSearch;
      var _this$props3 = _this.props,
          CandidateItem = _this$props3.CandidateItem,
          _this$props3$selected = _this$props3.selectedList,
          selectedList = _this$props3$selected === void 0 ? _this.state.selectedList : _this$props3$selected,
          maxSelectedNum = _this$props3.maxSelectedNum,
          _this$props3$parentRe = _this$props3.parentRelationMap,
          parentRelationMap = _this$props3$parentRe === void 0 ? _this.state.parentRelationMap : _this$props3$parentRe,
          _this$props3$children = _this$props3.childrenRelationMap,
          childrenRelationMap = _this$props3$children === void 0 ? _this.state.childrenRelationMap : _this$props3$children,
          _this$props3$expanded = _this$props3.expandedSelectedKeys,
          expandedSelectedKeys = _this$props3$expanded === void 0 ? _this.state.expandedSelectedKeys : _this$props3$expanded,
          candidateItemProps = _this$props3.candidateItemProps,
          tooltipPrefixCls = _this$props3.tooltipPrefixCls,
          searchValue = _this$props3.searchValue,
          size = _this$props3.size,
          prefixCls = _this$props3.prefixCls,
          checkboxPrefixCls = _this$props3.checkboxPrefixCls;
      var allDataMap = _this.state.allDataMap;
      var disabledKeys = _this.state.disabledKeys;
      var key = item.key,
          isSelectorDisabled = item.isSelectorDisabled;
      var selectorClassName = classNames({
        'select-operation': 1,
        'select-operation-disabled': isSelectorDisabled
      });
      var checkboxDisabled = disabledKeys.indexOf(key) !== -1;
      var commonParams = {
        allDataMap: allDataMap,
        parentId: parentRelationMap[key],
        childrenRelationMap: childrenRelationMap,
        selectedList: selectedList,
        maxSelectedNum: maxSelectedNum,
        parentRelationMap: parentRelationMap,
        expandedSelectedKeys: expandedSelectedKeys
      };
      var disabled = maxSelectedNum && selectedList.length >= maxSelectedNum && !isSelectorDisabled;
      var indeterminate = false;

      var leafs = _this.findLeafNode(key, childrenRelationMap);

      if (leafs && leafs.length) {
        var base = !!allDataMap[leafs[0]].isSelectorDisabled;

        for (var index = 0; index < leafs.length; index++) {
          var id = leafs[index];

          if (!!allDataMap[id].isSelectorDisabled !== base) {
            indeterminate = true;
            break;
          }
        }
      }

      var checkboxEle = React.createElement(Checkbox, {
        className: selectorClassName,
        checked: isSelectorDisabled,
        indeterminate: indeterminate,
        size: size,
        disabled: checkboxDisabled != null ? checkboxDisabled : disabled,
        prefixCls: checkboxPrefixCls,
        onChange: function onChange(e) {
          if (e.target.checked) {
            _this.handleSelect(_extends({}, commonParams, {
              selectedId: key,
              shouldEmit: false
            }));
          } else {
            _this.handleDelete(_extends({}, commonParams, {
              candidateId: key,
              shouldEmit: false
            }));
          }
        }
      });
      var itemProps = {
        hasSearch: hasSearch,
        searchValue: searchValue,
        relationText: relationText
      };
      var itemDisabled = checkboxDisabled != null ? checkboxDisabled : disabled;
      var itemClassName = classNames(getContainerClass(item), (_classNames2 = {}, _classNames2[prefixCls + "-item-disabled"] = itemDisabled, _classNames2));
      return React.createElement("div", {
        className: itemClassName,
        onClick: function onClick() {
          if (itemDisabled) {
            return;
          }

          if (indeterminate || !isSelectorDisabled) {
            _this.handleSelect(_extends({}, commonParams, {
              selectedId: key
            }));
          } else {
            _this.handleDelete(_extends({}, commonParams, {
              candidateId: key
            }));
          }
        }
      }, React.createElement(CandidateItem, _extends({}, item, itemProps, candidateItemProps)), disabled ? React.createElement(Tooltip, {
        title: "\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u8BF7\u5220\u9664\u540E\u6DFB\u52A0",
        placement: "rightBottom",
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
        prefixCls: tooltipPrefixCls
      }, checkboxEle) : checkboxEle);
    });

    _defineProperty(_assertThisInitialized(_this), "makeSelectedTitle", function (item) {
      var _classNames3;

      var _this$props4 = _this.props,
          _this$props4$selected = _this$props4.selectedList,
          selectedList = _this$props4$selected === void 0 ? _this.state.selectedList : _this$props4$selected,
          _this$props4$parentRe = _this$props4.parentRelationMap,
          parentRelationMap = _this$props4$parentRe === void 0 ? _this.state.parentRelationMap : _this$props4$parentRe,
          _this$props4$children = _this$props4.childrenRelationMap,
          childrenRelationMap = _this$props4$children === void 0 ? _this.state.childrenRelationMap : _this$props4$children,
          SelectedItem = _this$props4.SelectedItem,
          selectedItemProps = _this$props4.selectedItemProps,
          prefixCls = _this$props4.prefixCls;
      var allDataMap = _this.state.allDataMap;
      var candidateId = item.key;
      var candidateParams = {
        allDataMap: allDataMap,
        selectedList: selectedList,
        candidateId: candidateId,
        parentId: parentRelationMap[candidateId],
        childrenRelationMap: childrenRelationMap,
        parentRelationMap: parentRelationMap
      };
      var disabledKeys = _this.state.disabledKeys;
      var disabled = disabledKeys.indexOf(candidateId) !== -1;
      var disabledMap = isSelectedDisabled(parentRelationMap, selectedList, allDataMap);
      var disabledParentList = Object.keys(disabledMap).filter(function (key) {
        return disabledMap[key];
      });

      if (disabledParentList && disabledParentList.length) {
        disabledMap = _extends({}, disabledMap, isParentKeyDisabled(disabledParentList, parentRelationMap, childrenRelationMap, disabledMap));
      }

      var itemClassName = classNames(getContainerClass(item), (_classNames3 = {}, _classNames3[prefixCls + "-item-disabled"] = disabled || disabledMap[candidateId], _classNames3));
      return React.createElement("div", {
        className: itemClassName,
        onClick: _.partial(_this.handleDelete, candidateParams)
      }, React.createElement(SelectedItem, _extends({}, item, {
        key: "dual-tree-select-selected-" + candidateId
      }, selectedItemProps)), React.createElement(IconClose, {
        className: "select-operation"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderCandidateTreeNodes", function (candidateList, isShowLevel) {
      if (isShowLevel === void 0) {
        isShowLevel = false;
      }

      var _this$props$parentRel = _this.props.parentRelationMap,
          parentRelationMap = _this$props$parentRel === void 0 ? _this.state.parentRelationMap : _this$props$parentRel;
      var _this$state2 = _this.state,
          allDataMap = _this$state2.allDataMap,
          expandedCandidateKeys = _this$state2.expandedCandidateKeys;
      return candidateList.map(function (key) {
        var item = allDataMap[key] || {};
        var relationText = '';

        if (isShowLevel) {
          var textArray = _this.getLevelText([], key, parentRelationMap, allDataMap);

          relationText = textArray.length > 0 ? "(" + textArray.join('>') + ")" : '';
        }

        var children = item.children;
        var disabledKeys = _this.state.disabledKeys;
        var disabled = disabledKeys.indexOf(item.key) !== -1;

        if (children) {
          // 如果树没有展开，则无需计算子节点的展示逻辑，仅挂一个虚拟节点即可
          if (expandedCandidateKeys.indexOf("" + item.key) > -1) {
            return React.createElement(TreeNode, {
              title: _this.makeTitle(item, relationText),
              key: item.key,
              selectable: false,
              disabled: disabled
            }, _this.renderCandidateTreeNodes(children));
          }

          return React.createElement(TreeNode, {
            title: _this.makeTitle(item, relationText),
            key: item.key,
            selectable: false,
            disabled: disabled
          }, children.length ? React.createElement(TreeNode, null) : null);
        }

        return React.createElement(TreeNode, _extends({}, item, {
          title: _this.makeTitle(item, relationText),
          key: item.key,
          selectable: false,
          disabled: disabled
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectedTreeNodes", function (selectedRootKeys, selectedPathMap) {
      var allDataMap = _this.state.allDataMap;
      var expandedSelectedKeys = _this.props.expandedSelectedKeys || _this.state.expandedSelectedKeys;
      return selectedRootKeys.map(function (key) {
        var item = allDataMap[key] || {};
        var children = selectedPathMap[key] || item.children;
        var itemKey = item.key; // 如果已选节点有孩子

        if (children) {
          // 如果树没有展开，则无需计算子节点的展示逻辑，仅挂一个虚拟节点即可
          if (expandedSelectedKeys.indexOf("" + item.key) > -1) {
            return React.createElement(TreeNode, {
              title: _this.makeSelectedTitle(item, key),
              key: itemKey,
              selectable: false
            }, _this.renderSelectedTreeNodes(children, selectedPathMap));
          }

          return React.createElement(TreeNode, {
            title: _this.makeSelectedTitle(item, key),
            key: itemKey,
            selectable: false
          }, children.length ? React.createElement(TreeNode, null) : null);
        }

        return React.createElement(TreeNode, _extends({}, item, {
          title: _this.makeSelectedTitle(item, key),
          key: itemKey,
          selectable: false
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderCandidateTree", function () {
      var _this$props5 = _this.props,
          candidateList = _this$props5.candidateList,
          isShowLevel = _this$props5.isShowLevel,
          treePrefixCls = _this$props5.treePrefixCls;
      var expandedCandidateKeys = _this.state.expandedCandidateKeys;
      var candidateTreeProps = {
        onExpand: _this.handleCandidateExpand,
        expandedKeys: expandedCandidateKeys,
        prefixCls: treePrefixCls
      };
      return React.createElement(Tree, candidateTreeProps, _this.renderCandidateTreeNodes(candidateList, isShowLevel));
    });

    _defineProperty(_assertThisInitialized(_this), "leftSelectPanel", function (ref) {
      _this.transferLeftSelectPanel = ref;
    });

    var _allDataMap = _args.allDataMap || {};

    var _disabledKeys = [];

    var transferData = _.reduce(_allDataMap, function (result, value, key) {
      result.allDataMap[key] = _extends({}, value);

      if (value.disabled) {
        _disabledKeys.push(value.key);
      }

      return result;
    }, {
      allDataMap: {}
    });

    _this.state = _extends({
      selectedList: _args.selectedList || []
    }, transferData, {
      expandedSelectedKeys: [],
      isShowLevelSelect: false,
      hasEdit: false,
      hasSearch: false,
      expandedCandidateKeys: [],
      leftPanelWidth: 0,
      disabledKeys: _disabledKeys
    });
    _this.allDataMapFactory = _this.allDataMapFactory.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Transfer.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var _this$props6 = this.props,
        _this$props6$selected = _this$props6.selectedList,
        selectedList = _this$props6$selected === void 0 ? this.state.selectedList : _this$props6$selected,
        allDataMap = _this$props6.allDataMap,
        candidateList = _this$props6.candidateList;
    var transferData = getTransferData(allDataMap);
    var _this$props7 = this.props,
        _this$props7$parentRe = _this$props7.parentRelationMap,
        parentRelationMap = _this$props7$parentRe === void 0 ? transferData.parentRelationMap : _this$props7$parentRe,
        _this$props7$children = _this$props7.childrenRelationMap,
        childrenRelationMap = _this$props7$children === void 0 ? transferData.childrenRelationMap : _this$props7$children;
    var candidateTotalCount = transferData.candidateTotalCount;
    this.allDataMapFactory(selectedList, allDataMap, parentRelationMap, childrenRelationMap, candidateTotalCount);
    var disabledKeys = [].concat(formatTransferDisbaledKeys(candidateList, disabledKeys, allDataMap));
    disabledKeys = [].concat(formatParentDisabled(getTransferData(allDataMap), disabledKeys));
    this.setState({
      disabledKeys: disabledKeys
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _nextProps$selectedLi = nextProps.selectedList,
        selectedList = _nextProps$selectedLi === void 0 ? this.state.selectedList : _nextProps$selectedLi,
        allDataMap = nextProps.allDataMap,
        candidateList = nextProps.candidateList;
    var transferData = getTransferData(allDataMap);
    var _this$props8 = this.props,
        _this$props8$parentRe = _this$props8.parentRelationMap,
        parentRelationMap = _this$props8$parentRe === void 0 ? transferData.parentRelationMap : _this$props8$parentRe,
        _this$props8$children = _this$props8.childrenRelationMap,
        childrenRelationMap = _this$props8$children === void 0 ? transferData.childrenRelationMap : _this$props8$children;
    var candidateTotalCount = transferData.candidateTotalCount;
    this.allDataMapFactory(selectedList, allDataMap, parentRelationMap, childrenRelationMap, candidateTotalCount);

    if (isDisabledKeysChange(allDataMap, this.state.disabledKeys) || !isAllDataMapEqual(this.state.allDataMap, nextProps.allDataMap)) {
      var disabledKeys = [].concat(formatTransferDisbaledKeys(candidateList, disabledKeys, nextProps.allDataMap));
      disabledKeys = [].concat(formatParentDisabled(getTransferData(nextProps.allDataMap), disabledKeys));
      this.setState({
        disabledKeys: disabledKeys
      });
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var candidateTotalCount = this.state.candidateTotalCount;
    var allDataMap = this.state.allDataMap;
    var _this$props9 = this.props,
        _this$props9$selected = _this$props9.selectedList,
        selectedList = _this$props9$selected === void 0 ? this.state.selectedList : _this$props9$selected,
        candidateList = _this$props9.candidateList,
        _this$props9$parentRe = _this$props9.parentRelationMap,
        parentRelationMap = _this$props9$parentRe === void 0 ? this.state.parentRelationMap : _this$props9$parentRe,
        _this$props9$children = _this$props9.childrenRelationMap,
        childrenRelationMap = _this$props9$children === void 0 ? this.state.childrenRelationMap : _this$props9$children,
        searchValue = _this$props9.searchValue,
        treeName = _this$props9.treeName,
        className = _this$props9.className,
        candidateTreeStyle = _this$props9.candidateTreeStyle,
        selectedTreeStyle = _this$props9.selectedTreeStyle,
        maxSelectedNum = _this$props9.maxSelectedNum,
        showSelectedNum = _this$props9.showSelectedNum,
        CandidateTitleRender = _this$props9.CandidateTitleRender,
        showCandidateFooter = _this$props9.showCandidateFooter,
        SelectedTitleRender = _this$props9.SelectedTitleRender,
        _this$props9$expanded = _this$props9.expandedSelectedKeys,
        expandedSelectedKeys = _this$props9$expanded === void 0 ? this.state.expandedSelectedKeys : _this$props9$expanded,
        showSearchBox = _this$props9.showSearchBox,
        candidateFooterProps = _this$props9.candidateFooterProps,
        showCandidateNum = _this$props9.showCandidateNum,
        levelOptions = _this$props9.levelOptions,
        handleLevelChange = _this$props9.handleLevelChange,
        CandidateFooterRender = _this$props9.CandidateFooterRender,
        SearchBoxRender = _this$props9.SearchBoxRender,
        placeholder = _this$props9.placeholder,
        levelKey = _this$props9.levelKey,
        showSelectAll = _this$props9.showSelectAll,
        showDeleteAll = _this$props9.showDeleteAll,
        prefixCls = _this$props9.prefixCls,
        size = _this$props9.size,
        treePrefixCls = _this$props9.treePrefixCls,
        buttonPrefixCls = _this$props9.buttonPrefixCls,
        tooltipPrefixCls = _this$props9.tooltipPrefixCls;
    var selectedLength = selectedList.length;
    var candidateTreeUnSelectedCount = 0;

    if (showSelectAll && showCandidateNum) {
      var candidateLeafs = [];

      _.forEach(candidateList, function (id) {
        var leafs = _this2.findLeafNode(id, childrenRelationMap);

        var disabledKeys = _this2.state.disabledKeys;
        var disabled = disabledKeys.indexOf(id) !== -1;

        if (leafs.length > 0) {
          candidateLeafs = [].concat(candidateLeafs, leafs); // candidateTreeUnSelectedCount += _.without(leafs, ...selectedList).length;
        } else if (!disabled) {
          candidateLeafs.push(id);
        } // if (selectedList.indexOf(id) < 0) {
        //     candidateTreeUnSelectedCount += 1;
        // }

      });

      candidateTreeUnSelectedCount = _.without.apply(_, [candidateLeafs].concat(selectedList)).length;
    }

    var isShowLevelSelect = this.state.isShowLevelSelect && this.props.isShowLevelSelect;
    var searchBoxProps = {
      // value: searchValue,
      placeholder: placeholder || "\u8F93\u5165" + treeName + "\u540D\u79F0\u641C\u7D22",
      onSearch: this.handleSearch,
      onChange: this.onSearchChange,
      onFocus: this.searchBoxFocus,
      onBlur: this.searchBoxBlur,
      onClearClick: this.onSearchChange,
      size: size
    };

    if ('searchValue' in this.props) {
      searchBoxProps.value = searchValue;
    }

    var searchRenderProps = _extends({
      levelOptions: levelOptions,
      handleLevelChange: handleLevelChange,
      onSelectFocus: this.onSelectFocus,
      searchBoxProps: searchBoxProps,
      isShowLevelSelect: isShowLevelSelect,
      levelKey: levelKey
    }, this.props.searchRenderProps);

    var candidateTitleProps = {
      treeName: treeName,
      title: '可选',
      candidateTotalCount: candidateTotalCount,
      showCandidateNum: showCandidateNum,
      unSelectedNum: candidateTreeUnSelectedCount
    };
    var selectedTitleProps = {
      treeName: treeName,
      title: '已选',
      selectedNum: selectedLength,
      maxSelectedNum: maxSelectedNum,
      showSelectedNum: showSelectedNum
    };
    var candidateMainClass = classNames({
      'select-main': 1,
      'footer-and-search-select-main': showSearchBox && showCandidateFooter,
      'no-footer-and-search-select-main': showSearchBox && !showCandidateFooter,
      'no-footer-and-no-search-select-main': !showSearchBox && !showCandidateFooter,
      'footer-and-no-search-select-main': showCandidateFooter && !showSearchBox
    });
    var addOperationLinkClass = classNames({
      'operate-link': 1,
      'add-disable': maxSelectedNum && candidateTreeUnSelectedCount > maxSelectedNum - selectedLength || !candidateList.length,
      'display-none': !showSelectAll
    });
    var deleteOperationLinkClass = classNames({
      'operate-link': 1,
      'delete-disable': selectedLength <= 0,
      'display-none': !showDeleteAll
    }); // 计算已选叶子节点对应的根结点的集合

    var selectedRootKeys = _.uniq(selectedList.map(function (id) {
      return _this2.findRootKey(id, parentRelationMap);
    })); // todo 优化
    // 目前只支持三级，所以执行了两次getSelectParentMap,先计算父级节点，再计算祖父级节点


    var selectMap = this.getSelectParentMap(selectedList, {}, parentRelationMap);
    var selectedPathMap = this.getSelectParentMap(Object.keys(selectMap), selectMap, parentRelationMap);
    var selectAllParams = {
      allDataMap: allDataMap,
      candidateList: candidateList,
      childrenRelationMap: childrenRelationMap,
      parentRelationMap: parentRelationMap,
      maxSelectedNum: maxSelectedNum,
      selectedLength: selectedLength,
      candidateTreeUnSelectedCount: candidateTreeUnSelectedCount
    };
    var selectedTreeProps = {
      className: 'select-main select-right',
      onExpand: this.handleSelectedExpand,
      expandedKeys: expandedSelectedKeys.map(function (key) {
        return String(key);
      }),
      prefixCls: treePrefixCls
    };
    var transferClassName = classNames("" + prefixCls, prefixCls + "-" + size, "" + className);
    return React.createElement("div", {
      className: transferClassName
    }, React.createElement("div", {
      className: "select",
      style: candidateTreeStyle,
      ref: this.leftSelectPanel
    }, React.createElement("div", {
      className: "select-title"
    }, React.createElement(CandidateTitleRender, candidateTitleProps), maxSelectedNum && candidateTreeUnSelectedCount > maxSelectedNum - selectedLength ? React.createElement(Tooltip, {
      title: "\u53EF\u9009" + treeName + "\u6570\u91CF\u8D85\u8FC7\u53EF\u6DFB\u52A0\u6570\u91CF\u7684\u4E0A\u9650\uFF0C\u65E0\u6CD5\u6267\u884C\u5168\u90E8\u6DFB\u52A0",
      placement: "rightBottom",
      prefixCls: tooltipPrefixCls
    }, React.createElement("a", {
      className: addOperationLinkClass
    }, "\u5168\u9009")) : React.createElement(Button, {
      type: "link",
      size: size,
      className: addOperationLinkClass,
      disabled: maxSelectedNum && candidateTreeUnSelectedCount > maxSelectedNum - selectedLength,
      onClick: _.partial(this.handleSelectAll, selectAllParams),
      prefixCls: buttonPrefixCls
    }, "\u5168\u9009")), showSearchBox ? React.createElement(SearchBoxRender, searchRenderProps) : null, React.createElement("div", {
      className: candidateMainClass
    }, this.renderCandidateTree(), showCandidateFooter ? React.createElement(CandidateFooterRender, _extends({
      treeName: treeName,
      candidateFooterProps: candidateFooterProps
    }, {
      size: size
    })) : null)), React.createElement("div", {
      className: "select",
      style: selectedTreeStyle
    }, React.createElement("div", {
      className: "select-title"
    }, React.createElement(SelectedTitleRender, selectedTitleProps), React.createElement(Button, {
      className: deleteOperationLinkClass,
      onClick: this.handleDeleteAll,
      type: "link",
      disabled: selectedLength <= 0,
      size: size,
      prefixCls: buttonPrefixCls
    }, "\u6E05\u7A7A")), React.createElement(Tree, selectedTreeProps, this.renderSelectedTreeNodes(selectedRootKeys, selectedPathMap))));
  };

  return Transfer;
}(Component);

_defineProperty(Transfer, "propTypes", {
  // dataSource: PropTypes.object, // 【必填项】 所有项平铺，每项包括(key, title, children)

  /** 左侧候选的树节点，注意多层树的话只包含顶层节点即可，筛选可根据修改此字段实现【必填项 受控】 */
  candidateList: PropTypes.array,

  /** 右侧已选中的树节点，注意这里只包含叶子节点即可【选填 受控】 */
  selectedList: PropTypes.array,

  /** 整个穿梭框的资源信息【必填 受控】
   * 示例：
   * {
   *   [key]: {
   *      key: 1,
   *      title: '计划1'
   *   },
   *   ...
   * }
   * */
  allDataMap: PropTypes.object,

  /** 右侧已选树的展开节点【选填 受控】 */
  expandedSelectedKeys: PropTypes.array,

  /** 子节点到父节点的映射关系，通常不用传，组件内部会计算【选填 受控】 */
  parentRelationMap: PropTypes.object,

  /** 父节点到子节点的映射关系，通常不用传，组件内部会计算【选填 受控】 */
  childrenRelationMap: PropTypes.object,

  /** 左侧候选树节点单个选择回调，回调参数(selectedList, allDataMap, expandedSelectedKeys)【选填】 */
  handleSelect: PropTypes.func,

  /** 全选回调，回调参数(selectedList, allDataMap, expandedSelectedKeys)【选填】 */
  handleSelectAll: PropTypes.func,

  /** 右侧已选树单个删除回调，回调参数(selectedList, allDataMap)【选填】 */
  handleDelete: PropTypes.func,

  /** 右侧已选树全部删除回调，回调参数(selectedList, allDataMap, expandedSelectedKeys) 【选填】 */
  handleDeleteAll: PropTypes.func,

  /** 右侧已选树展开/收起时触发，回调参数(expandedSelectedKeys) 【选填】 */
  handleSelectedExpand: PropTypes.func,

  /** 左侧候选树展开/收起时触发，回调参数(expandedKeys, {expanded: bool, node})【选填】 */
  handleCandidateExpand: PropTypes.func,

  /** 穿梭框名字【选填】 */
  treeName: PropTypes.string,
  placeholder: PropTypes.string,

  /** 自定义类名【选填】 */
  className: PropTypes.string,

  /** 自定义左侧树样式【选填】 */
  candidateTreeStyle: PropTypes.object,

  /** 自定义右侧树样式【选填】 */
  selectedTreeStyle: PropTypes.object,

  /** 是否展示可选项数目，默认为true【选填】 */
  showCandidateNum: PropTypes.bool,

  /** 是否显示已选数目，默认为true【选填】 */
  showSelectedNum: PropTypes.bool,

  /** 已选节点上限，不传则无上限【选填】 */
  maxSelectedNum: PropTypes.number,

  /** 自定义候选树头部标题render【选填】 */
  CandidateTitleRender: PropTypes.func,

  /** 自定义已选树头部标题render【选填】 */
  SelectedTitleRender: PropTypes.func,

  /** 自定义候选项格式，可实现多列选择器【选填】 */
  CandidateItem: PropTypes.func,

  /** 自定义候选项的props，在传CandidateItem时生效【选填】 */
  candidateItemProps: PropTypes.object,

  /** 自定义已选项格式，可实现多列选择器【选填】 */
  SelectedItem: PropTypes.func,

  /** 自定义已选项的props，在传SelectedItem时生效【选填】 */
  selectedItemProps: PropTypes.object,

  /** 自定义搜索筛选render【选填】 */
  SearchBoxRender: PropTypes.func,

  /** 自定义搜索筛选props【选填】 */
  searchRenderProps: PropTypes.object,

  /** 是否显示搜索框，默认为true【选填】 */
  showSearchBox: PropTypes.bool,

  /** 搜索框搜索回调【选填】 */
  handleSearch: PropTypes.func,

  /** 搜索框的值【选填】 */
  searchValue: PropTypes.string,

  /** 搜索框输入回调【选填】 */
  onSearchChange: PropTypes.func,

  /** 是否显示层级信息，默认为false【选填】 */
  isShowLevel: PropTypes.bool,

  /** 层级信息配置，isShowLevelSelect为true时生效【选填】 */
  levelOptions: PropTypes.array,

  /** 层级切换回调，参数同Select组件【选填】 */
  handleLevelChange: PropTypes.func,

  /** 是否启用层级选择筛选，默认为true【选填】 */
  isShowLevelSelect: PropTypes.bool,
  onSearchBoxFocus: PropTypes.func,
  onSearchBoxBlur: PropTypes.func,
  levelKey: PropTypes.string,

  /** 是否展示新建按钮【选填】 */
  showCandidateFooter: PropTypes.bool,

  /** 新建按钮自定义props【选填】 */
  candidateFooterProps: PropTypes.object,

  /** 自定义footer【选填】 */
  CandidateFooterRender: PropTypes.func,
  showSelectAll: PropTypes.bool,
  showDeleteAll: PropTypes.bool,
  readOnly: PropTypes.bool,
  prefixCls: PropTypes.string,

  /**
   * transfer的尺寸
   */
  size: PropTypes.oneOf(['small', 'medium']),
  treePrefixCls: PropTypes.string,
  buttonPrefixCls: PropTypes.string,
  checkboxPrefixCls: PropTypes.string,
  tooltipPrefixCls: PropTypes.string
});

_defineProperty(Transfer, "defaultProps", {
  // dataSource: {},
  selectedList: undefined,
  candidateList: [],
  allDataMap: undefined,
  parentRelationMap: undefined,
  childrenRelationMap: undefined,
  // searchValue: '',
  treeName: '',
  placeholder: '',
  className: '',
  candidateTreeStyle: {},
  selectedTreeStyle: {},
  maxSelectedNum: null,
  CandidateTitleRender: CommonTitleRender,
  showCandidateFooter: false,
  SelectedTitleRender: CommonTitleRender,
  CandidateItem: CommonItemRender,
  candidateItemProps: {},
  SelectedItem: CommonItemRender,
  selectedItemProps: {},
  showSelectedNum: true,
  showSearchBox: true,
  expandedSelectedKeys: undefined,
  candidateFooterProps: {},
  isShowLevel: false,
  showCandidateNum: true,
  SearchBoxRender: CommonSearchRender,
  CandidateFooterRender: CommonFooterRender,
  handleSelect: function handleSelect() {},
  handleSelectAll: function handleSelectAll() {},
  handleDelete: function handleDelete() {},
  handleDeleteAll: function handleDeleteAll() {},
  handleSearch: function handleSearch() {},
  onSearchChange: function onSearchChange() {},
  handleSelectedExpand: function handleSelectedExpand() {},
  handleCandidateExpand: function handleCandidateExpand() {},
  levelOptions: null,
  handleLevelChange: function handleLevelChange() {},
  isShowLevelSelect: false,
  searchRenderProps: {},
  onSearchBoxFocus: function onSearchBoxFocus() {},
  onSearchBoxBlur: function onSearchBoxBlur() {},
  levelKey: null,
  showSelectAll: true,
  showDeleteAll: true,
  readOnly: false,
  prefixCls: 'new-fc-one-transfer',
  size: 'small',
  treePrefixCls: 'new-fc-one-tree',
  buttonPrefixCls: 'new-fc-one-btn',
  checkboxPrefixCls: 'new-fc-one-checkbox',
  tooltipPrefixCls: 'new-fc-one-tooltip'
});

export { Transfer as default };