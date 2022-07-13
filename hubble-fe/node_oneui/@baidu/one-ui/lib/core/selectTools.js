"use strict";

exports.__esModule = true;
exports.toTitle = toTitle;
exports.getValuePropValue = getValuePropValue;
exports.getPropValue = getPropValue;
exports.isMultiple = isMultiple;
exports.isCombobox = isCombobox;
exports.isMultipleOrTags = isMultipleOrTags;
exports.isMultipleOrTagsOrCombobox = isMultipleOrTagsOrCombobox;
exports.isSingleMode = isSingleMode;
exports.toArray = toArray;
exports.getMapKey = getMapKey;
exports.preventDefaultEvent = preventDefaultEvent;
exports.findIndexInValueBySingleValue = findIndexInValueBySingleValue;
exports.getLabelFromPropsValue = getLabelFromPropsValue;
exports.getSelectKeys = getSelectKeys;
exports.findFirstMenuItem = findFirstMenuItem;
exports.includesSeparators = includesSeparators;
exports.splitBySeparators = splitBySeparators;
exports.defaultFilterFn = defaultFilterFn;
exports.validateOptionValue = validateOptionValue;
exports.saveRef = saveRef;
exports.getMultipleCheckboxLabel = exports.UNSELECTABLE_ATTRIBUTE = exports.UNSELECTABLE_STYLE = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 下拉选择工具方法
 */
function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }

  return null;
}

function getValuePropValue(child) {
  if (!child) {
    return null;
  }

  var props = child.props;

  if ('value' in props) {
    return props.value;
  }

  if (child.key) {
    return child.key;
  }

  if (child.type && child.type.isSelectOptGroup && props.label) {
    return props.label;
  }

  throw new Error("Need at least a key or a value or a label (only for OptGroup) for " + child);
}

function getPropValue(child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }

  return child.props[prop];
}

function isMultiple(props) {
  return props.multiple;
}

function isCombobox(props) {
  return props.combobox;
}

function isMultipleOrTags(props) {
  return props.multiple || props.tags;
}

function isMultipleOrTagsOrCombobox(props) {
  return isMultipleOrTags(props) || isCombobox(props);
}

function isSingleMode(props) {
  return !isMultipleOrTagsOrCombobox(props);
}

function toArray(value) {
  var ret = value;

  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }

  return ret;
}

function getMapKey(value) {
  return typeof value + "-" + value;
}

function preventDefaultEvent(e) {
  e.preventDefault();
}

function findIndexInValueBySingleValue(value, singleValue) {
  var index = -1;

  for (var i = 0; i < value.length; i++) {
    if (value[i] === singleValue) {
      index = i;
      break;
    }
  }

  return index;
}

function getLabelFromPropsValue(value, key) {
  var label;
  value = toArray(value);

  for (var i = 0; i < value.length; i++) {
    if (value[i].key === key) {
      label = value[i].label;
      break;
    }
  }

  return label;
}

function getSelectKeys(menuItems, value) {
  if (value === null || value === undefined) {
    return [];
  }

  var selectedKeys = [];

  _react["default"].Children.forEach(menuItems, function (item) {
    if (item.type.isMenuItemGroup) {
      selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
    } else {
      var itemValue = getValuePropValue(item);
      var itemKey = item.key;

      if (findIndexInValueBySingleValue(value, itemValue) !== -1 && itemKey) {
        selectedKeys.push(itemKey);
      }
    }
  });

  return selectedKeys;
}

var UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};
exports.UNSELECTABLE_STYLE = UNSELECTABLE_STYLE;
var UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'on'
};
exports.UNSELECTABLE_ATTRIBUTE = UNSELECTABLE_ATTRIBUTE;

function findFirstMenuItem(children) {
  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    if (child.type.isMenuItemGroup) {
      var found = findFirstMenuItem(child.props.children);

      if (found) {
        return found;
      }
    } else if (!child.props.disabled) {
      return child;
    }
  }

  return null;
}

function includesSeparators(string, separators) {
  for (var i = 0; i < separators.length; ++i) {
    if (string.lastIndexOf(separators[i]) > 0) {
      return true;
    }
  }

  return false;
}

function splitBySeparators(string, separators) {
  var reg = new RegExp("[" + separators.join() + "]");
  return string.split(reg).filter(function (token) {
    return token;
  });
}

function defaultFilterFn(input, child) {
  if (child.props.disabled) {
    return false;
  }

  var value = toArray(getPropValue(child, this.props.optionFilterProp)).join('');
  return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}

function validateOptionValue(value, props) {
  if (isSingleMode(props) || isMultiple(props)) {
    return;
  }

  if (typeof value !== 'string') {
    throw new Error("Invalid `value` of type `" + typeof value + "` supplied to Option, ");
  }
}

function saveRef(instance, name) {
  return function (node) {
    instance[name] = node;
  };
}

var getMultipleCheckboxLabel = function getMultipleCheckboxLabel(option) {
  if (option && option.type && option.type.isCheckboxText) {
    return option.props && option.props.label;
  }

  return option;
};

exports.getMultipleCheckboxLabel = getMultipleCheckboxLabel;