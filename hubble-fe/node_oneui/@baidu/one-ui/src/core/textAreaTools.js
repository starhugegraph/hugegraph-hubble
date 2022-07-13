/**
 * @file textArea工具方法
 */
const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  word-break: break-all !important;
  word-wrap: break-word !important;
`;

const SIZING_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing'
];

const computedStyleCache = {};
let hiddenTextarea;

function calculateNodeStyling(node, useCache = false) {
    const nodeRef = (
        node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name')
    );

    if (useCache && computedStyleCache[nodeRef]) {
        return computedStyleCache[nodeRef];
    }

    const style = window.getComputedStyle(node);

    const boxSizing = (
        style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing')
        || style.getPropertyValue('-webkit-box-sizing')
    );

    const paddingSize = (
        parseFloat(style.getPropertyValue('padding-bottom'))
        + parseFloat(style.getPropertyValue('padding-top'))
    );

    const borderSize = (
        parseFloat(style.getPropertyValue('border-bottom-width'))
        + parseFloat(style.getPropertyValue('border-top-width'))
    );

    const sizingStyle = SIZING_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');

    const nodeInfo = {
        sizingStyle,
        paddingSize,
        borderSize,
        boxSizing
    };

    if (useCache && nodeRef) {
        computedStyleCache[nodeRef] = nodeInfo;
    }

    return nodeInfo;
}

export default function calculateNodeHeight(
    uiTextNode,
    useCache = false,
    minRows = null,
    maxRows = null,
) {
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    if (uiTextNode && uiTextNode.getAttribute('wrap')) {
        hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
    } else {
        hiddenTextarea.removeAttribute('wrap');
    }
    const {
        paddingSize,
        borderSize,
        boxSizing,
        sizingStyle
    } = calculateNodeStyling(uiTextNode, useCache);

    hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
    hiddenTextarea.value = `六个字占位符${uiTextNode.value}` || uiTextNode.placeholder || '';

    let minHeight = -Infinity;
    let maxHeight = Infinity;
    let height = hiddenTextarea.scrollHeight;

    if (boxSizing === 'border-box') {
        height += borderSize;
    } else if (boxSizing === 'content-box') {
        height -= paddingSize;
    }

    if (minRows !== null || maxRows !== null) {
        hiddenTextarea.value = '';
        const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
        if (minRows !== null) {
            minHeight = singleRowHeight * minRows;
            if (boxSizing === 'border-box') {
                minHeight = minHeight + paddingSize + borderSize;
            }
            height = Math.max(minHeight, height);
        }
        if (maxRows !== null) {
            maxHeight = singleRowHeight * maxRows;
            if (boxSizing === 'border-box') {
                maxHeight = maxHeight + paddingSize + borderSize;
            }
            height = Math.min(maxHeight, height);
        }
    }
    return {height, minHeight, maxHeight, overflowY: ''};
}
