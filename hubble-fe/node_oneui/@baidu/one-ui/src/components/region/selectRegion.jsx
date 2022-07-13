import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import Input from '../input';
import RegionBody from './common/regionBody';
import Layer from '../popLayer';
// import Icon from '../icon';
import tools from '../../core';
import Button from '../button';
import {
    getFirstLevelDisabledValues
} from '../../core/regionTools';

const Search = Input.Search;
const optionsShape = PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    children: optionsShape
});
const getRegionNames = tools.region.getRegionNames;

class SelectRegion extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /**
         * 用于自定义地域
         */
        customRegion: PropTypes.shape({
            /**
             * 地域的名称，key => value对应
             * regionNames: {
             *    1: '北京市',
             *    2: '上海市'
             * }
             */
            regionNames: PropTypes.object,
            /**
             * 自定义的直辖市编码，即省、市为一个id，比如北京市，天津市，重庆市。。。，如果没有传[]
             * directCityCode: [1, 2, 3, 33]
             */
            directCityCode: PropTypes.array,
            /**
             * 父子级关系, key为父级别地域key, 子级为该父级别对应的子级的ids
             * regionFiliationMap: {
             *    1: [378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395],
             *    2: [396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 413, 414]
             * }
             */
            regionFiliationMap: PropTypes.object,
            /**
             * 祖先关系， key为子级地域的key, value为对应的父级的key
             * ancestorsRegionMap: {
             *    1: 998,
             *    2: 998
             * }
             */
            ancestorsRegionMap: PropTypes.object,
            /**
             * 第一层级的key，比如国家， [中国, 海外]
             * topLevel: [998, 999]
             */
            topLevel: PropTypes.array
        }),
        /**
         * selectedValue, 传入需要勾选的checkbox的地域key
         */
        selectedValue: PropTypes.array,
        /**
         * disabledValue, 传入禁止勾选的checkbox的地域，格式可为object
         * {
         *      key: disabledReason
         * }
         * 比如：
         * {
         *      12: '该地域不可选'
         * }
         * 为object禁止理由也可以为空
         */
        disabledValue: PropTypes.object,
        /**
         * 自定义类名
         */
        className: PropTypes.string,
        /**
         * onChange, 点击复选框的时候的回调函数,
         * 传出 e,
         * e.target.value为当前点击的value,
         * e.target.checked当前点击状态，
         * e.selectedValue 为当前被选中的value集合
         */
        onChange: PropTypes.func,
        /**
         * onSearchBoxFocus, 搜索框focus触发的函数
         */
        onSearchBoxFocus: PropTypes.func,
        /**
         * onSearchBoxBlur, 搜索框失焦触发的函数
         */
        onSearchBoxBlur: PropTypes.func,
        /**
         * onSearchBoxChange, 搜索框onChange触发
         */
        onSearchBoxChange: PropTypes.func,
        /**
         * onSearchBoxClick, 点击搜索按钮
         */
        onSearchBoxClick: PropTypes.func,
        /**
         * searchBox的placeholder
         */
        searchBoxPlaceholder: PropTypes.string,
        /**
         * 清除搜索框的回调函数
         */
        onSearchBoxClear: PropTypes.func,
        /**
         * 搜索的value
         */
        searchValue: PropTypes.string,
        /**
         * searchbox的width
         */
        searchBoxWidth: PropTypes.number,
        /**
         * 是否展示区县一级，默认是展示, 如果使用自定义region，该字段失效
         */
        showDistrict: PropTypes.bool,
        /**
         * 弹层的className
         */
        selectClassName: PropTypes.string,
        /**
         * 选择器名称
         */
        selectorName: PropTypes.string,
        /**
         * 弹层是否可视化
         */
        visible: PropTypes.bool,
        /**
         * visible change的时候触发
         */
        onVisibleChange: PropTypes.func,
        /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
        getPopupContainer: PropTypes.func,
        /** 点击确定的回调函数 */
        onConfirm: PropTypes.func,
        /** 点击取消的回调函数 */
        onCancel: PropTypes.func,
        /** 点击确定的时候的校验器，可进行错误校验 */
        validator: PropTypes.func,
        searchInputDisabled: PropTypes.bool,
        disabled: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        buttonProps: PropTypes.object,
        checkboxPrefixCls: PropTypes.string,
        searchPrefixCls: PropTypes.string,
        buttonPrefixCls: PropTypes.string,
        popLayerPrefixCls: PropTypes.string
    }

    static defaultProps = {
        className: '',
        searchBoxPlaceholder: '搜索地域',
        prefixCls: 'new-fc-one-select-region',
        searchBoxWidth: 360,
        showDistrict: true,
        selectorName: '请选择地域',
        searchInputDisabled: false,
        disabled: false,
        size: 'small',
        buttonProps: {},
        checkboxPrefixCls: 'new-fc-one-checkbox',
        searchPrefixCls: 'new-fc-one-input-search',
        buttonPrefixCls: 'new-fc-one-btn',
        popLayerPrefixCls: 'new-fc-one-popLayer'
    }

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            searchValue: props.searchValue || '',
            selectedValue: props.selectedValue || [],
            visible: props.visible || false,
            innerSelectValue: props.selectedValue || [],
            errorMsg: ''
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        const visible = this.state.visible;
        const newState = {};
        if (visible !== prevState.visible) {
            if ('selectedValue' in this.props) {
                const selectedValue = this.props.selectedValue;
                newState.selectedValue = selectedValue;
                newState.innerSelectValue = selectedValue;
                newState.errorMsg = '';
                this.setState(newState);
            }
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('selectedValue' in nextProps
        && nextProps.selectedValue !== prevState.selectedValue) {
            return {
                selectedValue: nextProps.selectedValue,
                innerSelectValue: nextProps.innerSelectValue
            };
        }
        return null;
    }

    onSearchBoxBlur = e => {
        const onSearchBoxBlur = this.props.onSearchBoxBlur;
        if (onSearchBoxBlur) {
            onSearchBoxBlur(e);
        }
        this.setState({
            isFocused: false
        });
    }

    onSearchBoxFocus = e => {
        const onSearchBoxFocus = this.props.onSearchBoxFocus;
        if (onSearchBoxFocus) {
            onSearchBoxFocus(e);
        }
        this.setState({
            isFocused: true
        });
    }

    onSearchBoxChange = e => {
        const onSearchBoxChange = this.props.onSearchBoxChange;
        if (onSearchBoxChange) {
            onSearchBoxChange(e);
        }
        const searchValue = e.target.value;
        this.setState({
            searchValue
        });
    }

    onSearchBoxClear = e => {
        const onSearchBoxClear = this.props.onSearchBoxClear;
        if (onSearchBoxClear) {
            onSearchBoxClear(e);
        }
        this.setState({
            searchValue: ''
        });
    }

    onClickSearchItem = () => {
        this.setState({
            searchValue: '',
            errorMsg: ''
        });
    }

    onChangeCheckbox = params => {
        const selectedValue = params.selectedValue;
        this.setState({
            errorMsg: '',
            innerSelectValue: selectedValue
        });
    }

    onChangeCheckAll = params => {
        const selectedValue = params.selectedValue;
        this.setState({
            errorMsg: '',
            innerSelectValue: selectedValue
        });
    }

    onLayerVisibleChange = visible => {
        const onVisibleChange = this.props.onVisibleChange;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        if ('visible' in this.props) {
            return;
        }
        this.setState({
            visible
        });
    }

    onConfirm = () => {
        const {onConfirm, validator} = this.props;
        const innerSelectValue = this.state.innerSelectValue;
        if (validator) {
            const error = validator(innerSelectValue);
            if (error) {
                this.setState({
                    errorMsg: error
                });
                return;
            }
        }
        if (onConfirm) {
            onConfirm({
                selectedValue: innerSelectValue
            });
        }
        const newState = {};
        if (!('selectedValue' in this.props)) {
            newState.selectedValue = innerSelectValue;
        }
        if (!('visible' in this.props)) {
            newState.visible = false;
        }
        this.setState(newState);
    }

    onCancel = () => {
        const onCancel = this.props.onCancel;
        if (onCancel) {
            onCancel();
        }
        const newState = {};
        if (!('visible' in this.props)) {
            newState.visible = false;
        }
        this.setState(newState);
    }

    renderSearchBoxContainer = () => {
        const searchValue = this.state.searchValue;
        const {
            searchBoxPlaceholder, prefixCls, onSearchBoxClick,
            searchBoxWidth, searchInputDisabled, searchPrefixCls
        } = this.props;
        const searchProps = {
            placeholder: searchBoxPlaceholder,
            value: searchValue,
            isShowSearchIcon: true,
            onBlur: this.onSearchBoxBlur,
            onFocus: this.onSearchBoxFocus,
            onChange: this.onSearchBoxChange,
            onSearch: onSearchBoxClick,
            onClearClick: this.onSearchBoxClear,
            width: searchBoxWidth,
            disabled: searchInputDisabled,
            prefixCls: searchPrefixCls
        };
        return (
            <div className={`${prefixCls}-search-box`}>
                <Search {...searchProps} />
            </div>
        );
    }

    renderLayer = () => {
        const {prefixCls, selectClassName, customRegion, disabledValue, buttonPrefixCls} = this.props;
        const {isFocused, searchValue, visible, innerSelectValue, errorMsg} = this.state;
        const layerCls = `${prefixCls}-layer`;
        const regionCls = classnames(layerCls, selectClassName, {
            [`${layerCls}-isFocused`]: isFocused,
            [`${layerCls}-isSearching`]: !!searchValue
        });
        const regionBodyProps = {
            ...this.props,
            prefixCls: layerCls,
            searchValue,
            isFocused,
            onClickSearchItem: this.onClickSearchItem,
            onChange: this.onChangeCheckbox,
            onChangeCheckAll: this.onChangeCheckAll,
            selectedValue: innerSelectValue,
            disabledValue: getFirstLevelDisabledValues(disabledValue, customRegion)
        };
        if (!visible) {
            return <span />;
        }
        return (
            <div className={regionCls}>
                {this.renderSearchBoxContainer()}
                <RegionBody {...regionBodyProps} />
                {
                    !searchValue ? (
                        <div className={`${layerCls}-button`}>
                            {
                                errorMsg ? (
                                    <div className={`${layerCls}-error-msg`}>
                                        {errorMsg}
                                    </div>
                                ) : null
                            }
                            <Button
                                type="primary"
                                onClick={this.onConfirm}
                                prefixCls={buttonPrefixCls}
                            >
                                确定
                            </Button>
                            <Button
                                type="normal"
                                onClick={this.onCancel}
                                prefixCls={buttonPrefixCls}
                            >
                                取消
                            </Button>
                        </div>
                    ) : null
                }
            </div>
        );
    }

    renderLabel = () => {
        const customRegion = this.props.customRegion;
        const selectedValue = [...this.state.selectedValue];
        const selectedValueLength = selectedValue.length;
        const labelValue = selectedValue.splice(0, 2);
        const regionNames = getRegionNames(customRegion);
        if (!selectedValueLength) {
            return null;
        }
        let str = '';
        labelValue.forEach((value, index) => {
            str += `${regionNames[value]}`;
            if (index !== labelValue.length - 1) {
                str += '、';
            }
        });
        if (selectedValueLength <= 2) {
            return str;
        }

        return `${str}等${selectedValueLength}个`;
    }

    render() {
        const {
            prefixCls,
            className,
            getPopupContainer,
            selectorName,
            disabled,
            size,
            buttonProps,
            buttonPrefixCls,
            popLayerPrefixCls
        } = this.props;
        const {selectedValue, visible} = this.state;
        const regionCls = classnames(prefixCls, className, {
            [`${prefixCls}-has-value`]: selectedValue.length
        });
        const layerProps = {
            trigger: 'click',
            visible,
            onVisibleChange: this.onLayerVisibleChange,
            overlay: this.renderLayer,
            dropdownMatchSelectWidth: false,
            getPopupContainer,
            prefixCls: popLayerPrefixCls
        };
        const iconType = visible ? 'angle-up' : 'angle-down';
        const buttonContainer = (
            <Button
                icon={iconType}
                className={`${prefixCls}-button`}
                disabled={disabled}
                size={size}
                prefixCls={buttonPrefixCls}
                {...buttonProps}
            >
                {this.renderLabel() || selectorName}
            </Button>
        );
        if (disabled) {
            return buttonContainer;
        }
        return (
            <div className={regionCls}>
                <Layer {...layerProps}>
                    {buttonContainer}
                </Layer>
            </div>
        );
    }
}

polyfill(SelectRegion);
export default SelectRegion;
