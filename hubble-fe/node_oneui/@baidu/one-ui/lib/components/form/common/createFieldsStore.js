"use strict";

exports.__esModule = true;
exports["default"] = createFieldsStore;

var _set = _interopRequireDefault(require("lodash/set"));

var _createFormField = _interopRequireWildcard(require("./createFormField"));

var _formTools = require("../../../core/formTools");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

function internalFlattenFields(fields) {
  return (0, _formTools.flattenFields)(fields, function (_, node) {
    return (0, _createFormField.isFormField)(node);
  }, 'You must wrap field data with `createFormField`.');
}

var FieldsStore =
/*#__PURE__*/
function () {
  function FieldsStore(_fields) {
    var _this = this;

    _defineProperty(this, "setFieldsInitialValue", function (initialValues) {
      var flattenedInitialValues = _this.flattenRegisteredFields(initialValues);

      var fieldsMeta = _this.fieldsMeta;
      Object.keys(flattenedInitialValues).forEach(function (name) {
        if (fieldsMeta[name]) {
          _this.setFieldMeta(name, _extends({}, _this.getFieldMeta(name), {
            initialValue: flattenedInitialValues[name]
          }));
        }
      });
    });

    _defineProperty(this, "getAllValues", function () {
      var fieldsMeta = _this.fieldsMeta,
          fields = _this.fields;
      return Object.keys(fieldsMeta).reduce(function (acc, name) {
        return (0, _set["default"])(acc, name, _this.getValueFromFields(name, fields));
      }, {});
    });

    _defineProperty(this, "getFieldsValue", function (names) {
      return _this.getNestedFields(names, _this.getFieldValue);
    });

    _defineProperty(this, "getFieldValue", function (name) {
      var fields = _this.fields;
      return _this.getNestedField(name, function (fullName) {
        return _this.getValueFromFields(fullName, fields);
      });
    });

    _defineProperty(this, "getFieldsError", function (names) {
      return _this.getNestedFields(names, _this.getFieldError);
    });

    _defineProperty(this, "getFieldError", function (name) {
      return _this.getNestedField(name, function (fullName) {
        return (0, _formTools.getErrorStrs)(_this.getFieldMember(fullName, 'errors'));
      });
    });

    _defineProperty(this, "isFieldValidating", function (name) {
      return _this.getFieldMember(name, 'validating');
    });

    _defineProperty(this, "isFieldsValidating", function (ns) {
      var names = ns || _this.getValidFieldsName();

      return names.some(function (n) {
        return _this.isFieldValidating(n);
      });
    });

    _defineProperty(this, "isFieldTouched", function (name) {
      return _this.getFieldMember(name, 'touched');
    });

    _defineProperty(this, "isFieldsTouched", function (ns) {
      var names = ns || _this.getValidFieldsName();

      return names.some(function (n) {
        return _this.isFieldTouched(n);
      });
    });

    this.fields = internalFlattenFields(_fields);
    this.fieldsMeta = {};
  }

  var _proto = FieldsStore.prototype;

  _proto.updateFields = function updateFields(fields) {
    this.fields = internalFlattenFields(fields);
  };

  _proto.flattenRegisteredFields = function flattenRegisteredFields(fields) {
    var validFieldsName = this.getAllFieldsName();
    return (0, _formTools.flattenFields)(fields, function (path) {
      return validFieldsName.indexOf(path) >= 0;
    }, 'You cannot set a form field before rendering a field associated with the value.');
  };

  _proto.setFields = function setFields(fields) {
    var _this2 = this;

    var fieldsMeta = this.fieldsMeta;

    var nowFields = _extends({}, this.fields, fields);

    var nowValues = {};
    Object.keys(fieldsMeta).forEach(function (f) {
      nowValues[f] = _this2.getValueFromFields(f, nowFields);
    });
    Object.keys(nowValues).forEach(function (f) {
      var value = nowValues[f];

      var fieldMeta = _this2.getFieldMeta(f);

      if (fieldMeta && fieldMeta.normalize) {
        var nowValue = fieldMeta.normalize(value, _this2.getValueFromFields(f, _this2.fields), nowValues);

        if (nowValue !== value) {
          nowFields[f] = _extends({}, nowFields[f], {
            value: nowValue
          });
        }
      }
    });
    this.fields = nowFields;
  };

  _proto.resetFields = function resetFields(ns) {
    var fields = this.fields;
    var names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName();
    return names.reduce(function (acc, name) {
      var field = fields[name];

      if (field && 'value' in field) {
        acc[name] = {};
      }

      return acc;
    }, {});
  };

  _proto.setFieldMeta = function setFieldMeta(name, meta) {
    this.fieldsMeta[name] = meta;
  };

  _proto.setFieldsAsDirty = function setFieldsAsDirty() {
    var _this3 = this;

    Object.keys(this.fields).forEach(function (name) {
      var field = _this3.fields[name];
      var fieldMeta = _this3.fieldsMeta[name];

      if (field && fieldMeta && (0, _formTools.hasRules)(fieldMeta.validate)) {
        _this3.fields[name] = _extends({}, field, {
          dirty: true
        });
      }
    });
  };

  _proto.getFieldMeta = function getFieldMeta(name) {
    this.fieldsMeta[name] = this.fieldsMeta[name] || {};
    return this.fieldsMeta[name];
  };

  _proto.getValueFromFields = function getValueFromFields(name, fields) {
    var field = fields[name];

    if (field && 'value' in field) {
      return field.value;
    }

    var fieldMeta = this.getFieldMeta(name);
    return fieldMeta && fieldMeta.initialValue;
  };

  _proto.getValidFieldsName = function getValidFieldsName() {
    var _this4 = this;

    var fieldsMeta = this.fieldsMeta;
    return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
      return !_this4.getFieldMeta(name).hidden;
    }) : [];
  };

  _proto.getAllFieldsName = function getAllFieldsName() {
    var fieldsMeta = this.fieldsMeta;
    return fieldsMeta ? Object.keys(fieldsMeta) : [];
  };

  _proto.getValidFieldsFullName = function getValidFieldsFullName(maybePartialName) {
    var maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [maybePartialName];
    return this.getValidFieldsName().filter(function (fullName) {
      return maybePartialNames.some(function (partialName) {
        return fullName === partialName || (0, _formTools.startsWith)(fullName, partialName) && ['.', '['].indexOf(fullName[partialName.length]) >= 0;
      });
    });
  };

  _proto.getFieldValuePropValue = function getFieldValuePropValue(fieldMeta) {
    var _ref;

    var name = fieldMeta.name,
        getValueProps = fieldMeta.getValueProps,
        valuePropName = fieldMeta.valuePropName;
    var field = this.getField(name);
    var fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;

    if (getValueProps) {
      return getValueProps(fieldValue);
    }

    return _ref = {}, _ref[valuePropName] = fieldValue, _ref;
  };

  _proto.getField = function getField(name) {
    return _extends({}, this.fields[name], {
      name: name
    });
  };

  _proto.getNotCollectedFields = function getNotCollectedFields() {
    var _this5 = this;

    var fieldsName = this.getValidFieldsName();
    return fieldsName.filter(function (name) {
      return !_this5.fields[name];
    }).map(function (name) {
      return {
        name: name,
        dirty: false,
        value: _this5.getFieldMeta(name).initialValue
      };
    }).reduce(function (acc, field) {
      return (0, _set["default"])(acc, field.name, (0, _createFormField["default"])(field));
    }, {});
  };

  _proto.getNestedAllFields = function getNestedAllFields() {
    var _this6 = this;

    return Object.keys(this.fields).reduce(function (acc, name) {
      return (0, _set["default"])(acc, name, (0, _createFormField["default"])(_this6.fields[name]));
    }, this.getNotCollectedFields());
  };

  _proto.getFieldMember = function getFieldMember(name, member) {
    return this.getField(name)[member];
  };

  _proto.getNestedFields = function getNestedFields(names, getter) {
    var fields = names || this.getValidFieldsName();
    return fields.reduce(function (acc, f) {
      return (0, _set["default"])(acc, f, getter(f));
    }, {});
  };

  _proto.getNestedField = function getNestedField(name, getter) {
    var fullNames = this.getValidFieldsFullName(name);

    if (fullNames.length === 0 || fullNames.length === 1 && fullNames[0] === name // Name already is full name.
    ) {
        return getter(name);
      }

    var isArrayValue = fullNames[0][name.length] === '[';
    var suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
    return fullNames.reduce(function (acc, fullName) {
      return (0, _set["default"])(acc, fullName.slice(suffixNameStartIndex), getter(fullName));
    }, isArrayValue ? [] : {});
  };

  // @private
  // BG: `a` and `a.b` cannot be use in the same form
  _proto.isValidNestedFieldName = function isValidNestedFieldName(name) {
    var names = this.getAllFieldsName();
    return names.every(function (n) {
      return !partOf(n, name) && !partOf(name, n);
    });
  };

  _proto.clearField = function clearField(name) {
    delete this.fields[name];
    delete this.fieldsMeta[name];
  };

  return FieldsStore;
}();

function createFieldsStore(fields) {
  return new FieldsStore(fields);
}

module.exports = exports.default;