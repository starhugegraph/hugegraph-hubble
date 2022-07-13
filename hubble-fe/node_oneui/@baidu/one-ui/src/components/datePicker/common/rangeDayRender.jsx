import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'mini-store';
import {polyfill} from 'react-lifecycles-compat';
import WeekRender from './weekRender';
import RangeDayItemRender from './rangeDayItemRender';

class DayItemRender extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        panelType: PropTypes.string.isRequired,
        currentDate: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,
        endDatePanelType: PropTypes.string.isRequired,
        endDateShowMonth: PropTypes.number.isRequired,
        endDateShowYear: PropTypes.number.isRequired
    }

    render() {
        const {
            panelType,
            prefixCls,
            type,
            endDatePanelType,
            endDateShowYear,
            endDateShowMonth,
            currentDate
        } = this.props;
        const currentPanelType = type === 'nextMultiple' ? endDatePanelType : panelType;
        if (currentPanelType === 'month') {
            return null;
        }
        const bodyContainerClassName = `${prefixCls}-day-container`;
        let otherProps = {
            beginDate: currentDate[0] || '',
            endDate: currentDate[1] || ''
        };
        if (type === 'nextMultiple') {
            otherProps = {
                ...otherProps,
                showYear: endDateShowYear,
                showMonth: endDateShowMonth
            };
        }
        return (
            <div className={bodyContainerClassName}>
                <WeekRender {...this.props} />
                <RangeDayItemRender {...this.props} {...otherProps} />
            </div>
        );
    }
}

polyfill(DayItemRender);

export default connect(state => {
    return {
        showYear: state.showYear,
        showMonth: state.showMonth,
        panelType: state.panelType,
        validateMinDate: state.validateMinDate,
        validateMaxDate: state.validateMaxDate,
        endDateShowYear: state.endDateShowYear,
        endDateShowMonth: state.endDateShowMonth,
        endDatePanelType: state.endDatePanelType
    };
})(DayItemRender);
