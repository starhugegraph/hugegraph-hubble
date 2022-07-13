import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import dayjs from 'dayjs';
import {
    getShortCutDate,
    getTimeTramp
} from '../../../core/datePickerTools';

export default class ShortCut extends PureComponent {
    static propTypes = {
        shortcuts: PropTypes.array,
        prefixCls: PropTypes.string.isRequired,
        dateFormat: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    static defaultProps = {
        onChange() {}
    }

    onClickShortCut = index => {
        const {shortcuts, dateFormat, onChange} = this.props;
        const shortcut = shortcuts[index];
        const {
            beginDate,
            endDate
        } = getShortCutDate(shortcut, dateFormat);
        let currentBeginDate = beginDate;
        let currentEndDate = endDate;
        if (getTimeTramp(currentBeginDate) > getTimeTramp(currentEndDate)) {
            currentBeginDate = endDate;
            currentEndDate = beginDate;
        }
        onChange([dayjs(new Date(currentBeginDate)).format(dateFormat), dayjs(new Date(currentEndDate)).format(dateFormat)]);
    }

    render() {
        const {prefixCls, shortcuts} = this.props;
        return (
            <div className={`${prefixCls}-short-cut`}>
                {
                    shortcuts.map((shortcut, index) => {
                        return (
                            <div
                                className={`${prefixCls}-short-cut-item`}
                                onClick={partial(this.onClickShortCut, index)}
                                key={index}
                            >
                                {shortcut.label}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
