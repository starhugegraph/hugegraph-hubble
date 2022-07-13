import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import partial from 'lodash/partial';
import values from 'lodash/values';
import Checkbox from '../../checkbox';
import Icon from '../../icon';
import Tooltip from '../../tooltip';
import {
    firstLevelRegion,
    getRegionFiliation,
    levelMap,
    getChildrenByKey,
    renderChildrenCheckMap,
    renderParentMap,
    getRegionNames,
    getSearchLabel,
    formatSelectedValueToMap,
    formatToIndeterminateMap,
    formatCheckedArray,
    getCurrentLevelByKey,
    getDirectCityCode,
    transNewKeyToOldRegionKey,
    transOldKeyToNewRegionKey,
    getCheckAllStatus,
    formatCheckAllMap
} from '../../../core/regionTools';

export const formatOldKeyToNew = (selectedValue, isNewRegionKeyMode) => {
    if (isNewRegionKeyMode && selectedValue) {
        return selectedValue.map(value => transOldKeyToNewRegionKey(value));
    }
    return selectedValue;
};

export const transNewKeyToOld = (selectedValue, isNewRegionKeyMode) => {
    if (isNewRegionKeyMode && selectedValue) {
        return selectedValue.map(value => transNewKeyToOldRegionKey(value));
    }
    return selectedValue;
};

export const formatDisabledValueKeys = (disabledValue, isNewRegionKeyMode) => {
    return isNewRegionKeyMode ? transNewKeyToOld(disabledValue, isNewRegionKeyMode) : disabledValue;
};

class RegionBody extends PureComponent {
    static formatStateMap = props => {
        const {showDistrict, customRegion, isNewRegionKeyMode, disabledValue} = props;
        let selectedValue = props.selectedValue;
        selectedValue = transNewKeyToOld(selectedValue, isNewRegionKeyMode);
        if (!selectedValue) {
            return {
                checkedMap: {},
                indeterminateMap: {}
            };
        }
        const disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
        const selectCheckedMap = formatSelectedValueToMap(selectedValue, showDistrict, disabledValueKeys, customRegion);
        const checkedMap = selectCheckedMap.checkedMap;
        const indeterminateMap = selectCheckedMap.indeterminateMap;
        formatToIndeterminateMap(selectedValue, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
        return {
            checkedMap,
            indeterminateMap
        };
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        customRegion: PropTypes.object,
        selectedValue: PropTypes.array,
        disabledValue: PropTypes.object,
        onChange: PropTypes.func,
        searchValue: PropTypes.string,
        searchBoxWidth: PropTypes.number,
        notFountNode: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        onClickSearchItem: PropTypes.func.isRequired,
        showDistrict: PropTypes.bool.isRequired,
        isNewRegionKeyMode: PropTypes.bool,
        exceptionValues: PropTypes.array,
        checkboxPrefixCls: PropTypes.string,
        showCheckAll: PropTypes.bool,
        onChangeCheckAll: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-region',
        searchBoxWidth: 360,
        notFountNode: '没有相关地域',
        disabledValue: {},
        isNewRegionKeyMode: false,
        exceptionValues: [],
        checkboxPrefixCls: 'new-fc-one-checkbox',
        showCheckAll: false
    }

    constructor(props) {
        super(props);
        const customRegion = props.customRegion;
        this.firstOptions = firstLevelRegion(customRegion);
        this.regionNames = getRegionNames(customRegion);
        this.regionFiliation = getRegionFiliation(customRegion);
        this.directCityCode = getDirectCityCode(customRegion);
        const map = RegionBody.formatStateMap(props);
        this.state = {
            checkedMap: map.checkedMap,
            indeterminateMap: map.indeterminateMap,
            openLevel: levelMap.province,
            openValue: {
                [levelMap.province]: null,
                [levelMap.city]: null,
                [levelMap.district]: null
            },
            searchValue: props.searchValue || '',
            searchOptions: []
        };
    }

    static getDerivedStateFromProps = (nextProps, state) => {
        const searchValue = state.searchValue;
        const {showDistrict, disabledValue, customRegion, isNewRegionKeyMode, exceptionValues = []} = nextProps;
        const newState = {};
        const disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
        const regionNames = getRegionNames(customRegion);
        if (nextProps.searchValue !== searchValue) {
            newState.searchValue = nextProps.searchValue;
            const options = [];
            const regionValues = values(regionNames);
            const regionKeysByNames = Object.keys(regionNames);
            if (nextProps.searchValue) {
                regionValues.forEach((name, index) => {
                    const regionKey = regionKeysByNames[index];
                    /** 满足四个条件
                    * 1、有搜索到
                    * 2、不能选择区县时，区县相关不能被搜索到
                    * 3、disabledValue有值的时候，里面的value也不能被取到
                    * 4、exceptionValues里面的值也不能被取到
                    */
                    if (name.indexOf(nextProps.searchValue) > -1
                    && !(getCurrentLevelByKey(regionKey) === levelMap.district && !showDistrict)
                    && disabledValueKeys.indexOf(`${regionKey}`) === -1
                    && exceptionValues.indexOf(+regionKey) === -1) {
                        options.push(getSearchLabel(regionKey, customRegion));
                    }
                });
            }
            newState.searchOptions = options;
        }
        if ('selectedValue' in nextProps) {
            const obj = RegionBody.formatStateMap(nextProps);
            newState.checkedMap = obj.checkedMap;
            newState.indeterminateMap = obj.indeterminateMap;
        }
        return newState;
    }

    onChangCheckbox = (option, e) => {
        const value = option.value;
        const checked = e.target.checked;
        const {checkedMap, indeterminateMap} = this.state;
        const {onChange, showDistrict, disabledValue, customRegion, isNewRegionKeyMode, exceptionValues} = this.props;
        const currentCheckedMap = {
            [value]: checked
        };
        const currentIndeterminateMap = {
            [value]: false
        };
        const disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
        renderChildrenCheckMap(value, currentCheckedMap, checked, currentIndeterminateMap, showDistrict, disabledValueKeys, customRegion);
        const newState = {};
        const newCheckedMap = {
            ...checkedMap,
            ...currentCheckedMap
        };
        renderParentMap(value, newCheckedMap, currentIndeterminateMap, disabledValueKeys, customRegion);
        newState.checkedMap = newCheckedMap;
        newState.indeterminateMap = {
            ...indeterminateMap,
            ...currentIndeterminateMap
        };
        if (!('selectedValue' in this.props)) {
            this.setState(newState);
        }
        if (onChange) {
            const selectedValue = formatCheckedArray(newCheckedMap, exceptionValues);
            onChange({
                target: {
                    value,
                    checked
                },
                selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
            });
        }
    }

    onClickRegionItem = (option, e) => {
        const disabled = e.target.dataset.disabled;
        const showDistrict = this.props.showDistrict;
        const regionFiliation = this.regionFiliation;
        const {level, value} = option;
        const {openValue, openLevel} = this.state;
        const canClick = option.canClick;
        if (!canClick) {
            this.setState({
                openValue: {
                    ...openValue,
                    [level]: value
                },
                openLevel: option.level
            });
            return;
        }
        if (disabled && +disabled === 1) {
            return;
        }
        let newValue = value;
        let newLevel = openLevel;
        newValue = {
            [level]: value
        };
        if (level !== levelMap.district
            && (regionFiliation[value] && regionFiliation[value].length)) {
            // 不等于区层级
            newLevel = level + 1;
        }
        if (showDistrict && this.directCityCode.indexOf(value) > -1) {
            // 直辖市的话，直接展示区
            newLevel = levelMap.district;
            newValue[levelMap.city] = value;
        }
        this.setState({
            openLevel: newLevel,
            openValue: {
                ...openValue,
                ...newValue
            }
        });
    }

    onClickSearchItem = e => {
        const {onClickSearchItem, onChange, disabledValue, showDistrict, customRegion, isNewRegionKeyMode, exceptionValues} = this.props;
        const index = e.target.dataset.index;
        const {searchOptions, checkedMap, indeterminateMap} = this.state;
        const option = searchOptions[+index] || {};
        const value = option.value || [];
        const key = value[0];
        if (onClickSearchItem) {
            onClickSearchItem(e);
        }
        if (key) {
            const checked = true;
            const newState = {};
            const newIndeterminateMap = {
                [key]: false,
                ...indeterminateMap
            };
            const newCheckedMap = {
                ...checkedMap,
                [key]: checked
            };
            const disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue), isNewRegionKeyMode);
            renderChildrenCheckMap(key, newCheckedMap, checked, newIndeterminateMap, showDistrict, disabledValueKeys, customRegion);
            renderParentMap(key, newCheckedMap, newIndeterminateMap, disabledValueKeys, customRegion);
            const openValue = {};
            let openLevel = value.length;
            value.forEach((currentKey, index) => {
                const currentIndex = value.length - index;
                if (currentIndex) {
                    openValue[currentIndex] = +currentKey;
                }
            });
            if (this.directCityCode.indexOf(openValue[levelMap.province]) > -1) {
                // 直辖市
                openValue[levelMap.district] = openValue[levelMap.city];
                openValue[levelMap.city] = openValue[levelMap.province];
                if (showDistrict) {
                    openLevel = levelMap.district;
                }
            }
            newState.openValue = openValue;
            newState.openLevel = openLevel;
            if (!('selectedValue' in this.props)) {
                newState.checkedMap = newCheckedMap;
                newState.indeterminateMap = newIndeterminateMap;
            }
            if (onChange) {
                const selectedValue = formatCheckedArray(newCheckedMap, exceptionValues);
                onChange({
                    target: {
                        value,
                        checked
                    },
                    selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
                });
            }
            this.setState(newState);
        }
    }

    renderArrow = (option, level) => {
        const showDistrict = this.props.showDistrict;
        const regionFiliation = this.regionFiliation;
        let showArrow = false;
        if ((showDistrict || (!showDistrict && level !== levelMap.city))
        && regionFiliation[option.value] && regionFiliation[option.value].length) {
            showArrow = true;
        }
        if (!showDistrict && this.directCityCode.indexOf(option.value) > -1) {
            // 不展示区，并且直辖市的话，就应该只有一层
            showArrow = false;
        }
        return showArrow;
    }

    renderCheckbox = option => {
        const value = option.value;
        const {checkedMap, indeterminateMap} = this.state;
        const disabledValue = Object.keys(this.props.disabledValue);
        const checked = checkedMap[value];
        const indeterminate = indeterminateMap[value];
        const checkboxProps = {
            checked,
            indeterminate,
            onChange: partial(this.onChangCheckbox, option),
            prefixCls: this.props.checkboxPrefixCls
        };
        if (disabledValue.indexOf(`${value}`) > -1) {
            checkboxProps.disabled = true;
        }
        return <Checkbox {...checkboxProps} />;
    }

    renderCheckboxList = (options, level) => {
        const {prefixCls, disabledValue, exceptionValues} = this.props;
        const disabledKeys = Object.keys(disabledValue);
        const openValue = this.state.openValue;
        const currentOpenValue = openValue[level];
        return (
            <div className={`${prefixCls}-checkbox-list`}>
                {
                    options.map(option => {
                        if (exceptionValues.indexOf(+option.value) > -1) {
                            return;
                        }
                        let selected = false;
                        if (+currentOpenValue === option.value) {
                            selected = true;
                        }
                        const disabled = disabledKeys.indexOf(`${option.value}`) > -1;
                        const itemCls = classnames(`${prefixCls}-checkbox-list-item`, {
                            [`${prefixCls}-checkbox-list-item-selected`]: selected,
                            [`${prefixCls}-checkbox-list-item-disabled`]: disabled,
                            [`${prefixCls}-checkbox-list-item-normal`]: !disabled
                        });
                        const showArrow = this.renderArrow(option, level);
                        option.canClick = showArrow;
                        const renderItem = (
                            <span>
                                {this.renderCheckbox(option)}
                                <span className={`${prefixCls}-checkbox-list-item-text`} data-disabled={disabled ? 1 : 0}>
                                    {option.label}
                                </span>
                            </span>
                        );
                        return (
                            <div
                                className={itemCls}
                                key={option.value}
                                data-disabled={disabled ? 1 : 0}
                                onClick={partial(this.onClickRegionItem, {
                                    ...option,
                                    level
                                })}
                                data-value={option.value}
                            >
                                {
                                    disabled && disabledValue[option.value] ? (
                                        <Tooltip
                                            title={disabledValue[option.value]}
                                            key={option.value}
                                            placement="topLeft"
                                        >
                                            {renderItem}
                                        </Tooltip>
                                    ) : renderItem
                                }
                                {
                                    showArrow ? (
                                        <Icon data-disabled={disabled ? 1 : 0} type="angle-right" />
                                    ) : null
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    onCheckAllChange = e => {
        const checked = e.target.checked;
        const {onChangeCheckAll, isNewRegionKeyMode, exceptionValues, showDistrict, disabledValue} = this.props;
        const disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue || []), isNewRegionKeyMode);
        const {checkedMap, indeterminateMap} = formatCheckAllMap(checked, showDistrict, disabledValueKeys, exceptionValues);
        if (!('selectedValue' in this.props)) {
            this.setState({
                checkedMap,
                indeterminateMap
            });
        }
        if (onChangeCheckAll) {
            const selectedValue = formatCheckedArray(checkedMap, exceptionValues);
            onChangeCheckAll({
                selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
            });
        }
    }

    renderShowCheckAll = () => {
        const {prefixCls, exceptionValues, isNewRegionKeyMode, showDistrict, disabledValue} = this.props;
        let selectedValue = this.props.selectedValue;
        selectedValue = transNewKeyToOld(selectedValue, isNewRegionKeyMode);
        const disabledValueKeys = formatDisabledValueKeys(Object.keys(disabledValue || []), isNewRegionKeyMode);
        const {checked, indeterminate} = getCheckAllStatus(selectedValue, showDistrict, disabledValueKeys, exceptionValues);
        const showCheckAllProps = {
            checked,
            indeterminate,
            onChange: this.onCheckAllChange,
            prefixCls: this.props.checkboxPrefixCls
        };
        return (
            <div className={`${prefixCls}-country-item`}>
                <div className={`${prefixCls}-country-checkbox`}>
                    <Checkbox {...showCheckAllProps} />
                    <span>全部</span>
                </div>
            </div>
        );
    }

    renderCountryAndProvince = () => {
        const firstOptions = this.firstOptions;
        const prefixCls = this.props.prefixCls;
        const countryCls = classnames(`${prefixCls}-level`, `${prefixCls}-country`);
        const showCheckAll = this.props.showCheckAll;
        return (
            <div className={countryCls}>
                {showCheckAll && firstOptions.length
                    ? this.renderShowCheckAll()
                    : null}
                {
                    firstOptions.map(option => {
                        return (
                            <div className={`${prefixCls}-country-item`} key={option.value}>
                                <div className={`${prefixCls}-country-checkbox`}>
                                    {this.renderCheckbox(option)}
                                    <span>{option.label}</span>
                                </div>
                                {
                                    this.renderCheckboxList(option.children, levelMap.province)
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderOtherLevel = level => {
        const {prefixCls, customRegion, exceptionValues} = this.props;
        const key = this.state.openValue[(level - 1)];
        const options = getChildrenByKey({key, level, customRegion, exceptionValues}) || [];
        return (
            <div className={`${prefixCls}-level`}>
                {this.renderCheckboxList(options, level)}
            </div>
        );
    }

    renderSearchRegion = () => {
        const {searchOptions, searchValue} = this.state;
        const {prefixCls, notFountNode} = this.props;
        if (!searchOptions.length) {
            return (
                <div className={`${prefixCls}-panel-search-container`}>
                    <div className={`${prefixCls}-not-found-container`}>
                        {notFountNode}
                    </div>
                </div>
            );
        }
        return (
            <div className={`${prefixCls}-panel-search-container`}>
                {
                    searchOptions.map((option, index) => {
                        return (
                            <div
                                className={`${prefixCls}-panel-search-item`}
                                key={index}
                                onClick={this.onClickSearchItem}
                                data-index={index}
                            >
                                {
                                    option.label && option.label.split('').map((text, labelIndex) => {
                                        if (searchValue.indexOf(text) > -1) {
                                            return <span data-index={index} key={labelIndex} className={`${prefixCls}-panel-search-item-highlight`}>{text}</span>;
                                        }
                                        if (text === '>') {
                                            return (
                                                <span data-index={index} key={labelIndex}>
                                                    {' '}
                                                    {text}
                                                    {' '}
                                                </span>
                                            );
                                        }
                                        return <span data-index={index} key={labelIndex}>{text}</span>;
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        const {prefixCls, searchBoxWidth, showDistrict} = this.props;
        const {openLevel, searchValue} = this.state;
        if (searchValue) {
            // 搜索模式
            return (
                <div className={`${prefixCls}-panel`} style={{width: `${searchBoxWidth}px`}}>
                    {this.renderSearchRegion()}
                </div>
            );
        }
        return (
            <div className={`${prefixCls}-panel`} style={{width: `${searchBoxWidth}px`}}>
                {this.renderCountryAndProvince()}
                {
                    openLevel > levelMap.province ? (
                        this.renderOtherLevel(levelMap.city)
                    ) : null
                }
                {
                    (openLevel === levelMap.district && showDistrict) ? (
                        this.renderOtherLevel(levelMap.district)
                    ) : null
                }
            </div>
        );
    }
}

polyfill(RegionBody);
export default RegionBody;
