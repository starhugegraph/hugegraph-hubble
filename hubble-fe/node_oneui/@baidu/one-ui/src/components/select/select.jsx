import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import {IconChevronDown, IconTimesCircle, IconClose} from '@baidu/one-ui-icon';
import OneSelect from './common/oneSelect';
import {transSizeOfDefault} from '../../core/commonTools';

const isMultipleMode = props => props.mode === 'multiple';

const isTagsMode = props => props.mode === 'tags';

class Select extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 自定义类名 */
        className: PropTypes.string,
        /** 下拉选择尺寸 */
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        /** 搜索时候无内容展现 */
        notFoundContent: PropTypes.node,
        transitionName: PropTypes.string,
        choiceTransitionName: PropTypes.string,
        /** 是否可搜索 */
        showSearch: PropTypes.bool,
        /** 是否允许清空 */
        allowClear: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 搜索时的placeholder */
        placeholder: PropTypes.string,
        /** 下拉选择自定义类名 */
        dropdownClassName: PropTypes.string,
        /** 搜索时触发 */
        onSearch: PropTypes.func,
        /** 搜索时是否支持筛选 */
        filterOption: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func
        ]),
        /** 下拉选择的value */
        value: PropTypes.any,
        /** 下拉选择默认选中的value */
        defaultValue: PropTypes.any,
        /** 下拉选择类型 */
        mode: PropTypes.oneOf(['default', 'multiple', 'combobox', 'tags']),
        /** 搜索高亮的节点，默认'children', 如果是value,展示value值 */
        optionLabelProp: PropTypes.string,
        /** 选中触发的onChange */
        onChange: PropTypes.func,
        /** 搜索框失去焦点触发 */
        onBlur: PropTypes.func,
        /** 搜索框触发焦点 */
        onFocus: PropTypes.func,
        /** 下拉弹窗是否与target同宽 */
        dropdownMatchSelectWidth: PropTypes.bool,
        /** 筛选的节点 */
        optionFilterProp: PropTypes.string,
        /** 默认第一个是否高亮 */
        defaultActiveFirstOption: PropTypes.bool,
        /** 弹窗挂载的节点 */
        getPopupContainer: PropTypes.func,
        /** dropdown visible改变的时候触发 */
        onDropdownVisibleChange: PropTypes.func,
        /** 鼠标移入触发 */
        onMouseEnter: PropTypes.func,
        /** 鼠标移出触发 */
        onMouseLeave: PropTypes.func,
        /** 弹窗弹出来的trigger */
        trigger: PropTypes.string,
        /** 下拉选择器名称 */
        selectorName: PropTypes.string,
        /**
         * 外部指定的报错信息 - 该字段只在mode为multiple时生效
         */
        errorMessage: PropTypes.string,
        /**
         * 指定输入框的宽度
         */
        width: PropTypes.number,
        /** 自定义target区域的规则, 只能用于单选，或者多选中的 emun、count、custom情况 */
        customRenderTarget: PropTypes.func,
        /**
         * 多选的target回填，四类回填 enum, list, count, custom （枚举，陈列，计数，自定义枚举）
         */
        multipleRenderTargetMode: PropTypes.oneOf(['enum', 'list', 'count', 'custom']),
        defaultVisible: PropTypes.bool,
        suffixIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        checkboxPrefixCls: PropTypes.string
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-select',
        className: '',
        size: 'small',
        showSearch: false,
        transitionName: 'slide-up',
        choiceTransitionName: 'zoom',
        trigger: 'click',
        optionLabelProp: 'children',
        notFoundContent: '无匹配结果',
        multipleRenderTargetMode: 'list',
        suffixIcon: null,
        checkboxPrefixCls: 'new-fc-one-checkbox'
    };

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: (props.errorMessage && isMultipleMode(props)) || ''
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('errorMessage' in nextProps
        && nextProps.errorMessage !== prevState.errorMessage
        && isMultipleMode(nextProps)) {
            return {
                errorMessage: nextProps.errorMessage
            };
        }
        return null;
    }

    onChange = (value, options) => {
        const props = this.props;
        const {mode, maxTagCount} = props;
        if (props.onChange) {
            props.onChange(value, options);
        }
        if (!('errorMessage' in this.props)) {
            const isMultiple = mode === 'multiple';
            const valueLength = value && value.length;
            if (isMultiple) {
                const errorMessage = valueLength > maxTagCount ? `已超过最大可选数量${valueLength - maxTagCount}个` : '';
                this.setState({
                    errorMessage
                });
            }
        }
    }

    focus() {
        this.rcSelect.focus();
    }

    blur() {
        this.rcSelect.blur();
    }

    saveSelect = node => {
        this.rcSelect = node;
    }

    render() {
        const props = this.props;
        const {
            prefixCls,
            className = '',
            mode,
            rootClassName,
            onChange,
            width,
            style,
            multipleRenderTargetMode,
            dropdownClassName,
            customRenderTarget,
            visible,
            defaultVisible,
            suffixIcon,
            checkboxPrefixCls,
            ...restProps
        } = props;
        let {notFoundContent, optionLabelProp} = props;
        const errorMessage = this.state.errorMessage;
        let size = this.props.size;
        size = transSizeOfDefault(size, 'small');
        let selectCls = classNames(`${prefixCls}-${size}`, {
            [`${prefixCls}-error-line`]: errorMessage
        });
        const isMultiple = isMultipleMode(props);
        const isTags = isTagsMode(props);
        const isCombobox = mode === 'combobox';
        if (isCombobox) {
            notFoundContent = null;
            // children 带 dom 结构时，无法填入输入框
            optionLabelProp = 'value';
        }
        const modeConfig = {
            multiple: isMultiple,
            combobox: isCombobox,
            tags: isTags
        };
        const selectStyle = {
            ...style
        };
        if (width) {
            selectStyle.width = `${width}px`;
        }
        const dropdownCls = classNames(dropdownClassName, `${prefixCls}-dropdown-${size}`);
        if (!isMultiple && !isTags) {
            selectCls = classNames(
                selectCls,
                className
            );
            return (
                <OneSelect
                    {...restProps}
                    {...modeConfig}
                    prefixCls={prefixCls}
                    className={selectCls}
                    optionLabelProp={optionLabelProp}
                    notFoundContent={notFoundContent}
                    inputIcon={<IconChevronDown />}
                    clearIcon={<IconTimesCircle />}
                    removeIcon={<IconClose />}
                    onChange={onChange}
                    style={selectStyle}
                    customRenderTarget={customRenderTarget}
                    dropdownClassName={dropdownCls}
                    defaultOpen={defaultVisible}
                    suffixIcon={suffixIcon}
                    checkboxPrefixCls={checkboxPrefixCls}
                />
            );
        }
        const selectRootCls = classNames(`${prefixCls}-container`, className, {
            [`${prefixCls}-multiple`]: isMultiple
        });
        return (
            <div className={selectRootCls}>
                <OneSelect
                    {...restProps}
                    {...modeConfig}
                    prefixCls={prefixCls}
                    className={selectCls}
                    optionLabelProp={optionLabelProp}
                    notFoundContent={notFoundContent}
                    inputIcon={<IconChevronDown />}
                    clearIcon={<IconTimesCircle />}
                    removeIcon={<IconClose />}
                    onChange={this.onChange}
                    style={selectStyle}
                    dropdownClassName={dropdownCls}
                    size={size}
                    defaultOpen={defaultVisible}
                    suffixIcon={suffixIcon}
                    titleCallback={{
                        type: multipleRenderTargetMode,
                        selectorName: this.props.selectorName,
                        customRenderTarget:
                            multipleRenderTargetMode === 'custom'
                                ? customRenderTarget
                                : null
                    }}
                    checkboxPrefixCls={checkboxPrefixCls}
                />
                {
                    errorMessage ? (
                        <div className={`${prefixCls}-selection-text-error`}>
                            {errorMessage}
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

polyfill(Select);

export default Select;
