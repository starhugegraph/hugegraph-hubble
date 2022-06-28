function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
}

export function argumentContainer(Container, WrappedComponent) {
  /* eslint no-param-reassign:0 */
  Container.displayName = "Form(" + getDisplayName(WrappedComponent) + ")";
  Container.WrappedComponent = WrappedComponent;
  return hoistStatics(Container, WrappedComponent);
}
export function identity(obj) {
  return obj;
}
export function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}
export function treeTraverse(path, tree, isLeafNode, errorMessage, callback) {
  if (path === void 0) {
    path = '';
  }

  if (isLeafNode(path, tree)) {
    callback(path, tree);
  } else if (tree === undefined || tree === null) {// Do nothing
  } else if (Array.isArray(tree)) {
    tree.forEach(function (subTree, index) {
      return treeTraverse(path + "[" + index + "]", subTree, isLeafNode, errorMessage, callback);
    });
  } else {
    // It's object and not a leaf node
    if (typeof tree !== 'object') {
      return;
    }

    Object.keys(tree).forEach(function (subTreeKey) {
      var subTree = tree[subTreeKey];
      treeTraverse("" + path + (path ? '.' : '') + subTreeKey, subTree, isLeafNode, errorMessage, callback);
    });
  }
}
export function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
  var fields = {};
  treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, function (path, node) {
    fields[path] = node;
  });
  return fields;
}
export function normalizeValidateRules(validate, rules, validateTrigger) {
  var validateRules = validate.map(function (item) {
    var newItem = _extends({}, item, {
      trigger: item.trigger || []
    });

    if (typeof newItem.trigger === 'string') {
      newItem.trigger = [newItem.trigger];
    }

    return newItem;
  });

  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? [].concat(validateTrigger) : [],
      rules: rules
    });
  }

  return validateRules;
}
export function getValidateTriggers(validateRules) {
  return validateRules.filter(function (item) {
    return !!item.rules && item.rules.length;
  }).map(function (item) {
    return item.trigger;
  }).reduce(function (pre, curr) {
    return pre.concat(curr);
  }, []);
}
export function getValueFromEvent(e) {
  // input
  if (e && e.event && e.event.target && (e.event.target.dataset.type === 'input' || e.event.target.dataset.type === 'textarea')) {
    return e.value;
  } // To support custom element


  if (!e || !e.target) {
    return e;
  }

  var target = e.target;
  return target.type === 'checkbox' ? target.checked : target.value;
}
export function getErrorStrs(errors) {
  if (errors) {
    return errors.map(function (e) {
      if (e && e.message) {
        return e.message;
      }

      return e;
    });
  }

  return errors;
}
export function getParams(ns, opt, cb) {
  var names = ns;
  var options = opt;
  var callback = cb;

  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
    } else {
      callback = options;
      options = names || {};
      names = undefined;
    }
  }

  return {
    names: names,
    options: options,
    callback: callback
  };
}
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
export function hasRules(validate) {
  if (validate) {
    return validate.some(function (item) {
      return item.rules && item.rules.length;
    });
  }

  return false;
}
export function startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}