import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'mini-store';
import WeekRender from './weekRender';
import DayRender from './dayRender';

class DayItemRender extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        panelType: PropTypes.string.isRequired
    }

    render() {
        const {panelType, prefixCls} = this.props;
        if (panelType === 'month') {
            return null;
        }
        const bodyContainerClassName = `${prefixCls}-day-container`;
        return (
            <div className={bodyContainerClassName}>
                <WeekRender {...this.props} />
                <DayRender {...this.props} />
            </div>
        );
    }
}

export default connect(state => {
    return {
        showYear: state.showYear,
        showMonth: state.showMonth,
        panelType: state.panelType,
        currentDate: state._value,
        validateMinDate: state.validateMinDate,
        validateMaxDate: state.validateMaxDate
    };
})(DayItemRender);
