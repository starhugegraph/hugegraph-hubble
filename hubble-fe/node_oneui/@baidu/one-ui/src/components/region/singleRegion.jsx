import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import Cascader from '../cascader';
import {
    formatSingleOptions
} from '../../core/regionTools';
import {formatOldKeyToNew, transNewKeyToOld, formatDisabledValueKeys} from './common/regionBody';

class SingleRegion extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /**
         * selectedValue, 传入需要勾选的checkbox的地域key
         */
        selectedValue: PropTypes.arrayOf(PropTypes.number),
        /**
         * disabledValue, 传入禁止勾选的checkbox的地域，array格式，数组里面是disabledKey
         */
        disabledValue: PropTypes.arrayOf(PropTypes.number),
        /**
         * 自定义类名
         */
        className: PropTypes.string,
        /**
         * onChange, 点击复选框的时候的回调函数,
         * 传出 e,
         * e.options 当前选中的options,
         * e.selectedValue 为当前被选中的value集合
         */
        onChange: PropTypes.func,
        /**
         * searchBox的placeholder
         */
        searchBoxPlaceholder: PropTypes.string,
        /**
         * searchbox的width
         */
        searchBoxWidth: PropTypes.number,
        /**
         * 是否展示区县一级，默认是展示，如果使用自定义region，该字段失效
         */
        showDistrict: PropTypes.bool,
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
             * 父子级关系, key为父级别地域key, 子级为该父级别对应的子级的ids
             * regionFiliationMap: {
             *    1: [378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395],
             *    2: [396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 413, 414]
             * }
             */
            regionFiliationMap: PropTypes.object,
            /**
             * 第一层级的key，比如国家， [中国, 海外]
             * topLevel: [998, 999]
             */
            topLevel: PropTypes.array
        }),
        /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
        getPopupContainer: PropTypes.func,
        /** 弹层的className */
        popupClassName: PropTypes.string,
        /** 除去港澳台的，如果需要可以通过下面字段传入 */
        additionOption: PropTypes.array,
        /** 是否需要input上有清空按钮 */
        allowClear: PropTypes.bool,
        /** 选择下一级的时候，是否实时带入选项 */
        changeOnSelect: PropTypes.bool,
        isNewRegionKeyMode: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        cascaderPrefixCls: PropTypes.string
    }

    static defaultProps = {
        className: '',
        searchBoxPlaceholder: '搜索地域',
        prefixCls: 'new-fc-one-single-region',
        searchBoxWidth: 200,
        showDistrict: true,
        popupClassName: '',
        additionOption: [],
        allowClear: true,
        changeOnSelect: false,
        size: 'small',
        cascaderPrefixCls: 'new-fc-one-cascader'
    }

    constructor(props) {
        super(props);
        const {disabledValue, customRegion, showDistrict, additionOption, isNewRegionKeyMode} = props;
        let selectedValue = props.selectedValue;
        const disabledValueKeys = formatDisabledValueKeys(disabledValue, isNewRegionKeyMode);
        selectedValue = (selectedValue && selectedValue.map(value => `${value}`)) || null;
        this.state = {
            options: formatSingleOptions(customRegion, disabledValueKeys, showDistrict, additionOption),
            selectedValue: transNewKeyToOld(selectedValue, isNewRegionKeyMode),
            prevProps: props
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const newState = {
            prevProps: nextProps
        };
        const prevProps = prevState.prevProps;
        const {disabledValue, customRegion, showDistrict, additionOption, isNewRegionKeyMode} = nextProps;
        if ('selectedValue' in nextProps
            && nextProps.selectedValue !== prevState.selectedValue) {
            newState.selectedValue = transNewKeyToOld(nextProps.selectedValue, isNewRegionKeyMode);
        }
        if ('disabledValue' in nextProps
        && disabledValue !== prevProps.disabledValue) {
            const disabledValueKeys = formatDisabledValueKeys(disabledValue, isNewRegionKeyMode);
            newState.options = formatSingleOptions(customRegion, disabledValueKeys, showDistrict, additionOption);
        }
        return newState;
    }

    onChange = (value, options) => {
        const {onChange, isNewRegionKeyMode} = this.props;
        if (onChange) {
            const selectedValue = (value && value.map(item => +item)) || [];
            onChange({
                options,
                selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
            });
        }
    }

    render() {
        const {
            prefixCls,
            className,
            searchBoxWidth,
            searchBoxPlaceholder,
            getPopupContainer,
            popupClassName,
            allowClear,
            changeOnSelect,
            size,
            cascaderPrefixCls
        } = this.props;
        const {options, selectedValue} = this.state;
        const regionCls = classnames(prefixCls, className);
        const cascaderProps = {
            className: `${prefixCls}-cascader`,
            popupClassName,
            onChange: this.onChange,
            options,
            width: searchBoxWidth,
            placeholder: searchBoxPlaceholder,
            getPopupContainer,
            showSearch: true,
            allowClear,
            changeOnSelect,
            size,
            prefixCls: cascaderPrefixCls
        };
        if (selectedValue) {
            cascaderProps.value = (selectedValue || []).map(item => `${item}`);
        }
        return (
            <div className={regionCls}>
                <Cascader {...cascaderProps} />
            </div>
        );
    }
}

polyfill(SingleRegion);

export default SingleRegion;
