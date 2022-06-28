import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const DAYS_PER_WEEK = ['一', '二', '三', '四', '五', '六', '日'];

export default class CalendarBodyHeader extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string
    }

    render() {
        const prefixCls = this.props.prefixCls;
        return (
            <div className={`${prefixCls}-date-head`}>
                {
                    DAYS_PER_WEEK.map((day, index) => {
                        return (
                            <span key={index} className={`${prefixCls}-date-head-week`}>
                                {day}
                            </span>
                        );
                    })
                }
            </div>
        );
    }
}
