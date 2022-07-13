import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Switch from '../../switch';
import tools from '../../../core';

const {
    switchIndex
} = tools.calendar;

export default class CalendarSwitch extends Component {
    static propTypes = {
        compareSwitch: PropTypes.bool,
        dateList: PropTypes.array,
        overRollDateList: PropTypes.array,
        sameOverRollDateList: PropTypes.array,
        onChangeSwitch: PropTypes.func,
        prefixCls: PropTypes.string,
        onChooseSwitchItem: PropTypes.func,
        showCompareSwitch: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-calendar-switch',
        dateList: ['today', 'yesterday', 'lastSevenDays', 'lastFourteenDays', 'lastThirtyDays', 'lastWeek', 'currentMonth', 'lastMonth'],
        overRollDateList: ['compareYesterday', 'compareLastWeek', 'compareLastMonth'],
        sameOverRollDateList: ['lastYearToday', 'lastYearWeek', 'lasterYearMonth']
    }

    constructor(props) {
        super(props);
        this.state = {
            compareSwitch: props.compareSwitch
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('compareSwitch' in nextProps) {
            this.setState({compareSwitch: nextProps.compareSwitch});
        }
    }

    onChange = checked => {
        this.setState({
            compareSwitch: checked
        });
        const onChangeSwitch = this.props.onChangeSwitch;
        if (onChangeSwitch) {
            onChangeSwitch(checked);
        }
    }

    onChooseSwitchItem = e => {
        const value = e.target.dataset.value;
        const onChooseSwitchItem = this.props.onChooseSwitchItem;
        if (onChooseSwitchItem) {
            onChooseSwitchItem(value);
        }
    }

    renderList = () => {
        const compareSwitch = this.state.compareSwitch;
        const {dateList, overRollDateList, prefixCls, sameOverRollDateList} = this.props;
        let el;
        if (!compareSwitch) {
            el = dateList.map(item => {
                return (
                    <div key={item} data-value={item} className={`${prefixCls}-list-item`}>
                        {switchIndex[item] && switchIndex[item].text}
                    </div>
                );
            });
        } else {
            el = (
                <div className={`${prefixCls}-list-box`}>
                    {overRollDateList && overRollDateList.length
                        ? (
                            <div className={`${prefixCls}-list-title`}>
                                环比
                            </div>
                        ) : null
                    }
                    {
                        overRollDateList.map(item => {
                            return (
                                <div key={item} data-value={item} className={`${prefixCls}-list-item`}>
                                    {switchIndex[item] && switchIndex[item].text}
                                </div>
                            );
                        })
                    }
                    {
                        sameOverRollDateList && sameOverRollDateList.length ? (
                            <div className={`${prefixCls}-list-title`}>
                                同比
                            </div>
                        ) : null
                    }
                    {
                        sameOverRollDateList.map(item => {
                            return (
                                <div key={item} data-value={item} className={`${prefixCls}-list-item`}>
                                    {switchIndex[item] && switchIndex[item].text}
                                </div>
                            );
                        })
                    }
                </div>
            );
        }
        return (
            <div className={`${prefixCls}-list`} onClick={this.onChooseSwitchItem}>
                {el}
            </div>
        );
    }

    render() {
        const compareSwitch = this.state.compareSwitch;
        const {prefixCls, showCompareSwitch} = this.props;
        const switchProps = {
            checked: compareSwitch,
            onChange: this.onChange,
            size: 'medium'
        };
        return (
            <div className={prefixCls}>
                {
                    showCompareSwitch ? (
                        <div className={`${prefixCls}-container`}>
                            <div>
                                <span className={`${prefixCls}-container-text`}>
                                    比较
                                </span>
                                <Switch {...switchProps} />
                            </div>
                        </div>
                    ) : null
                }
                {this.renderList()}
            </div>
        );
    }
}
