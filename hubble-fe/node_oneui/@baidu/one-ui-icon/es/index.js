/* eslint-disable */
import React from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * @file 工具函数
 * @author zhanglili
 */
var memoize = function memoize(fn) {
  var cache = {};
  return function (n) {
    if (!cache[n]) {
      cache[n] = fn(n);
    }

    return cache[n];
  };
};
var merge = function merge(x, y) {
  if (!x) {
    return y;
  }

  if (!y) {
    return x;
  }

  return _objectSpread({}, x, y);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".one-ui-icon-svg {\n    fill: currentColor;\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n}\n";
styleInject(css);

var computeScaleStyle = memoize(function (n) {
  return {
    display: 'inline-block',
    width: "".concat(n, "em"),
    height: "".concat(n, "em")
  };
});
var createIcon = (function (type, svg) {
  var baseClassName = "one-ui-icon-svg icon-".concat(type);
  var IconComponent = svg;
  return function (_ref) {
    var className = _ref.className,
        scale = _ref.scale,
        style = _ref.style,
        props = _objectWithoutProperties(_ref, ["className", "scale", "style"]);

    var iconClassName = className ? baseClassName + ' ' + className : baseClassName;
    var scaleStyle = scale ? computeScaleStyle(scale) : null;
    var iconStyle = merge(scaleStyle, style);
    return React.createElement(IconComponent, _extends({}, props, {
      style: iconStyle,
      className: iconClassName
    }));
  };
});

var SVG = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 32 32"
  }), React.createElement("path", {
    d: "M17.609 29.724a1.333 1.333 0 1 1-1.886 1.886L1.056 16.943a1.333 1.333 0 0 1 0-1.886L15.723.39a1.333 1.333 0 1 1 1.886 1.886L3.885 16l13.724 13.724z"
  }), React.createElement("path", {
    d: "M17.219 16l13.724 13.724a1.333 1.333 0 1 1-1.886 1.886L14.39 16.943a1.333 1.333 0 0 1 0-1.886L29.057.39a1.333 1.333 0 1 1 1.886 1.886L17.219 16z"
  }));
});

/**
* @file 图标angle-double-left
* @author zhanglili
*/
var IconAngleDoubleLeft = createIcon('angle-double-left', SVG);

var SVG$1 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 32 32"
  }), React.createElement("path", {
    d: "M14.391 29.724a1.333 1.333 0 1 0 1.886 1.886l14.667-14.667a1.333 1.333 0 0 0 0-1.886L16.277.39a1.333 1.333 0 1 0-1.886 1.886L28.115 16 14.391 29.724z"
  }), React.createElement("path", {
    d: "M14.781 16L1.057 29.724a1.333 1.333 0 1 0 1.886 1.886L17.61 16.943a1.333 1.333 0 0 0 0-1.886L2.943.39a1.333 1.333 0 1 0-1.886 1.886L14.781 16z"
  }));
});

/**
* @file 图标angle-double-right
* @author zhanglili
*/
var IconAngleDoubleRight = createIcon('angle-double-right', SVG$1);

var SVG$2 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("g", {
    fill: "#000",
    fillRule: "nonzero"
  }, React.createElement("path", {
    d: "M3.414 26.414a2 2 0 0 1-2.828-2.828l22-22a2 2 0 0 1 2.828 0l22 22a2 2 0 0 1-2.828 2.828L24 5.828 3.414 26.414z"
  }), React.createElement("path", {
    d: "M24 25.828L3.414 46.414a2 2 0 1 1-2.828-2.828l22-22a2 2 0 0 1 2.828 0l22 22a2 2 0 0 1-2.828 2.828L24 25.828z"
  })));
});

/**
* @file 图标angle-double-up
* @author zhanglili
*/
var IconAngleDoubleUp = createIcon('angle-double-up', SVG$2);

var SVG$3 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 32 32"
  }), React.createElement("path", {
    d: "M24.901 29.684a1.334 1.334 0 0 1-1.802 1.966l-16-14.667a1.333 1.333 0 0 1 0-1.966l16-14.667a1.333 1.333 0 1 1 1.802 1.966L9.973 16l14.928 13.684z"
  }));
});

/**
* @file 图标angle-left
* @author zhanglili
*/
var IconAngleLeft = createIcon('angle-left', SVG$3);

var SVG$4 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 32 32"
  }), React.createElement("path", {
    d: "M7.099 29.684a1.333 1.333 0 1 0 1.802 1.966l16-14.667a1.334 1.334 0 0 0 0-1.966L8.901.35a1.333 1.333 0 1 0-1.802 1.966L22.027 16 7.099 29.684z"
  }));
});

/**
* @file 图标angle-right
* @author zhanglili
*/
var IconAngleRight = createIcon('angle-right', SVG$4);

var SVG$5 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M23.85 2.22l.15-.006a2 2 0 0 1 1.995 1.851l.005.15V39.47l13.886-13.884a2 2 0 0 1 2.701-.117l.127.117a2 2 0 0 1 .117 2.701l-.117.127-17.25 17.25a2 2 0 0 1-2.701.117l-.127-.117-17.25-17.25a2 2 0 0 1 2.701-2.945l.127.117L22 39.372V4.214a2 2 0 0 1 1.85-1.994l.15-.006-.15.006z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标arrow-down
* @author zhanglili
*/
var IconArrowDown = createIcon('arrow-down', SVG$5);

var SVG$6 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M19.886 42.664l-17.25-17.25a2 2 0 0 1-.117-2.701l.117-.127 17.25-17.25a2 2 0 0 1 2.945 2.701l-.117.127L8.83 22.05H44.05a2 2 0 0 1 1.995 1.85l.005.15a2 2 0 0 1-1.85 1.995l-.15.005H8.927l13.787 13.786a2 2 0 0 1 .117 2.701l-.117.127a2 2 0 0 1-2.701.117l-.127-.117-17.25-17.25 17.25 17.25z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标arrow-left
* @author zhanglili
*/
var IconArrowLeft = createIcon('arrow-left', SVG$6);

var SVG$7 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M28.214 5.336l17.25 17.25a2 2 0 0 1 .117 2.701l-.117.127-17.25 17.25a2 2 0 0 1-2.945-2.701l.117-.127L39.27 25.95H4.05a2 2 0 0 1-1.995-1.85l-.005-.15a2 2 0 0 1 1.85-1.995l.15-.005h35.123L25.386 8.164a2 2 0 0 1-.117-2.701l.117-.127a2 2 0 0 1 2.701-.117l.127.117 17.25 17.25-17.25-17.25z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标arrow-right
* @author zhanglili
*/
var IconArrowRight = createIcon('arrow-right', SVG$7);

var SVG$8 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M26.5 12.397V46a2 2 0 1 1-4 0V12.397L6.314 26.507a2 2 0 1 1-2.628-3.015l19.5-17a2 2 0 0 1 2.628 0l19.5 17a2 2 0 1 1-2.628 3.016L26.5 12.397zM6 5a2 2 0 1 1 0-4h37a2 2 0 1 1 0 4H6z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标arrow-to-top
* @author zhanglili
*/
var IconArrowToTop = createIcon('arrow-to-top', SVG$8);

var SVG$9 = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M5.386 19.836l17.25-17.25a2 2 0 0 1 2.701-.117l.127.117 17.25 17.25a2 2 0 0 1-2.701 2.945l-.127-.117L26 8.78V44a2 2 0 0 1-1.85 1.995L24 46a2 2 0 0 1-1.995-1.85L22 44V8.877L8.214 22.664a2 2 0 0 1-2.701.117l-.127-.117a2 2 0 0 1-.117-2.701l.117-.127 17.25-17.25-17.25 17.25z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标arrow-up
* @author zhanglili
*/
var IconArrowUp = createIcon('arrow-up', SVG$9);

var SVG$a = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M9.873 39.196a2 2 0 0 1-2.827 2.83A23.96 23.96 0 0 1 0 25.021C0 11.756 10.745 1 24 1s24 10.756 24 24.022a23.962 23.962 0 0 1-7.153 17.11 2 2 0 1 1-2.809-2.848A19.963 19.963 0 0 0 44 25.022C44 13.964 35.045 5 24 5S4 13.964 4 25.022c0 5.392 2.136 10.44 5.873 14.174zm5.815-5.88a2 2 0 1 1-2.747 2.908C9.808 33.264 8 29.174 8 24.804 8 16.068 15.17 9 24 9s16 7.069 16 15.803c0 4.426-1.854 8.562-5.056 11.529a2 2 0 0 1-2.719-2.934C34.62 31.178 36 28.1 36 24.803 36 18.291 30.634 13 24 13s-12 5.29-12 11.803c0 3.257 1.345 6.3 3.688 8.514zm5.343-5.3a2 2 0 0 1-3.033 2.608A8.297 8.297 0 0 1 16 25.201C16 20.686 19.567 17 24 17s8 3.686 8 8.201a8.29 8.29 0 0 1-2.198 5.647 2 2 0 1 1-2.935-2.718A4.291 4.291 0 0 0 28 25.201C28 22.867 26.194 21 24 21s-4 1.867-4 4.201c0 1.059.371 2.049 1.03 2.815z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标bullseye
* @author zhanglili
*/
var IconBullseye = createIcon('bullseye', SVG$a);

var SVG$b = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M34.5 8v2a2 2 0 1 1-4 0V8h-13v2a2 2 0 1 1-4 0V8H6a2 2 0 0 0-2 2v7.5h40V10a2 2 0 0 0-2-2h-7.5zm0-4H42a6 6 0 0 1 6 6v32a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6h7.5V2a2 2 0 1 1 4 0v2h13V2a2 2 0 1 1 4 0v2zM4 21.5V42a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2V21.5H4zm12 10a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4H16zm0 7a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4H16z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标calendar
* @author zhanglili
*/
var IconCalendar = createIcon('calendar', SVG$b);

var SVG$c = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M44.594 8.578a2 2 0 0 1 2.812 2.844l-29.333 29a2 2 0 0 1-2.812 0L.594 25.922a2 2 0 0 1 2.812-2.844l13.26 13.11 27.928-27.61z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标check
* @author zhanglili
*/
var IconCheck = createIcon('check', SVG$c);

var SVG$d = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 48C10.745 48 0 37.255 0 24S10.745 0 24 0s24 10.745 24 24-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20zm-4-14.828l14.586-14.586a2 2 0 0 1 2.828 2.828l-16 16a2 2 0 0 1-2.828 0l-8-8a2 2 0 0 1 2.828-2.828L20 29.172z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标check-circle
* @author zhanglili
*/
var IconCheckCircle = createIcon('check-circle', SVG$d);

var SVG$e = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("g", {
    stroke: "#000",
    strokeLinecap: "round",
    strokeWidth: "4"
  }, React.createElement("path", {
    d: "M44 24L24 44 4 24"
  }), React.createElement("path", {
    d: "M44 5L24 25 4 5"
  })), React.createElement("path", {
    d: "M2.586 22.586a2 2 0 0 1 2.828 0L24 41.172l18.586-18.586a2 2 0 0 1 2.828 2.828l-20 20a2 2 0 0 1-2.828 0l-20-20a2 2 0 0 1 0-2.828zm0-19a2 2 0 0 1 2.828 0L24 22.172 42.586 3.586a2 2 0 0 1 2.828 2.828l-20 20a2 2 0 0 1-2.828 0l-20-20a2 2 0 0 1 0-2.828z",
    fillRule: "nonzero"
  })));
});

/**
* @file 图标chevron-double-down
* @author zhanglili
*/
var IconChevronDoubleDown = createIcon('chevron-double-down', SVG$e);

var SVG$f = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M25.414 2.586a2 2 0 0 1 0 2.828L6.828 24l18.586 18.586a2 2 0 0 1-2.828 2.828l-20-20a2 2 0 0 1 0-2.828l20-20a2 2 0 0 1 2.828 0zm19 0a2 2 0 0 1 0 2.828L25.828 24l18.586 18.586a2 2 0 0 1-2.828 2.828l-20-20a2 2 0 0 1 0-2.828l20-20a2 2 0 0 1 2.828 0z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标chevron-double-left
* @author zhanglili
*/
var IconChevronDoubleLeft = createIcon('chevron-double-left', SVG$f);

var SVG$g = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M22.586 2.586a2 2 0 0 0 0 2.828L41.172 24 22.586 42.586a2 2 0 0 0 2.828 2.828l20-20a2 2 0 0 0 0-2.828l-20-20a2 2 0 0 0-2.828 0zm-19 0a2 2 0 0 0 0 2.828L22.172 24 3.586 42.586a2 2 0 0 0 2.828 2.828l20-20a2 2 0 0 0 0-2.828l-20-20a2 2 0 0 0-2.828 0z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标chevron-double-right
* @author zhanglili
*/
var IconChevronDoubleRight = createIcon('chevron-double-right', SVG$g);

var SVG$h = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("g", {
    stroke: "#000",
    strokeLinecap: "round",
    strokeWidth: "4"
  }, React.createElement("path", {
    d: "M44 24L24 4 4 24"
  }), React.createElement("path", {
    d: "M44 43L24 23 4 43"
  })), React.createElement("path", {
    d: "M2.586 25.414a2 2 0 0 0 2.828 0L24 6.828l18.586 18.586a2 2 0 0 0 2.828-2.828l-20-20a2 2 0 0 0-2.828 0l-20 20a2 2 0 0 0 0 2.828zm0 19a2 2 0 0 0 2.828 0L24 25.828l18.586 18.586a2 2 0 0 0 2.828-2.828l-20-20a2 2 0 0 0-2.828 0l-20 20a2 2 0 0 0 0 2.828z",
    fillRule: "nonzero"
  })));
});

/**
* @file 图标chevron-double-up
* @author zhanglili
*/
var IconChevronDoubleUp = createIcon('chevron-double-up', SVG$h);

var SVG$i = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 34.172l20.586-20.586a2 2 0 0 1 2.828 2.828l-22 22a2 2 0 0 1-2.828 0l-22-22a2 2 0 1 1 2.828-2.828L24 34.172z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标chevron-down
* @author zhanglili
*/
var IconChevronDown = createIcon('chevron-down', SVG$i);

var SVG$j = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M13.828 24L34.414 3.414A2 2 0 0 0 31.586.586l-22 22a2 2 0 0 0 0 2.828l22 22a2 2 0 1 0 2.828-2.828L13.828 24z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标chevron-left
* @author zhanglili
*/
var IconChevronLeft = createIcon('chevron-left', SVG$j);

var SVG$k = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M34.172 24L13.586 3.414A2 2 0 0 1 16.414.586l22 22a2 2 0 0 1 0 2.828l-22 22a2 2 0 1 1-2.828-2.828L34.172 24z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标chevron-right
* @author zhanglili
*/
var IconChevronRight = createIcon('chevron-right', SVG$k);

var SVG$l = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 13.828l20.586 20.586a2 2 0 0 0 2.828-2.828l-22-22a2 2 0 0 0-2.828 0l-22 22a2 2 0 1 0 2.828 2.828L24 13.828z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标chevron-up
* @author zhanglili
*/
var IconChevronUp = createIcon('chevron-up', SVG$l);

var SVG$m = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 48C10.745 48 0 37.255 0 24S10.745 0 24 0s24 10.745 24 24-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20zm1-20h7a2 2 0 1 1 0 4h-9a2 2 0 0 1-2-2V13a2 2 0 1 1 4 0v11z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标clock
* @author zhanglili
*/
var IconClock = createIcon('clock', SVG$m);

var SVG$n = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 32 32"
  }), React.createElement("path", {
    d: "M14.114 16L1.723 3.609a1.333 1.333 0 1 1 1.886-1.886L16 14.114 28.391 1.723a1.333 1.333 0 1 1 1.886 1.886L17.886 16l12.391 12.391a1.333 1.333 0 1 1-1.886 1.886L16 17.886 3.609 30.277a1.333 1.333 0 1 1-1.886-1.886L14.114 16z"
  }));
});

/**
* @file 图标close
* @author zhanglili
*/
var IconClose = createIcon('close', SVG$n);

var SVG$o = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 55 32"
  }), React.createElement("path", {
    d: "M48.499 2.96h-.907a.34.34 0 0 0-.302.232l-8.653 28.576c-.039.128.034.232.163.232h.907a.34.34 0 0 0 .302-.232l8.653-28.576c.038-.128-.034-.232-.163-.232zM43.415 9.412h.907a.34.34 0 0 0 .302-.232l1.099-3.647c.039-.128-.034-.232-.163-.232h-.907a.34.34 0 0 0-.302.232L43.252 9.18c-.038.128.034.232.163.232zM50.727 2.96h-.907a.34.34 0 0 0-.302.232l-8.653 28.576c-.039.128.034.232.163.232h.907a.34.34 0 0 0 .302-.232L50.89 3.192c.038-.128-.034-.232-.163-.232zM52.955 2.96h-.907a.34.34 0 0 0-.302.232l-8.653 28.576c-.038.128.034.232.163.232h.907a.338.338 0 0 0 .302-.232l8.653-28.576c.039-.128-.034-.232-.163-.232zM38.814.032h-.907a.34.34 0 0 0-.302.232L29.85 26.056c-.039.128.034.232.163.232h.907a.34.34 0 0 0 .302-.232L38.977.264c.038-.128-.034-.232-.163-.232zM33.73 6.484h.907a.34.34 0 0 0 .302-.232l1.099-3.647c.039-.128-.034-.232-.163-.232h-.907a.338.338 0 0 0-.302.232l-1.099 3.647c-.039.128.034.232.162.232zM41.042.032h-.907a.34.34 0 0 0-.302.232l-7.755 25.792c-.039.128.034.232.163.232h.907a.34.34 0 0 0 .302-.232L41.205.264c.038-.128-.034-.232-.163-.232zM43.27.032h-.907a.34.34 0 0 0-.302.232l-7.755 25.792c-.038.128.034.232.163.232h.907a.34.34 0 0 0 .302-.232L43.433.264c.038-.128-.034-.232-.163-.232zM30.497 4.705H19.272l-1.904 3.608h7.135L22.7 11.73l-1.011-2.436h-3.745l2.66 6.407-5.465 10.355h4.09l3.175-6.017 2.498 6.017h3.745l-4.146-9.989z"
  }), React.createElement("path", {
    d: "M12.51 15.563l5.73-10.857H4.27l1.498 3.608h6.636l-1.621 3.071-.863-2.09H6.175l2.509 6.067-5.645 10.696h3.932l3.44-6.519 2.696 6.519 2.096-3.972z"
  }));
});

/**
* @file 图标double-eleven
* @author zhanglili
*/
var IconDoubleEleven = createIcon('double-eleven', SVG$o);

var SVG$p = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 34 34"
  }), React.createElement("g", {
    fill: "#000",
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M30.5 14v12a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 26V8A4.5 4.5 0 0 1 8 3.5h12a1.5 1.5 0 0 0 0-3H8A7.5 7.5 0 0 0 .5 8v18A7.5 7.5 0 0 0 8 33.5h18a7.5 7.5 0 0 0 7.5-7.5V14a1.5 1.5 0 0 0-3 0z",
    fillRule: "nonzero"
  }), React.createElement("path", {
    d: "M12.174 18.955L30.205.924a1.5 1.5 0 0 1 2.121 2.121L14.295 21.076a1.5 1.5 0 0 1-2.121-2.121z"
  })));
});

/**
* @file 图标edit
* @author zhanglili
*/
var IconEdit = createIcon('edit', SVG$p);

var SVG$q = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M42.207 27.586a3.793 3.793 0 1 1 0-7.586 3.793 3.793 0 0 1 0 7.586zm-18.207 0A3.793 3.793 0 1 1 24 20a3.793 3.793 0 0 1 0 7.586zm-18.207 0a3.793 3.793 0 1 1 0-7.586 3.793 3.793 0 0 1 0 7.586z",
    fillRule: "evenodd"
  }));
});

/**
* @file 图标ellipsis
* @author zhanglili
*/
var IconEllipsis = createIcon('ellipsis', SVG$q);

var SVG$r = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M4 12.642V36a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2V12.642L27.898 26.546a5.953 5.953 0 0 1-7.796 0L4 12.642zM40.94 10H7.06l15.657 13.519a1.953 1.953 0 0 0 2.566 0L40.94 10zM6 6h36a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标envelope
* @author zhanglili
*/
var IconEnvelope = createIcon('envelope', SVG$r);

var SVG$s = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("g", {
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M24 48C10.745 48 0 37.255 0 24S10.745 0 24 0s24 10.745 24 24-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20zm-2-32a2 2 0 1 1 4 0v16a2 2 0 1 1-4 0V12zm0 22a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-1z",
    fillRule: "nonzero"
  })));
});

/**
* @file 图标exclamation-circle
* @author zhanglili
*/
var IconExclamationCircle = createIcon('exclamation-circle', SVG$s);

var SVG$t = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 33 32"
  }), React.createElement("g", {
    fill: "#000",
    fillRule: "evenodd",
    transform: "translate(-2 -3)"
  }, React.createElement("path", {
    d: "M8.921 5.797A15.89 15.89 0 0 0 2.5 18.564c0 8.802 7.165 15.936 16 15.936s16-7.134 16-15.936c0-5.036-2.362-9.683-6.304-12.678a1.5 1.5 0 0 0-1.815 2.388 12.89 12.89 0 0 1 5.119 10.29c0 7.143-5.819 12.936-13 12.936s-13-5.793-13-12.936c0-4.129 1.955-7.932 5.214-10.361a1.5 1.5 0 1 0-1.793-2.406z",
    fillRule: "nonzero"
  }), React.createElement("rect", {
    height: "12",
    width: "3",
    rx: "1.5",
    x: "17",
    y: "3"
  })));
});

/**
* @file 图标exit
* @author zhanglili
*/
var IconExit = createIcon('exit', SVG$t);

var SVG$u = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 7c9.334 0 17.657 6.372 21.84 16.218a2 2 0 0 1 0 1.564C41.658 34.628 33.335 41 24 41S6.343 34.628 2.16 24.782a2 2 0 0 1 0-1.564C6.342 13.372 14.665 7 24 7zm0 4c-7.373 0-14.131 4.998-17.813 13C9.869 32.002 16.627 37 24 37c7.373 0 14.131-4.998 17.813-13C38.131 15.998 31.373 11 24 11zm0 4.5a8.5 8.5 0 0 1 8.005 11.364 2 2 0 1 1-3.766-1.347 4.5 4.5 0 1 0-3.157 2.853 2 2 0 0 1 .957 3.883A8.5 8.5 0 1 1 24 15.5z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标eye
* @author zhanglili
*/
var IconEye = createIcon('eye', SVG$u);

var SVG$v = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M28 4H8a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V17h-9.2a4.8 4.8 0 0 1-4.8-4.8V4zm11.97 9L32 6.091V12.2a.8.8 0 0 0 .8.8h7.17zM8 0h22.333a2 2 0 0 1 1.31.489L45.31 12.335a2 2 0 0 1 .69 1.511V42a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6zm4.631 29.333a2 2 0 1 1 0-4h23.742a2 2 0 1 1 0 4H12.63zm.119-12a2 2 0 1 1 0-4h10.624a2 2 0 1 1 0 4H12.75z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标file
* @author zhanglili
*/
var IconFile = createIcon('file', SVG$v);

var SVG$w = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M30.646 23.482V43c0 1.537-1.66 2.5-2.994 1.735l-9.293-5.323a2 2 0 0 1-1.005-1.736V23.482L2.977 9.122A3 3 0 0 1 5.097 4h37.806a3 3 0 0 1 2.12 5.123L30.646 23.482zm-9.292 13.035l5.292 3.032V22.652a2 2 0 0 1 .587-1.415L40.487 8H7.513l13.254 13.237a2 2 0 0 1 .587 1.415v13.865z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标filter
* @author zhanglili
*/
var IconFilter = createIcon('filter', SVG$w);

var SVG$x = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M9 35.368V44h1a2 2 0 1 1 0 4H5a2 2 0 1 1 0-4V2a2 2 0 1 1 4 0h20.91a2 2 0 0 1 .891.21l2.852 1.422H41a4 4 0 0 1 4 4V33a4 4 0 0 1-4 4h-7.818a2 2 0 0 1-.893-.21l-2.85-1.422H9zm0-4h20.91a2 2 0 0 1 .891.21L33.653 33H41V7.632h-7.818a2 2 0 0 1-.893-.21L29.44 6H9v25.368z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标flag
* @author zhanglili
*/
var IconFlag = createIcon('flag', SVG$x);

var SVG$y = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M4 9.995v29.01C4 40.108 4.894 41 6.002 41h35.996A2.004 2.004 0 0 0 44 38.995v-23.36c0-1.103-.9-2.005-2.005-2.005h-15.55a2 2 0 0 1-1.51-.688l-3.58-4.122c-.341-.393-1.276-.82-1.8-.82H6.005A1.996 1.996 0 0 0 4 9.995zm23.357-.365h14.638A6.009 6.009 0 0 1 48 15.635v23.36A6.004 6.004 0 0 1 41.998 45H6.002A5.996 5.996 0 0 1 0 39.005V9.995A5.996 5.996 0 0 1 6.005 4h13.55c1.683 0 3.72.93 4.82 2.198l2.982 3.432z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标folder
* @author zhanglili
*/
var IconFolder = createIcon('folder', SVG$y);

var SVG$z = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M43 17h1.907a3 3 0 0 1 2.903 3.755l-5.72 22A3 3 0 0 1 39.187 45H3.507a3 3 0 0 1-2.96-3.487A5.98 5.98 0 0 1 0 39.005V9.995A5.993 5.993 0 0 1 5.997 4h8.565c1.68 0 3.713.93 4.814 2.198l2.98 3.432h14.64A6 6 0 0 1 43 15.625V17zm-4 0v-1.375a2 2 0 0 0-2.005-1.995h-15.55a2 2 0 0 1-1.51-.688l-3.58-4.122c-.342-.394-1.274-.82-1.793-.82H5.997A1.993 1.993 0 0 0 4 9.995v17.203l1.911-7.903A3 3 0 0 1 8.827 17H39zM4.862 40.65c.32.22.71.35 1.128.35h32.423l5.2-20H9.614L4.862 40.65z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标folder-open
* @author zhanglili
*/
var IconFolderOpen = createIcon('folder-open', SVG$z);

var SVG$A = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M36 42a2 2 0 0 0 2-2V24a2 2 0 0 1 2-2h.827L24 6.703 7.173 22H8a2 2 0 0 1 2 2v16a2 2 0 0 0 2 2h5v-8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8h5zm6-16v14a6 6 0 0 1-6 6h-7a2 2 0 0 1-2-2V34h-6v10a2 2 0 0 1-2 2h-7a6 6 0 0 1-6-6V26H2C.172 26-.698 23.75.655 22.52L21.309 3.743a4 4 0 0 1 5.382 0L47.345 22.52C48.698 23.75 47.828 26 46 26h-4z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标home
* @author zhanglili
*/
var IconHome = createIcon('home', SVG$A);

var SVG$B = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 32 32"
  }), React.createElement("path", {
    d: "M29.575 9.661H2.424c-.701 0-1.27.428-1.27.957v10.764c0 .528.569.957 1.27.957h27.151c.701 0 1.27-.428 1.27-.957V10.618c0-.529-.569-.957-1.27-.957zM11.877 20.333h-1.135v-3.587H6.875v3.587h-1.1v-8.08h1.1v3.429h3.867v-3.429h1.135v8.08zm4.789.119c-2.27-.132-3.453-1.498-3.548-4.099.118-2.68 1.313-4.086 3.583-4.218 2.199.158 3.381 1.564 3.547 4.218-.119 2.601-1.312 3.967-3.582 4.099zm10.358-7.174h-2.483v7.055h-1.1v-7.055h-2.519v-1.025h6.101v1.025z"
  }), React.createElement("path", {
    d: "M16.666 13.199c-1.49.132-2.283 1.182-2.377 3.153.071 1.945.852 2.982 2.341 3.114 1.513-.079 2.306-1.116 2.377-3.114-.071-1.971-.851-3.022-2.341-3.153z"
  }));
});

/**
* @file 图标hot
* @author zhanglili
*/
var IconHot = createIcon('hot', SVG$B);

var SVG$C = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 41 34"
  }), React.createElement("path", {
    d: "M27.335 4.5c.28 0 .507.224.507.5s-.227.5-.507.5H4.045C2.645 5.5 1.512 6.62 1.512 8v22c0 1.38 1.133 2.5 2.531 2.5H32.4c1.398 0 2.531-1.12 2.531-2.5V13c0-.276.227-.5.507-.5s.506.224.506.5v17c0 1.933-1.587 3.5-3.544 3.5H4.044C2.087 33.5.5 31.933.5 30V8c0-1.933 1.587-3.5 3.544-3.5zm-6.124 12.554a2.552 2.552 0 0 1 4.148 0l5.43 7.66a.496.496 0 0 1-.125.696.51.51 0 0 1-.705-.123l-5.43-7.66a1.531 1.531 0 0 0-2.489 0l-5.429 7.66a.508.508 0 0 1-.12.12l.065-.055a.501.501 0 0 1-.041.037l-.024.018a.517.517 0 0 1-.457.067.51.51 0 0 1-.25-.183l.056.064a.5.5 0 0 1-.037-.04l-.019-.024-3.415-4.722a1.531 1.531 0 0 0-2.472 0l-3.415 4.722a.51.51 0 0 1-.707.116.496.496 0 0 1-.117-.698l3.415-4.721a2.552 2.552 0 0 1 4.12 0l2.999 4.146zM10.12 11.5c1.397 0 2.53 1.12 2.53 2.5s-1.133 2.5-2.53 2.5c-1.399 0-2.532-1.12-2.532-2.5s1.133-2.5 2.531-2.5zm0 1A1.51 1.51 0 0 0 8.6 14c0 .828.68 1.5 1.52 1.5a1.51 1.51 0 0 0 1.518-1.5c0-.828-.68-1.5-1.519-1.5zM35.442.5a.5.5 0 0 1 .5.5v4H40a.5.5 0 1 1 0 1h-4.057v4a.5.5 0 0 1-.5.5h-.013a.5.5 0 0 1-.5-.5V6h-4.057a.5.5 0 1 1 0-1h4.057V1a.5.5 0 0 1 .5-.5h.013z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标image-add
* @author zhanglili
*/
var IconImageAdd = createIcon('image-add', SVG$C);

var SVG$D = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("g", {
    fillRule: "evenodd"
  }, React.createElement("path", {
    d: "M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm0 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24 12.954 4 24 4zm-2 32a2 2 0 1 0 4 0V20a2 2 0 1 0-4 0v16zm0-22a2 2 0 1 0 4 0v-1a2 2 0 1 0-4 0v1z",
    fillRule: "nonzero"
  })));
});

/**
* @file 图标info-circle
* @author zhanglili
*/
var IconInfoCircle = createIcon('info-circle', SVG$D);

var SVG$E = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M48 24a2 2 0 1 1-4 0c0-11.046-8.954-20-20-20a2 2 0 1 1 0-4c13.255 0 24 10.745 24 24z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标loading
* @author zhanglili
*/
var IconLoading = createIcon('loading', SVG$E);

var SVG$F = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 34 35"
  }), React.createElement("g", {
    fill: "#000",
    fillRule: "evenodd",
    transform: "translate(-1 -1)"
  }, React.createElement("path", {
    d: "M11.5 29a6.497 6.497 0 0 0 6.5 6.5 6.502 6.502 0 0 0 6.5-6.5h-3a3.496 3.496 0 0 1-3.5 3.5 3.502 3.502 0 0 1-3.5-3.5h-3zM7.5 29V19c0-5.799 4.701-10.5 10.5-10.5S28.5 13.201 28.5 19v10h3V19c0-7.456-6.044-13.5-13.5-13.5S4.5 11.544 4.5 19v10h3z",
    fillRule: "nonzero"
  }), React.createElement("rect", {
    height: "3",
    width: "6",
    rx: "1.5",
    x: "15",
    y: "1"
  }), React.createElement("rect", {
    height: "3",
    width: "34",
    rx: "1.5",
    x: "1",
    y: "27"
  })));
});

/**
* @file 图标message
* @author zhanglili
*/
var IconMessage = createIcon('message', SVG$F);

var SVG$G = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M4 26a2 2 0 1 1 0-4h40a2 2 0 1 1 0 4H4z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标minus
* @author zhanglili
*/
var IconMinus = createIcon('minus', SVG$G);

var SVG$H = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 4 16"
  }), React.createElement("g", {
    fill: "#D2D2D2",
    fillRule: "evenodd"
  }, React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "2"
  }), React.createElement("circle", {
    cx: "2",
    cy: "8",
    r: "2"
  }), React.createElement("circle", {
    cx: "2",
    cy: "14",
    r: "2"
  })));
});

/**
* @file 图标more
* @author zhanglili
*/
var IconMore = createIcon('more', SVG$H);

var SVG$I = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M22 22V3a2 2 0 1 1 4 0v19h19a2 2 0 1 1 0 4H26v19a2 2 0 1 1-4 0V26H3a2 2 0 1 1 0-4h19z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标plus
* @author zhanglili
*/
var IconPlus = createIcon('plus', SVG$I);

var SVG$J = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 48C10.745 48 0 37.255 0 24S10.745 0 24 0s24 10.745 24 24-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20zm2-17.692v4.014a2 2 0 1 1-4 0v-5.796a2 2 0 0 1 2-2c2.777 0 5-2.149 5-4.763C29 15.148 26.777 13 24 13s-5 2.148-5 4.763a2 2 0 1 1-4 0C15 12.908 19.045 9 24 9s9 3.908 9 8.763c0 4.182-3 7.661-7 8.545zM22 36a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-1z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标question-circle
* @author zhanglili
*/
var IconQuestionCircle = createIcon('question-circle', SVG$J);

var SVG$K = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24 3a20.932 20.932 0 0 1 14.305 5.625V5.2a2 2 0 0 1 4 0v9.305a2 2 0 0 1-2 2H31a2 2 0 1 1 0-4h5.633c-.15-.088-.293-.2-.42-.331A16.94 16.94 0 0 0 24 7C14.611 7 7 14.611 7 24s7.611 17 17 17c8.577 0 15.782-6.388 16.861-14.817a2 2 0 0 1 3.968.508C43.495 37.111 34.596 45 24 45 12.402 45 3 35.598 3 24S12.402 3 24 3z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标refresh
* @author zhanglili
*/
var IconRefresh = createIcon('refresh', SVG$K);

var SVG$L = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M39.762 36.933l7.652 7.653a2 2 0 0 1-2.828 2.828l-7.653-7.652A22.41 22.41 0 0 1 22.5 45C10.074 45 0 34.926 0 22.5S10.074 0 22.5 0 45 10.074 45 22.5a22.41 22.41 0 0 1-5.238 14.433zM22.5 41C32.717 41 41 32.717 41 22.5S32.717 4 22.5 4 4 12.283 4 22.5 12.283 41 22.5 41z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标search
* @author zhanglili
*/
var IconSearch = createIcon('search', SVG$L);

var SVG$M = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 28 28"
  }), React.createElement("path", {
    d: "M21.677 5.18l-.712.711c-.464.466-1.13.716-1.797.716-.38 0-.754-.081-1.088-.247l-1.567-.645c-.976-.333-1.705-1.342-1.705-2.376V2.333h-1.616V3.34c0 1.034-.726 2.043-1.704 2.376l-1.569.645a2.447 2.447 0 0 1-1.088.247c-.667 0-1.33-.25-1.792-.713l-.716-.714-1.142 1.142.711.713c.733.732.929 1.957.468 2.883l-.645 1.57c-.333.977-1.34 1.705-2.377 1.705l-1.004-.001v1.616h1.007c1.034.002 2.04.73 2.372 1.705l.648 1.57c.458.926.263 2.154-.469 2.883l-.714.712 1.145 1.144.713-.713c.464-.464 1.126-.713 1.791-.713.38 0 .755.081 1.09.25l1.57.643c.979.334 1.705 1.342 1.705 2.376v1.002h1.616v-1.002c0-1.034.728-2.041 1.705-2.375l1.569-.645c.335-.168.71-.25 1.091-.25.665 0 1.328.25 1.796.715l.708.712 1.144-1.144-.715-.713c-.73-.73-.924-1.957-.466-2.882l.646-1.57c.335-.976 1.344-1.704 2.376-1.704h1.004v-1.617h-1.004c-1.034 0-2.041-.728-2.376-1.705l-.645-1.57c-.459-.923-.264-2.147.466-2.882l.714-.712-1.144-1.144zm-4.535-3.026V3.34a.39.39 0 0 0 .122.166l.098.036 1.651.68.108.05c.12.003.185-.022.192-.028l.842-.841a2.155 2.155 0 0 1 1.522-.629c.567 0 1.115.222 1.524.63l1.396 1.394c.842.84.842 2.208 0 3.05l-.837.836a.376.376 0 0 0-.03.194l.051.108.68 1.654.034.095c.01.032.135.124.167.124h1.185c1.187 0 2.153.967 2.153 2.155v1.975a2.157 2.157 0 0 1-2.153 2.155h-1.185a.391.391 0 0 0-.167.123l-.034.095-.68 1.653-.05.108a.394.394 0 0 0 .026.193l.84.839c.842.84.842 2.208.001 3.048L23.2 24.6a2.158 2.158 0 0 1-3.05-.003l-.832-.837a.335.335 0 0 0-.145-.031.592.592 0 0 0-.157.055l-1.654.68-.096.034a.384.384 0 0 0-.124.167v1.181A2.158 2.158 0 0 1 14.988 28h-1.974a2.158 2.158 0 0 1-2.156-2.154v-1.181a.375.375 0 0 0-.121-.166l-.097-.035-1.656-.68-.114-.054a.406.406 0 0 0-.183.029l-.841.84c-.409.408-.957.63-1.523.63a2.148 2.148 0 0 1-1.523-.63L3.4 23.2a2.163 2.163 0 0 1 .003-3.045l.842-.84a.385.385 0 0 0 .026-.194l-.05-.104-.681-1.653-.037-.101a.382.382 0 0 0-.162-.12H2.155A2.159 2.159 0 0 1 0 14.986v-1.973c0-1.188.967-2.155 2.156-2.155l1.184.002a.378.378 0 0 0 .165-.122l.035-.098.68-1.654.052-.11a.362.362 0 0 0-.03-.191l-.838-.84a2.156 2.156 0 0 1 0-3.046L4.8 3.403a2.15 2.15 0 0 1 1.523-.63 2.15 2.15 0 0 1 1.522.629l.845.842a.33.33 0 0 0 .141.03.582.582 0 0 0 .155-.054l1.653-.68.1-.035a.38.38 0 0 0 .119-.166V2.154A2.16 2.16 0 0 1 13.014 0h1.974a2.16 2.16 0 0 1 2.154 2.154zm-3.137 16.513A4.668 4.668 0 1 1 18.674 14a4.668 4.668 0 0 1-4.669 4.667zm0-2.334a2.334 2.334 0 1 0 .001-4.667 2.334 2.334 0 0 0 0 4.667z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标setup-system
* @author zhanglili
*/
var IconSetupSystem = createIcon('setup-system', SVG$M);

var SVG$N = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M17 2a2 2 0 0 1 2 2v40c0 1.772-2.133 2.668-3.4 1.43l-13-12.728a2 2 0 0 1 2.8-2.858l9.6 9.399V4a2 2 0 0 1 2-2zm12 2c0-1.772 2.133-2.668 3.4-1.43l13 12.728a2 2 0 0 1-2.8 2.858L33 8.757V44a2 2 0 1 1-4 0z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标sort
* @author zhanglili
*/
var IconSort = createIcon('sort', SVG$N);

var SVG$O = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M4.5 36.202V41a2 2 0 1 1-4 0V24a2 2 0 0 1 2.25-1.985A2 2 0 0 1 5 24c0 10.493 8.507 19 19 19a19.002 19.002 0 0 0 17.343-11.228 2 2 0 1 1 3.65 1.638A23.002 23.002 0 0 1 24 47c-8.22 0-15.433-4.312-19.5-10.798zm39-24.404V7a2 2 0 1 1 4 0v17a2 2 0 0 1-2.25 1.985A2 2 0 0 1 43 24c0-10.493-8.507-19-19-19A19.002 19.002 0 0 0 6.657 16.228a2 2 0 1 1-3.65-1.638A23.002 23.002 0 0 1 24 1c8.22 0 15.433 4.312 19.5 10.798z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标sync
* @author zhanglili
*/
var IconSync = createIcon('sync', SVG$O);

var SVG$P = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M23.897 21.069L42.38 2.586a2 2 0 0 1 2.829 2.828L26.726 23.897 45.209 42.38a2 2 0 0 1-2.829 2.829L23.897 26.726 5.414 45.209a2 2 0 0 1-2.828-2.829l18.483-18.483L2.586 5.414a2 2 0 1 1 2.828-2.828l18.483 18.483z"
  }));
});

/**
* @file 图标times
* @author zhanglili
*/
var IconTimes = createIcon('times', SVG$P);

var SVG$Q = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M24.5 21.672l8.086-8.086a2 2 0 0 1 2.828 2.828L27.328 24.5l8.086 8.086a2 2 0 0 1-2.828 2.828L24.5 27.328l-8.086 8.086a2 2 0 0 1-2.828-2.828l8.086-8.086-8.086-8.086a2 2 0 0 1 2.828-2.828l8.086 8.086zM24 48C10.745 48 0 37.255 0 24S10.745 0 24 0s24 10.745 24 24-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标times-circle
* @author zhanglili
*/
var IconTimesCircle = createIcon('times-circle', SVG$Q);

var SVG$R = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M35.368 22h-23.21l10.897 23.029a2 2 0 0 1-3.615 1.71L.488 6.693A4.625 4.625 0 0 1 4.624 0h38.73a4.624 4.624 0 0 1 4.136 6.692L34.428 32.83a2 2 0 0 1-3.579-1.788L35.37 22zm2-4l6.544-13.096A.626.626 0 0 0 43.354 4H4.624a.622.622 0 0 0-.279.066c-.308.154-.433.53-.26.877L10.265 18h27.102zM28 41a2 2 0 1 1 0-4h17.978a2 2 0 1 1 0 4H28zm0 7a2 2 0 1 1 0-4h17.978a2 2 0 1 1 0 4H28z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标toolbar-ocpc
* @author zhanglili
*/
var IconToolbarOcpc = createIcon('toolbar-ocpc', SVG$R);

var SVG$S = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M42 15a2 2 0 0 1 2 2v22.5a6.5 6.5 0 0 1-6.5 6.5h-27A6.5 6.5 0 0 1 4 39.5V17a2 2 0 1 1 4 0v22.5a2.5 2.5 0 0 0 2.5 2.5h27a2.5 2.5 0 0 0 2.5-2.5V17a2 2 0 0 1 2-2zm-24 2.523a2 2 0 0 1 2 2V36a2 2 0 1 1-4 0V19.523a2 2 0 0 1 2-2zm12 0a2 2 0 0 1 2 2V36a2 2 0 1 1-4 0V19.523a2 2 0 0 1 2-2zM28.98 2c1.987 0 3.749 1.318 4.144 3.23l.02.117.24 1.653H44a2 2 0 1 1 0 4H31.654a2 2 0 0 1-1.98-1.713l-.47-3.245c-.016 0-.09-.042-.224-.042H17.908c-.133 0-.207.042-.223.042l-.471 3.245A2 2 0 0 1 15.234 11H4a2 2 0 1 1 0-4h9.504l.24-1.653.02-.117C14.16 3.318 15.922 2 17.909 2z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标trash
* @author zhanglili
*/
var IconTrash = createIcon('trash', SVG$S);

var SVG$T = (function (props) {
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 48 48"
  }), React.createElement("path", {
    d: "M42 27a2 2 0 0 1 2 2v14a2 2 0 0 1-2.25 1.985l-.1.01-.15.005h-35a2.02 2.02 0 0 1-.25-.015A2 2 0 0 1 4 43V29a2 2 0 1 1 4 0v12h32V29a2 2 0 0 1 2-2zM25.414 4.586l14 14a2 2 0 0 1-2.828 2.828L25.992 10.82c.005.06.008.12.008.181v22a2 2 0 1 1-4 0V11c0-.06.003-.12.008-.18L11.414 21.414a2 2 0 0 1-2.828-2.828l14-14a2 2 0 0 1 2.828 0zM24 8.828l-.18.18a2.026 2.026 0 0 1 .36 0l-.18-.18z",
    fillRule: "nonzero"
  }));
});

/**
* @file 图标upload
* @author zhanglili
*/
var IconUpload = createIcon('upload', SVG$T);

export { IconAngleDoubleLeft, IconAngleDoubleRight, IconAngleDoubleUp, IconAngleLeft, IconAngleRight, IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowToTop, IconArrowUp, IconBullseye, IconCalendar, IconCheck, IconCheckCircle, IconChevronDoubleDown, IconChevronDoubleLeft, IconChevronDoubleRight, IconChevronDoubleUp, IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp, IconClock, IconClose, IconDoubleEleven, IconEdit, IconEllipsis, IconEnvelope, IconExclamationCircle, IconExit, IconEye, IconFile, IconFilter, IconFlag, IconFolder, IconFolderOpen, IconHome, IconHot, IconImageAdd, IconInfoCircle, IconLoading, IconMessage, IconMinus, IconMore, IconPlus, IconQuestionCircle, IconRefresh, IconSearch, IconSetupSystem, IconSort, IconSync, IconTimes, IconTimesCircle, IconToolbarOcpc, IconTrash, IconUpload };
//# sourceMappingURL=index.js.map
