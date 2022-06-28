import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import values from 'lodash/values';
import Icon from '../icon';
import Line from './common/line';
import Circle from './common/circle';
import {transSizeOfDefault} from '../../core/commonTools';

export const PROGRESS_STATUS_MAP = {
    NORMAL: 'normal',
    EXCEPTION: 'exception',
    SUCCESS: 'success'
};

const ProgressStatuses = values(PROGRESS_STATUS_MAP);

const strokeWidthMap = {
    medium: 8,
    small: 4
};

const validProgress = progress => {
    if (!progress || progress < 0) {
        return 0;
    }
    if (progress > 100) {
        return 100;
    }
    return progress;
};

export default class Progress extends PureComponent {
    static propTypes = {
        /** 样式前缀 */
        prefixCls: PropTypes.string,
        /** 自定义类名 */
        className: PropTypes.string,
        /**
         * 类型，默认为line，可选值如下：
         * line 进度条
         * circle 进度环
         */
        type: PropTypes.string,
        /**
         * 尺寸，默认为medium，可选值如下：
         * medium 默认中号
         * small 小号
         */
        size: PropTypes.oneOf(['small', 'medium']),
        /** 百分比 */
        percent: PropTypes.number,
        /** 内容的模板函数 */
        format: PropTypes.func,
        /** 是否显示进度数值或状态图标 */
        showInfo: PropTypes.bool,
        /**
         * 状态，默认为normal，可选值如下：
         * success 完成
         * exception 报错
         * normal 进行中
         */
        status: PropTypes.oneOf(ProgressStatuses),
        /**
         * 进度条边缘的形状，默认为round，可选值如下：
         * round 圆角
         * square 直角
         */
        strokeLinecap: PropTypes.string,
        /** 进度条颜色 */
        strokeColor: PropTypes.string,
        /** 进度条线的宽度，单位 px */
        strokeWidth: PropTypes.number,
        /** 画布宽度 */
        width: PropTypes.number,
        /** 进度环背景色 */
        trailColor: PropTypes.string,
        /** 进度条刷新操作 */
        onRetry: PropTypes.func,
        /** 进度条取消操作 */
        onCancel: PropTypes.func
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-progress',
        type: 'line',
        size: 'medium',
        percent: 0,
        showInfo: true,
        strokeLinecap: 'round',
        trailColor: ''
    };

    getProgressStatus = () => {
        const {status, percent} = this.props;
        if (ProgressStatuses.indexOf(status) < 0 && percent >= 100) {
            return 'success';
        }
        return status || 'normal';
    }

    renderProcessInfo = (prefixCls, progressStatus) => {
        const {showInfo, format, type, percent} = this.props;
        if (!showInfo) {
            return null;
        }
        let text;
        const textFormatter = format || (percentNumber => `${percentNumber}%`);
        if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
            text = textFormatter(validProgress(percent));
        } else if (progressStatus === 'exception') {
            text = <Icon type={type === 'line' ? 'fail' : 'close'}/>;
        } else if (progressStatus === 'success') {
            text = <Icon type={type === 'line' ? 'success' : 'check'}/>;
        }
        return (
            <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
                {text}
            </span>
        );
    }

    render() {
        const {
            prefixCls,
            className,
            type,
            showInfo,
            percent,
            strokeLinecap,
            strokeColor,
            strokeWidth,
            width,
            trailColor,
            onRetry,
            onCancel
        } = this.props;
        const size = transSizeOfDefault(this.props.size, 'medium');
        const progressStatus = this.getProgressStatus();
        const classString = classNames(
            prefixCls,
            className,
            [`${prefixCls}-${type}`],
            [`${prefixCls}-status-${progressStatus}`],
            {
                [`${prefixCls}-show-info`]: showInfo,
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-show-operation`]: onRetry || onCancel
            }
        );
        const validPercent = validProgress(percent);
        const lineProps = {
            prefixCls,
            percent: validPercent,
            strokeLinecap,
            strokeColor,
            trailColor,
            width,
            strokeWidth: strokeWidth || strokeWidthMap[size],
            showRetry: onRetry && progressStatus === PROGRESS_STATUS_MAP.EXCEPTION,
            showCancel: onCancel && progressStatus !== PROGRESS_STATUS_MAP.EXCEPTION && progressStatus !== PROGRESS_STATUS_MAP.SUCCESS,
            onRetry,
            onCancel
        };
        const circleProps = {
            prefixCls,
            percent: validPercent,
            strokeLinecap,
            strokeColor,
            strokeWidth: strokeWidth || strokeWidthMap[size],
            width,
            trailColor
        };
        const progressInfo = this.renderProcessInfo(prefixCls, progressStatus);
        return (
            <div className={classString}>
                {type === 'line' ? <Line {...lineProps}>{progressInfo}</Line> : null}
                {type === 'circle' ? <Circle {...circleProps} >{progressInfo}</Circle> : null}
            </div>
        );
    }
}
