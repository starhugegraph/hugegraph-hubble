function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/prefer-es6-class */

/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import createReactClass from 'create-react-class';
import AsyncValidator from 'async-validator';
import get from 'lodash/get';
import set from 'lodash/set';
import eq from 'lodash/eq';
import createFieldsStore from './createFieldsStore';
import { argumentContainer, identity, normalizeValidateRules, getValidateTriggers, getValueFromEvent, hasRules, getParams, isEmptyObject, flattenArray } from '../../../core/formTools';
var DEFAULT_TRIGGER = 'onChange';

var createBaseForm = function createBaseForm(option, mixins) {
  if (option === void 0) {
    option = {};
  }

  if (mixins === void 0) {
    mixins = [];
  }

  var _option = option,
      validateMessages = _option.validateMessages,
      onFieldsChange = _option.onFieldsChange,
      onValuesChange = _option.onValuesChange,
      _option$mapProps = _option.mapProps,
      mapProps = _option$mapProps === void 0 ? identity : _option$mapProps,
      mapPropsToFields = _option.mapPropsToFields,
      fieldNameProp = _option.fieldNameProp,
      fieldMetaProp = _option.fieldMetaProp,
      fieldDataProp = _option.fieldDataProp,
      _option$formPropName = _option.formPropName,
      formPropName = _option$formPropName === void 0 ? 'form' : _option$formPropName,
      formName = _option.name,
      _option$size = _option.size,
      size = _option$size === void 0 ? 'medium' : _option$size;
  return function (WrappedComponent) {
    var Form = createReactClass({
      displayName: "Form",
      mixins: mixins,
      getInitialState: function getInitialState() {
        var _this = this;

        var fields = mapPropsToFields && mapPropsToFields(this.props);
        this.fieldsStore = createFieldsStore(fields || {});
        this.instances = {};
        this.cachedBind = {};
        this.clearedFieldMetaCache = {};
        this.renderFields = {};
        this.domFields = {};
        ['getFieldsValue', 'getFieldValue', 'setFieldsInitialValue', 'getFieldsError', 'getFieldError', 'isFieldValidating', 'isFieldsValidating', 'isFieldsTouched', 'isFieldTouched'].forEach(function (key) {
          _this[key] = function () {
            var _this$fieldsStore;

            return (_this$fieldsStore = _this.fieldsStore)[key].apply(_this$fieldsStore, arguments);
          };
        });
        return {
          submitting: false
        };
      },
      componentDidMount: function componentDidMount() {
        this.cleanUpUselessFields();
      },
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (mapPropsToFields) {
          this.fieldsStore.updateFields(mapPropsToFields(nextProps));
        }
      },
      componentDidUpdate: function componentDidUpdate() {
        this.cleanUpUselessFields();
      },
      cleanUpUselessFields: function cleanUpUselessFields() {
        var _this2 = this;

        var fieldList = this.fieldsStore.getAllFieldsName();
        var removedList = fieldList.filter(function (field) {
          var fieldMeta = _this2.fieldsStore.getFieldMeta(field);

          return !_this2.renderFields[field] && !_this2.domFields[field] && !fieldMeta.preserve;
        });

        if (removedList.length) {
          removedList.forEach(this.clearField);
        }

        this.renderFields = {};
      },
      onCollectCommon: function onCollectCommon(name, action, args) {
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if (fieldMeta[action]) {
          fieldMeta[action].apply(fieldMeta, args);
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          var _fieldMeta$originalPr;

          (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(_fieldMeta$originalPr, args);
        }

        var value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(fieldMeta, args) : getValueFromEvent.apply(void 0, args);

        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
          var _extends2;

          var valuesAll = this.fieldsStore.getAllValues();
          var valuesAllSet = {};
          valuesAll[name] = value;
          Object.keys(valuesAll).forEach(function (key) {
            return set(valuesAllSet, key, valuesAll[key]);
          });
          onValuesChange(_extends((_extends2 = {}, _extends2[formPropName] = this.getForm(), _extends2), this.props), set({}, name, value), valuesAllSet);
        }

        var field = this.fieldsStore.getField(name);
        return {
          name: name,
          field: _extends({}, field, {
            value: value,
            touched: true
          }),
          fieldMeta: fieldMeta
        };
      },
      onCollect: function onCollect(nameCurrent, action) {
        var _this$setFields;

        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var _this$onCollectCommon = this.onCollectCommon(nameCurrent, action, args),
            name = _this$onCollectCommon.name,
            field = _this$onCollectCommon.field,
            fieldMeta = _this$onCollectCommon.fieldMeta;

        var validate = fieldMeta.validate;
        this.fieldsStore.setFieldsAsDirty();

        var newField = _extends({}, field, {
          dirty: hasRules(validate)
        });

        this.setFields((_this$setFields = {}, _this$setFields[name] = newField, _this$setFields));
      },
      onCollectValidate: function onCollectValidate(nameCurrent, action) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var _this$onCollectCommon2 = this.onCollectCommon(nameCurrent, action, args),
            field = _this$onCollectCommon2.field,
            fieldMeta = _this$onCollectCommon2.fieldMeta;

        var newField = _extends({}, field, {
          dirty: true
        });

        this.fieldsStore.setFieldsAsDirty();
        this.validateFieldsInternal([newField], {
          action: action,
          options: {
            firstFields: !!fieldMeta.validateFirst
          }
        });
      },
      getCacheBind: function getCacheBind(name, action, fn) {
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }

        var cache = this.cachedBind[name];

        if (!cache[action] || cache[action].oriFn !== fn) {
          cache[action] = {
            fn: fn.bind(this, name, action),
            oriFn: fn
          };
        }

        return cache[action].fn;
      },
      getFieldDecorator: function getFieldDecorator(name, fieldOption) {
        var _this3 = this;

        var props = this.getFieldProps(name, fieldOption);
        return function (fieldElem) {
          _this3.renderFields[name] = true;

          var fieldMeta = _this3.fieldsStore.getFieldMeta(name);

          var originalProps = fieldElem.props;
          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;
          return React.cloneElement(fieldElem, _extends({
            size: size
          }, props, _this3.fieldsStore.getFieldValuePropValue(fieldMeta)));
        };
      },
      getFieldProps: function getFieldProps(name, usersFieldOption) {
        var _this4 = this;

        if (usersFieldOption === void 0) {
          usersFieldOption = {};
        }

        if (!name) {
          throw new Error('Must call `getFieldProps` with valid name string!');
        }

        delete this.clearedFieldMetaCache[name];

        var fieldOption = _extends({
          name: name,
          trigger: DEFAULT_TRIGGER,
          valuePropName: 'value',
          validate: []
        }, usersFieldOption);

        var rules = fieldOption.rules,
            trigger = fieldOption.trigger,
            _fieldOption$validate = fieldOption.validateTrigger,
            validateTrigger = _fieldOption$validate === void 0 ? trigger : _fieldOption$validate,
            validate = fieldOption.validate;
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if ('initialValue' in fieldOption) {
          fieldMeta.initialValue = fieldOption.initialValue;
        }

        var inputProps = _extends({}, this.fieldsStore.getFieldValuePropValue(fieldOption), {
          ref: this.getCacheBind(name, name + "__ref", this.saveRef)
        });

        if (fieldNameProp) {
          inputProps[fieldNameProp] = formName ? formName + "_" + name : name;
        }

        var validateRules = normalizeValidateRules(validate, rules, validateTrigger);
        var validateTriggers = getValidateTriggers(validateRules);
        validateTriggers.forEach(function (action) {
          if (inputProps[action]) {
            return;
          }

          inputProps[action] = _this4.getCacheBind(name, action, _this4.onCollectValidate);
        }); // make sure that the value will be collect

        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        var meta = _extends({}, fieldMeta, fieldOption, {
          validate: validateRules
        });

        this.fieldsStore.setFieldMeta(name, meta);

        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        } // This field is rendered, record it


        this.renderFields[name] = true;
        return inputProps;
      },
      getFieldInstance: function getFieldInstance(name) {
        return this.instances[name];
      },
      getRules: function getRules(fieldMeta, action) {
        var actionRules = fieldMeta.validate.filter(function (item) {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map(function (item) {
          return item.rules;
        });
        return flattenArray(actionRules);
      },
      setFields: function setFields(maybeNestedFields, callback) {
        var _this5 = this;

        var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        this.fieldsStore.setFields(fields);

        if (onFieldsChange) {
          var _extends3;

          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return set(acc, name, _this5.fieldsStore.getField(name));
          }, {});
          onFieldsChange(_extends((_extends3 = {}, _extends3[formPropName] = this.getForm(), _extends3), this.props), changedFields, this.fieldsStore.getNestedAllFields());
        }

        this.forceUpdate(callback);
      },
      setFieldsValue: function setFieldsValue(changedValues, callback) {
        var fieldsMeta = this.fieldsStore.fieldsMeta;
        var values = this.fieldsStore.flattenRegisteredFields(changedValues);
        var newFields = Object.keys(values).reduce(function (acc, name) {
          var isRegistered = fieldsMeta[name];

          if (isRegistered) {
            var value = values[name];
            acc[name] = {
              value: value
            };
          }

          return acc;
        }, {});
        this.setFields(newFields, callback);

        if (onValuesChange) {
          var _extends4;

          var allValues = this.fieldsStore.getAllValues();
          onValuesChange(_extends((_extends4 = {}, _extends4[formPropName] = this.getForm(), _extends4), this.props), changedValues, allValues);
        }
      },
      saveRef: function saveRef(name, _, component) {
        if (!component) {
          var _fieldMeta = this.fieldsStore.getFieldMeta(name);

          if (!_fieldMeta.preserve) {
            // after destroy, delete data
            this.clearedFieldMetaCache[name] = {
              field: this.fieldsStore.getField(name),
              meta: _fieldMeta
            };
            this.clearField(name);
          }

          delete this.domFields[name];
          return;
        }

        this.domFields[name] = true;
        this.recoverClearedField(name);
        var fieldMeta = this.fieldsStore.getFieldMeta(name);

        if (fieldMeta) {
          var ref = fieldMeta.ref;

          if (ref) {
            if (typeof ref === 'string') {
              throw new Error("can not set ref string for " + name);
            } else if (typeof ref === 'function') {
              ref(component);
            } else if (Object.prototype.hasOwnProperty.call(ref, 'current')) {
              ref.current = component;
            }
          }
        }

        this.instances[name] = component;
      },
      clearField: function clearField(name) {
        this.fieldsStore.clearField(name);
        delete this.instances[name];
        delete this.cachedBind[name];
      },
      resetFields: function resetFields(ns) {
        var _this6 = this;

        var newFields = this.fieldsStore.resetFields(ns);

        if (Object.keys(newFields).length > 0) {
          this.setFields(newFields);
        }

        if (ns) {
          var names = Array.isArray(ns) ? ns : [ns];
          names.forEach(function (name) {
            return delete _this6.clearedFieldMetaCache[name];
          });
        } else {
          this.clearedFieldMetaCache = {};
        }
      },
      recoverClearedField: function recoverClearedField(name) {
        if (this.clearedFieldMetaCache[name]) {
          var _this$fieldsStore$set;

          this.fieldsStore.setFields((_this$fieldsStore$set = {}, _this$fieldsStore$set[name] = this.clearedFieldMetaCache[name].field, _this$fieldsStore$set));
          this.fieldsStore.setFieldMeta(name, this.clearedFieldMetaCache[name].meta);
          delete this.clearedFieldMetaCache[name];
        }
      },
      validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
        var _this7 = this;

        var fieldNames = _ref.fieldNames,
            action = _ref.action,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;
        var allRules = {};
        var allValues = {};
        var allFields = {};
        var alreadyErrors = {};
        fields.forEach(function (field) {
          var name = field.name;

          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              set(alreadyErrors, name, {
                errors: field.errors
              });
            }

            return;
          }

          var fieldMeta = _this7.fieldsStore.getFieldMeta(name);

          var newField = _extends({}, field);

          newField.errors = undefined;
          newField.validating = true;
          newField.dirty = true;
          allRules[name] = _this7.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        this.setFields(allFields); // in case normalize

        Object.keys(allValues).forEach(function (f) {
          allValues[f] = _this7.fieldsStore.getFieldValue(f);
        });

        if (callback && isEmptyObject(allFields)) {
          callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
          return;
        }

        var validator = new AsyncValidator(allRules);

        if (validateMessages) {
          validator.messages(validateMessages);
        }

        validator.validate(allValues, options, function (errors) {
          var errorsGroup = _extends({}, alreadyErrors);

          if (errors && errors.length) {
            errors.forEach(function (e) {
              var errorFieldName = e.field;
              var fieldName = errorFieldName;
              Object.keys(allRules).some(function (ruleFieldName) {
                var rules = allRules[ruleFieldName] || []; // Exist if match rule

                if (ruleFieldName === errorFieldName) {
                  fieldName = ruleFieldName;
                  return true;
                } // Skip if not match array type


                if (rules.every(function (_ref2) {
                  var type = _ref2.type;
                  return type !== 'array';
                }) && errorFieldName.indexOf(ruleFieldName) !== 0) {
                  return false;
                } // Exist if match the field name


                var restPath = errorFieldName.slice(ruleFieldName.length + 1);

                if (/^\d+$/.test(restPath)) {
                  fieldName = ruleFieldName;
                  return true;
                }

                return false;
              });
              var field = get(errorsGroup, fieldName);

              if (typeof field !== 'object' || Array.isArray(field)) {
                set(errorsGroup, fieldName, {
                  errors: []
                });
              }

              var fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            });
          }

          var expired = [];
          var nowAllFields = {};
          Object.keys(allRules).forEach(function (name) {
            var fieldErrors = get(errorsGroup, name);

            var nowField = _this7.fieldsStore.getField(name); // avoid concurrency problems


            if (!eq(nowField.value, allValues[name])) {
              expired.push({
                name: name
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });

          _this7.setFields(nowAllFields);

          if (callback) {
            if (expired.length) {
              expired.forEach(function (_ref3) {
                var name = _ref3.name;
                var fieldErrors = [{
                  message: name + " need to revalidate",
                  field: name
                }];
                set(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors
                });
              });
            }

            callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this7.fieldsStore.getFieldsValue(fieldNames));
          }
        });
      },
      validateFields: function validateFields(ns, opt, cb) {
        var _this8 = this;

        var pending = new Promise(function (resolve, reject) {
          var _getParams = getParams(ns, opt, cb),
              names = _getParams.names,
              options = _getParams.options;

          var _getParams2 = getParams(ns, opt, cb),
              callback = _getParams2.callback;

          if (!callback || typeof callback === 'function') {
            var oldCb = callback;

            callback = function callback(errors, values) {
              if (oldCb) {
                oldCb(errors, values);
              } else if (errors) {
                reject({
                  errors: errors,
                  values: values
                });
              } else {
                resolve(values);
              }
            };
          }

          var fieldNames = names ? _this8.fieldsStore.getValidFieldsFullName(names) : _this8.fieldsStore.getValidFieldsName();
          var fields = fieldNames.filter(function (name) {
            var fieldMeta = _this8.fieldsStore.getFieldMeta(name);

            return hasRules(fieldMeta.validate);
          }).map(function (name) {
            var field = _this8.fieldsStore.getField(name);

            field.value = _this8.fieldsStore.getFieldValue(name);
            return field;
          });

          if (!fields.length) {
            callback(null, _this8.fieldsStore.getFieldsValue(fieldNames));
            return;
          }

          if (!('firstFields' in options)) {
            options.firstFields = fieldNames.filter(function (name) {
              var fieldMeta = _this8.fieldsStore.getFieldMeta(name);

              return !!fieldMeta.validateFirst;
            });
          }

          _this8.validateFieldsInternal(fields, {
            fieldNames: fieldNames,
            options: options
          }, callback);
        });
        pending["catch"](function (e) {
          return e;
        });
        return pending;
      },
      isSubmitting: function isSubmitting() {
        return this.state.submitting;
      },
      submit: function submit(callback) {
        var _this9 = this;

        var fn = function fn() {
          _this9.setState({
            submitting: false
          });
        };

        this.setState({
          submitting: true
        });
        callback(fn);
      },
      render: function render() {
        var _formProps;

        // eslint-disable-next-line react/prop-types
        var _this$props = this.props,
            wrappedComponentRef = _this$props.wrappedComponentRef,
            restProps = _objectWithoutPropertiesLoose(_this$props, ["wrappedComponentRef"]);

        var formProps = (_formProps = {}, _formProps[formPropName] = this.getForm(), _formProps);
        formProps.ref = wrappedComponentRef;
        var props = mapProps.call(this, _extends({}, formProps, restProps));
        return React.createElement(WrappedComponent, props);
      }
    });
    return argumentContainer(Form, WrappedComponent);
  };
};

export default createBaseForm;