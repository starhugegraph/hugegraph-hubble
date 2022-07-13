import React, {PureComponent} from 'react';
import {connect} from 'mini-store';
import PropTypes from 'prop-types';
import YearPanel from './yearPanel';
import MonthPanel from './monthPanel';

class PanelRender extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        panelType: PropTypes.string.isRequired,
        endDatePanelType: PropTypes.string,
        multiple: PropTypes.bool,
        type: PropTypes.string
    }

    render() {
        const {prefixCls, panelType, endDatePanelType, multiple = false, type} = this.props;
        if (!multiple && panelType === 'date') {
            return null;
        }
        if (multiple && type === 'prevMultiple' && panelType === 'date') {
            return null;
        }
        if (multiple && type === 'nextMultiple' && endDatePanelType === 'date') {
            return null;
        }
        return (
            <div className={`${prefixCls}-panel-container`}>
                <YearPanel {...this.props} />
                <MonthPanel {...this.props} />
            </div>
        );
    }
}

export default connect(state => {
    return {
        panelType: state.panelType,
        endDatePanelType: state.endDatePanelType
    };
})(PanelRender);
