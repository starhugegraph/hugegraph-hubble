import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {IconClose, IconRefresh} from '@baidu/one-ui-icon';

export default class Line extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        percent: PropTypes.number,
        strokeLinecap: PropTypes.string,
        strokeColor: PropTypes.string,
        trailColor: PropTypes.string,
        strokeWidth: PropTypes.number,
        width: PropTypes.number,
        showRetry: PropTypes.bool,
        showCancel: PropTypes.bool,
        onRetry: PropTypes.func,
        onCancel: PropTypes.func,
        children: PropTypes.node
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-progress',
        percent: 0,
        strokeLinecap: 'round',
        strokeColor: '',
        trailColor: '',
        showRetry: false,
        showCancel: false
    };

    renderOperation = () => {
        const {
            prefixCls,
            showRetry,
            showCancel,
            onRetry,
            onCancel
        } = this.props;
        if (!showRetry && !showCancel) {
            return null;
        }
        const cancelProps = {
            type: 'close',
            title: '取消',
            onClick: onCancel
        };
        const retryProps = {
            type: 'refresh',
            title: '刷新',
            onClick: onRetry
        };
        return (
            <span className={`${prefixCls}-operation`}>
                {showRetry ? <IconRefresh {...retryProps} /> : null}
                {showCancel ? <IconClose {...cancelProps}/> : null}
            </span>
        );
    }

    render() {
        const {
            prefixCls,
            percent,
            strokeWidth,
            strokeColor,
            trailColor,
            strokeLinecap,
            width,
            children
        } = this.props;
        const borderRadius = strokeLinecap === 'square' ? 0 : null;
        const outerStyle = {
            width
        };
        const percentStyle = {
            width: `${percent}%`,
            height: strokeWidth,
            borderRadius,
            background: strokeColor
        };
        const trailStyle = {
            borderRadius,
            backgroundColor: trailColor
        };
        return (
            <div>
                <div className={`${prefixCls}-outer`} style={outerStyle}>
                    <div className={`${prefixCls}-inner`} style={trailStyle}>
                        <div className={`${prefixCls}-bg`} style={percentStyle} />
                    </div>
                </div>
                {children}
                {this.renderOperation()}
            </div>
        );
    }
}
