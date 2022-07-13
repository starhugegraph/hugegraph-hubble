import { IconTimes, IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowToTop, IconArrowUp, IconBullseye, IconCalendar, IconCheckCircle, IconCheck, IconChevronDoubleDown, IconChevronDoubleLeft, IconChevronDoubleRight, IconChevronDoubleUp, IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp, IconClock, IconEllipsis, IconEnvelope, IconExclamationCircle, IconEye, IconFile, IconFilter, IconFlag, IconFolder, IconFolderOpen, IconHome, IconInfoCircle, IconLoading, IconMinus, IconPlus, IconQuestionCircle, IconSearch, IconSort, IconSync, IconTimesCircle, IconTrash, IconUpload } from '@baidu/one-ui-icon';
export var iconSvgMap = {
  times: IconTimes,
  'arrow-down': IconArrowDown,
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'arrow-to-top': IconArrowToTop,
  'arrow-up': IconArrowUp,
  bullseye: IconBullseye,
  calendar: IconCalendar,
  'check-circle': IconCheckCircle,
  check: IconCheck,
  'chevron-double-down': IconChevronDoubleDown,
  'chevron-double-left': IconChevronDoubleLeft,
  'chevron-double-right': IconChevronDoubleRight,
  'chevron-double-up': IconChevronDoubleUp,
  'chevron-down': IconChevronDown,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevron-up': IconChevronUp,
  clock: IconClock,
  ellipsis: IconEllipsis,
  envelope: IconEnvelope,
  'exclamation-circle': IconExclamationCircle,
  eye: IconEye,
  file: IconFile,
  filter: IconFilter,
  flag: IconFlag,
  'folder-open': IconFolderOpen,
  folder: IconFolder,
  home: IconHome,
  'info-circle': IconInfoCircle,
  loading: IconLoading,
  minus: IconMinus,
  plus: IconPlus,
  'question-circle': IconQuestionCircle,
  search: IconSearch,
  sort: IconSort,
  sync: IconSync,
  'times-circle': IconTimesCircle,
  trash: IconTrash,
  upload: IconUpload
};
export var convertToCamelCase = function convertToCamelCase(str) {
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