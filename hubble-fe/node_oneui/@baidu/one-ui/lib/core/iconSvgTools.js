"use strict";

exports.__esModule = true;
exports.convertToCamelCase = exports.iconSvgMap = void 0;

var _oneUiIcon = require("@baidu/one-ui-icon");

var iconSvgMap = {
  times: _oneUiIcon.IconTimes,
  'arrow-down': _oneUiIcon.IconArrowDown,
  'arrow-left': _oneUiIcon.IconArrowLeft,
  'arrow-right': _oneUiIcon.IconArrowRight,
  'arrow-to-top': _oneUiIcon.IconArrowToTop,
  'arrow-up': _oneUiIcon.IconArrowUp,
  bullseye: _oneUiIcon.IconBullseye,
  calendar: _oneUiIcon.IconCalendar,
  'check-circle': _oneUiIcon.IconCheckCircle,
  check: _oneUiIcon.IconCheck,
  'chevron-double-down': _oneUiIcon.IconChevronDoubleDown,
  'chevron-double-left': _oneUiIcon.IconChevronDoubleLeft,
  'chevron-double-right': _oneUiIcon.IconChevronDoubleRight,
  'chevron-double-up': _oneUiIcon.IconChevronDoubleUp,
  'chevron-down': _oneUiIcon.IconChevronDown,
  'chevron-left': _oneUiIcon.IconChevronLeft,
  'chevron-right': _oneUiIcon.IconChevronRight,
  'chevron-up': _oneUiIcon.IconChevronUp,
  clock: _oneUiIcon.IconClock,
  ellipsis: _oneUiIcon.IconEllipsis,
  envelope: _oneUiIcon.IconEnvelope,
  'exclamation-circle': _oneUiIcon.IconExclamationCircle,
  eye: _oneUiIcon.IconEye,
  file: _oneUiIcon.IconFile,
  filter: _oneUiIcon.IconFilter,
  flag: _oneUiIcon.IconFlag,
  'folder-open': _oneUiIcon.IconFolderOpen,
  folder: _oneUiIcon.IconFolder,
  home: _oneUiIcon.IconHome,
  'info-circle': _oneUiIcon.IconInfoCircle,
  loading: _oneUiIcon.IconLoading,
  minus: _oneUiIcon.IconMinus,
  plus: _oneUiIcon.IconPlus,
  'question-circle': _oneUiIcon.IconQuestionCircle,
  search: _oneUiIcon.IconSearch,
  sort: _oneUiIcon.IconSort,
  sync: _oneUiIcon.IconSync,
  'times-circle': _oneUiIcon.IconTimesCircle,
  trash: _oneUiIcon.IconTrash,
  upload: _oneUiIcon.IconUpload
};
exports.iconSvgMap = iconSvgMap;

var convertToCamelCase = function convertToCamelCase(str) {
  if (!str) {
    return;
  }

  var strArr = str.split('-');

  if (strArr[0] === '') {
    strArr.shift();
  }

  for (var i = 1, len = strArr.length; i < len; i++) {
    // 如果不为空，则转成大写
    if (strArr[i] !== '') {
      strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1);
    }
  }

  return "Icon" + strArr.join('');
};

exports.convertToCamelCase = convertToCamelCase;