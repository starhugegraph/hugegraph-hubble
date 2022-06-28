import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tools from '../../../core';

const {
    allHours,
    allMinutesAndSeconds,
    rulesMap
} = tools.calendar;

export default class CalendarTimeBody extends Component {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        updateInputValue: PropTypes.func.isRequired,
        timeObj: PropTypes.shape({
            hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            second: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }).isRequired,
        timeRules: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            timeObj: props.timeObj
        };
    }

    componentDidMount = () => {
        this.scrollToPosition(this.state.timeObj);
    }

    componentWillReceiveProps(nextProps) {
        if ('timeObj' in nextProps && (
            nextProps.timeObj.hour !== this.props.timeObj.hour
            || nextProps.timeObj.minute !== this.props.timeObj.minute
            || nextProps.timeObj.second !== this.props.timeObj.second
        )) {
            this.setState({
                timeObj: nextProps.timeObj
            });
        }
    }

    onClickItem = e => {
        const {flag, time} = e.target.dataset;
        const stateTimeObj = this.state.timeObj;
        const timeObj = JSON.stringify(stateTimeObj) === '{}' ? {
            hour: '00',
            minute: '00',
            second: '00'
        } : stateTimeObj;
        const updateInputValue = this.props.updateInputValue;
        timeObj[flag] = time;
        this.setState({
            timeObj
        });
        updateInputValue(timeObj);
    }

    getHourListElement = ref => {
        this.hourListElement = ref;
    }

    getMinuteListElement = ref => {
        this.minuteListElement = ref;
    }

    getSecondListElement = ref => {
        this.secondListElement = ref;
    }

    getBodyContainer = ref => {
        this.bodyContainer = ref;
    }

    scrollToPosition = ({hour, minute, second}) => {
        const bodyElement = this.bodyContainer;
        const hourElement = this.hourListElement && this.hourListElement.children && this.hourListElement.children[0];
        const minuteElement = this.minuteListElement && this.minuteListElement.children && this.minuteListElement.children[0];
        const secondElement = this.secondListElement && this.secondListElement.children && this.secondListElement.children[0];
        const hourNode = hourElement && hourElement.children && hourElement.children[+hour];
        const minuteNode = minuteElement && minuteElement.children && minuteElement.children[+minute];
        const secondNode = secondElement && secondElement.children && secondElement.children[+second];
        const bodyElementOffsetTop = bodyElement.offsetTop;
        if (hourNode && hourNode.offsetTop) {
            hourElement.parentElement.scrollTop = hourNode.offsetTop - bodyElementOffsetTop;
        }
        if (minuteNode && minuteNode.offsetTop) {
            minuteElement.parentElement.scrollTop = minuteNode.offsetTop - bodyElementOffsetTop;
        }
        if (secondNode && secondNode.offsetTop) {
            secondElement.parentElement.scrollTop = secondNode.offsetTop - bodyElementOffsetTop;
        }
    }

    renderList = ({dateFlag, ref}) => {
        const prefixCls = this.props.prefixCls;
        const timeObj = this.state.timeObj;
        const list = dateFlag === 'hour' ? allHours : allMinutesAndSeconds;
        const clx = `${prefixCls}-time-body-container`;
        const listRender = (
            <div className={`${clx} ${clx}-${dateFlag}`} ref={ref}>
                <div className={`${clx}-list`}>
                    {
                        list.map((item, key) => {
                            const itemClx = classNames(`${clx}-list-item`, {
                                [`${clx}-list-item-selected`]: +item === +timeObj[dateFlag]
                            });
                            return (
                                <div
                                    key={key}
                                    data-flag={dateFlag}
                                    data-time={item}
                                    className={itemClx}
                                >
                                    {item}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
        return listRender;
    }

    render() {
        const {prefixCls, timeRules} = this.props;
        const clx = `${prefixCls}-time-body`;
        return (
            <div className={clx} ref={this.getBodyContainer} onClick={this.onClickItem}>
                {this.renderList({dateFlag: 'hour', ref: this.getHourListElement})}
                {
                    timeRules !== rulesMap.ONLY_HOUR ? this.renderList({dateFlag: 'minute', ref: this.getMinuteListElement}) : null
                }
                {
                    timeRules === rulesMap.ALL ? this.renderList({dateFlag: 'second', ref: this.getSecondListElement}) : null
                }
            </div>
        );
    }
}
