import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CalendarTimeHeader from './calendarTimeHeader';
import CalendarTimeBody from './calendarTimeBody';

export default class CalendarBody extends Component {
    static propTypes = {
        mode: PropTypes.string.isRequired,
        prefixCls: PropTypes.string.isRequired,
        timeObj: PropTypes.object.isRequired,
        onSelectTime: PropTypes.func.isRequired,
        timeRules: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            timeObj: props.timeObj
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('mode' in nextProps) {
            this.setState({mode: nextProps.mode});
        }
        if ('timeObj' in nextProps) {
            this.setState({
                timeObj: nextProps.timeObj
            });
        }
    }

    getContainerRef = ref => {
        this.containerRef = ref;
    }

    getTimeBodyRef = ref => {
        this.timeBodyRef = ref;
    }

    updateInputValue = ({hour = '00', minute = '00', second = '00'}) => {
        const timeObj = {
            hour,
            minute,
            second
        };
        this.setState({timeObj});
        const scrollFunc = this.timeBodyRef && this.timeBodyRef.scrollToPosition;
        if (scrollFunc) {
            scrollFunc({...timeObj});
        }
        const onSelectTime = this.props.onSelectTime;
        onSelectTime(timeObj);
    }

    render() {
        const {mode, timeObj} = this.state;
        const prefixCls = this.props.prefixCls;
        if (mode !== 'time') {
            return null;
        }
        const props = {
            ...this.props,
            timeObj,
            updateInputValue: this.updateInputValue
        };
        return (
            <div className={`${prefixCls}-time`} ref={this.getContainerRef}>
                <CalendarTimeHeader {...props} />
                <CalendarTimeBody {...props} ref={this.getTimeBodyRef}/>
            </div>
        );
    }
}
