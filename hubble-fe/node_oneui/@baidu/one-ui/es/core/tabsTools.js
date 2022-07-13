import React from 'react';
export var toChildrenArray = function toChildrenArray(children) {
  var childrens = [];
  React.Children.forEach(children, function (child) {
    if (child) {
      childrens.push(child);
    }
  });
  return childrens;
};
export var getActiveIndex = function getActiveIndex(children, activeKey) {
  var c = toChildrenArray(children);

  for (var i = 0; i < c.length; i++) {
    if (c[i].key === activeKey) {
      return i;
    }
  }

  return -1;
};
export var isTransform3dSupported = function isTransform3dSupported(style) {
  return ('transform' in style || 'webkitTransform' in style || 'MozTransform' in style) && window.atob;
};
export var setTransform = function setTransform(style, value) {
  style.transform = value;
  style.webkitTransform = value;
  style.mozTransform = value;
};