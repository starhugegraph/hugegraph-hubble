/**
 * @file propTypes 枚举
 */
/* eslint-disable consistent-return, prefer-rest-params, import/prefer-default-export */
import PropTypes from 'prop-types';

function valueType(props, propName, componentName) {
    const basicType = PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]);

    const labelInValueShape = PropTypes.shape({
        key: basicType.isRequired,
        label: PropTypes.node
    });
    if (props.labelInValue) {
        const validate = PropTypes.oneOfType([
            PropTypes.arrayOf(labelInValueShape),
            labelInValueShape
        ]);
        const error = validate(...arguments);
        if (error) {
            return new Error(
                `Invalid prop \`${propName}\` supplied to \`${componentName}\`, `
            );
        }
    } else if (
        (props.mode === 'multiple' || props.mode === 'tags' || props.multiple || props.tags)
        && props[propName] === ''
    ) {
        return new Error(
            `Invalid prop \`${propName}\` of type \`string\` supplied to \`${componentName}\``
        );
    } else {
        const validate = PropTypes.oneOfType([
            PropTypes.arrayOf(basicType),
            basicType
        ]);
        return validate(...arguments);
    }
}

export const SelectPropTypes = {
    id: PropTypes.string,
    defaultActiveFirstOption: PropTypes.bool,
    multiple: PropTypes.bool,
    filterOption: PropTypes.any,
    children: PropTypes.any,
    showSearch: PropTypes.bool,
    disabled: PropTypes.bool,
    allowClear: PropTypes.bool,
    showArrow: PropTypes.bool,
    tags: PropTypes.bool,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    transitionName: PropTypes.string,
    optionLabelProp: PropTypes.string,
    optionFilterProp: PropTypes.string,
    animation: PropTypes.string,
    choiceTransitionName: PropTypes.string,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
    onPopupScroll: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    placeholder: PropTypes.any,
    onDeselect: PropTypes.func,
    labelInValue: PropTypes.bool,
    value: valueType,
    defaultValue: valueType,
    dropdownStyle: PropTypes.object,
    maxTagTextLength: PropTypes.number,
    maxTagCount: PropTypes.number,
    maxTagPlaceholder: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    tokenSeparators: PropTypes.arrayOf(PropTypes.string),
    getInputElement: PropTypes.func,
    showAction: PropTypes.arrayOf(PropTypes.string),
    clearIcon: PropTypes.node,
    inputIcon: PropTypes.node,
    removeIcon: PropTypes.node,
    menuItemSelectedIcon: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    titleCallback: PropTypes.shape({
        type: PropTypes.string, // 三类回填 enum, list, count
        selectorName: PropTypes.string // 选择已选计数需要填写
    }),
    trigger: PropTypes.string, // 只对单层的下拉选择有效果，
    disabledReason: PropTypes.string, // 与disabled同用，
    selectorName: PropTypes.string, // 选择器名称， 单层选择时候，无默认值展示这个
    customRenderTarget: PropTypes.func,
    size: PropTypes.string,
    suffixIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    checkboxPrefixCls: PropTypes.string
};
