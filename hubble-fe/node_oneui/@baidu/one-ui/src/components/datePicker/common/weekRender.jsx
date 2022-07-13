import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const DAYS_PER_WEEK = ['一', '二', '三', '四', '五', '六', '日'];

export default class WeekRender extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired
    }

    renderWeekItem = () => {
        const classNames = `${this.props.prefixCls}-week`;
        return (
            <div className={classNames}>
                {
                    DAYS_PER_WEEK.map((dayStr, index) => {
                        return (
                            <span key={index} className={`${classNames}-week`}>
                                {dayStr}
                            </span>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return this.renderWeekItem();
    }
}
