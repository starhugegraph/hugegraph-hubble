"use strict";

exports.__esModule = true;
exports.isFormField = isFormField;
exports["default"] = createFormField;

var Field = function Field(fields) {
  Object.assign(this, fields);
};

function isFormField(obj) {
  return obj instanceof Field;
}

function createFormField(field) {
  if (isFormField(field)) {
    return field;
  }

  return new Field(field);
}