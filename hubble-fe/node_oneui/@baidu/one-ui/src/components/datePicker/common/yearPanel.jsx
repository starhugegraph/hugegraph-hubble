import React, {PureComponent} from 'react';
import partial from 'lodash/partial';
import {connect} from 'mini-store';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
    getDetailDate
} from '../../../core/datePickerTools';

const yearCellPadding = 4;
const yearCellHeight = 28;
const mediumYearCellHeight = 32;

class YearRender extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        prefixCls: PropTypes.string.isRequired,
        showYear: PropTypes.number.isRequired,
        validateMinDate: PropTypes.string.isRequired,
        validateMaxDate: PropTypes.string.isRequired,
        endDateShowYear: PropTypes.number,
        type: PropTypes.string,
        isMonthRender: PropTypes.bool,
        panelType: PropTypes.string,
        size: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    componentDidMount = () => {
        this.scrollToCurrentYear();
    }

    componentDidUpdate = () => {
        this.scrollToCurrentYear();
    }

    scrollToCurrentYear = () => {
        const yearRenderElement = this.yearRenderElement;
        if (!yearRenderElement) {
            return;
        }
        const {showYear, endDateShowYear, type, isMonthRender, panelType, size} = this.props;
        const currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;
        const minYear = this.getMaxAndMinYear().minYear;
        let gapYear = currentYear - minYear;
        const yearCellCurrentHeigt = size === 'medium' ? mediumYearCellHeight : yearCellHeight;
        let scrollTop = (yearCellCurrentHeigt + yearCellPadding) * gapYear;
        if (isMonthRender && panelType === 'year') {
            gapYear = Math.ceil(gapYear / 3) - 3;
            scrollTop = (yearCellCurrentHeigt + yearCellPadding * 5) * gapYear;
        }
        yearRenderElement.scrollTop = scrollTop;
    }

    getMaxAndMinYear = () => {
        const {validateMinDate, validateMaxDate, type, endDateShowYear, showYear} = this.props;
        let maxYear = +getDetailDate(validateMaxDate).fullYear;
        let minYear = +getDetailDate(validateMinDate).fullYear;
        if (type === 'prevMultiple') {
            maxYear = endDateShowYear;
        } else if (type === 'nextMultiple') {
            minYear = showYear;
        }
        return {
            maxYear,
            minYear
        };
    }

    onClickYear = currentYear => {
        const type = this.props.type;
        const newState = {};
        if (type === 'nextMultiple') {
            newState.endDateShowYear = currentYear;
        } else {
            newState.showYear = currentYear;
        }
        this.store.setState(newState);
    }

    getBodyElement = ref => {
        this.yearRenderElement = ref;
    }

    renderYear = () => {
        const {showYear, prefixCls, endDateShowYear, type, isMonthRender, panelType} = this.props;
        if (isMonthRender && panelType !== 'year') {
            return null;
        }
        const {
            minYear,
            maxYear
        } = this.getMaxAndMinYear();
        const yearContainer = [];
        const currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;
        for (let i = minYear; i <= maxYear; i++) {
            const className = classNames(
                `${prefixCls}-year-container-item`,
                {
                    [`${prefixCls}-year-container-item-selected`]: currentYear === i
                }
            );
            yearContainer.push(
                <div
                    className={className}
                    key={i}
                    onClick={partial(this.onClickYear, i)}
                >
                    <span>
                        {i}
                        {isMonthRender ? '年' : null}
                    </span>
                </div>
            );
        }
        const yearClassNames = classNames(
            `${prefixCls}-year-container`,
            {
                [`${prefixCls}-year-container-is-month-render`]:
                    isMonthRender && panelType === 'year'
            }
        );
        return (
            <div className={yearClassNames} ref={this.getBodyElement}>
                {yearContainer}
            </div>
        );
    }

    render() {
        return this.renderYear();
    }
}

export default connect(state => {
    return {
        endDateShowYear: state.endDateShowYear,
        showYear: state.showYear,
        validateMinDate: state.validateMinDate,
        validateMaxDate: state.validateMaxDate,
        panelType: state.panelType
    };
})(YearRender);
