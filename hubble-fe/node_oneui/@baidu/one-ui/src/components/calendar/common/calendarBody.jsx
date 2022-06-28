import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CalendarBodyHeader from './calendarBodyHeader';
import CalendarBodyData from './calendarBodyData';
import CalendarBodyMonth from './calendarBodyMonth';

export default class CalendarBody extends PureComponent {
    static propTypes = {
        mode: PropTypes.string
    }

    static defaultProps = {
        mode: 'date'
    }

    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('mode' in nextProps) {
            this.setState({mode: nextProps.mode});
        }
    }

    getContainerRef = ref => {
        this.containerRef = ref;
    }

    getBodyRef = ref => {
        this.bodyRef = ref;
    }

    renderDateMode = () => {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const mode = this.state.mode;
        const dateCls = classNames(`${prefixCls}-date`, {
            [`${prefixCls}-date-hidden`]: mode === 'month'
        });
        return (
            <div className={dateCls} ref={this.getContainerRef}>
                <CalendarBodyHeader prefixCls={prefixCls}/>
                <CalendarBodyData {...props} ref={this.getBodyRef} />
            </div>
        );
    }

    renderMonthMode = () => {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const mode = this.state.mode;
        const dateCls = classNames(`${prefixCls}-date`, {
            [`${prefixCls}-date-hidden`]: mode !== 'month'
        });
        return (
            <div className={dateCls} ref={this.getContainerRef}>
                <CalendarBodyMonth {...props} mode={mode} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderMonthMode()}
                {this.renderDateMode()}
            </div>
        );
    }
}
