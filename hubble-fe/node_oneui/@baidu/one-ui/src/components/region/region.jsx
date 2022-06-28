import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import Input from '../input';
import RegionBody from './common/regionBody';
import {
    getFirstLevelDisabledValues
} from '../../core/regionTools';

const Search = Input.Search;
class Region extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /**
         * selectedValue, 传入需要勾选的checkbox的地域key
         */
        selectedValue: PropTypes.arrayOf(PropTypes.number),
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
             * 自定义的直辖市编码，即省、市为一个id，比如北京市，天津市，重庆市。。。，如果没有传[]
             * directCityCode: [1, 2, 3, 33]
             */
            directCityCode: PropTypes.arrayOf(PropTypes.number),
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
        searchInputDisabled: PropTypes.bool,
        // 搜索的前缀，可自定义reactNode
        prefixSearchRender: PropTypes.node,
        // 搜索的尾缀，可自定义 reactNode
        suffixSearchRender: PropTypes.node,
        // 是否展示输入框
        showSearchBox: PropTypes.bool,
        searchPrefixCls: PropTypes.string,
        checkboxPrefixCls: PropTypes.string
    }

    static defaultProps = {
        className: '',
        searchBoxPlaceholder: '搜索地域',
        prefixCls: 'new-fc-one-region',
        searchBoxWidth: 360,
        showDistrict: true,
        searchInputDisabled: false,
        showSearchBox: true,
        searchPrefixCls: 'new-fc-one-input-search',
        checkboxPrefixCls: 'new-fc-one-checkbox'
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: props.searchValue || '',
            regionWidth: props.searchBoxWidth
        };
    }

    componentDidMount() {
        const regionWidth = this.props.searchBoxWidth
            + ((this.prefixRenderRef && this.prefixRenderRef.offsetWidth) || 0)
            + ((this.suffixRenderRef && this.suffixRenderRef.offsetWidth) || 0);
        this.setState({
            regionWidth
        });
    }

    onSearchBoxBlur = e => {
        const onSearchBoxBlur = this.props.onSearchBoxBlur;
        if (onSearchBoxBlur) {
            onSearchBoxBlur(e);
        }
    }

    onSearchBoxFocus = e => {
        const onSearchBoxFocus = this.props.onSearchBoxFocus;
        if (onSearchBoxFocus) {
            onSearchBoxFocus(e);
        }
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
            searchValue: ''
        });
    }

    getPrefixRenderRef = ref => {
        this.prefixRenderRef = ref;
    }

    getSuffixRenderRef = ref => {
        this.suffixRenderRef = ref;
    }

    renderSearchBoxContainer = () => {
        const searchValue = this.state.searchValue;
        const {
            searchBoxPlaceholder, prefixCls, onSearchBoxClick,
            searchBoxWidth, searchInputDisabled, suffixSearchRender,
            prefixSearchRender, showSearchBox, searchPrefixCls
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
        const searchCls = classnames(`${prefixCls}-search-box`, {
            [`${prefixCls}-search-box-has-render`]: prefixSearchRender || suffixSearchRender,
            [`${prefixCls}-search-box-has-prefix`]: prefixSearchRender,
            [`${prefixCls}-search-box-has-suffix`]: suffixSearchRender
        });
        return (
            <div className={searchCls}>
                {
                    prefixSearchRender ? (
                        <span
                            ref={this.getPrefixRenderRef}
                            className={`${prefixCls}-prefix-render`}
                        >
                            {prefixSearchRender}
                        </span>
                    ) : null
                }
                {
                    showSearchBox ? <Search {...searchProps} /> : null
                }
                {
                    suffixSearchRender ? (
                        <span
                            ref={this.getSuffixRenderRef}
                            className={`${prefixCls}-suffix-render`}
                        >
                            {suffixSearchRender}
                        </span>
                    ) : null
                }
            </div>
        );
    }

    render() {
        const {
            prefixCls, className, customRegion, disabledValue,
            showSearchBox, prefixSearchRender, suffixSearchRender
        } = this.props;
        const {searchValue, regionWidth} = this.state;
        const regionCls = classnames(prefixCls, className, {
            [`${prefixCls}-isSearching`]: !!searchValue
        });
        const regionBodyProps = {
            ...this.props,
            searchBoxWidth: regionWidth,
            searchValue,
            onClickSearchItem: this.onClickSearchItem,
            disabledValue: getFirstLevelDisabledValues(disabledValue, customRegion)
        };
        return (
            <div className={regionCls}>
                {
                    (suffixSearchRender || prefixSearchRender || showSearchBox)
                        ? this.renderSearchBoxContainer()
                        : null
                }
                <RegionBody {...regionBodyProps} />
            </div>
        );
    }
}

polyfill(Region);

export default Region;
