/**
 * @file 步骤条-step
 * @author huangshiming
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from '../tooltip';
import Button from '../button';

export default class Step extends Component {
    static propTypes = {
        /** 自定义类名 */
        className: PropTypes.string,
        /** 自定义类名前缀 */
        prefixCls: PropTypes.string,
        /** 自定义样式 */
        style: PropTypes.object,
        /** 可自定义当前步骤节点的宽度 */
        itemWidth: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        /** 当前步骤的状态 */
        status: PropTypes.string,
        /** 是否需要在当前步骤条展示hover状态 */
        showTipWhenHover: PropTypes.bool,
        /** 自定义步骤条item的右边margin */
        adjustMarginRight: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        /** 当前步骤条的步数 */
        stepNumber: PropTypes.string,
        /** 描述 */
        description: PropTypes.any,
        /** 标题 */
        title: PropTypes.any,
        /** 步骤条连接线 */
        tailContent: PropTypes.any,
        /** 步骤条的icon类型 */
        icons: PropTypes.shape({
            finish: PropTypes.node,
            error: PropTypes.node
        }),
        /** 自定义icon */
        icon: PropTypes.node,
        /** 自定义icon的icon className */
        iconClassName: PropTypes.string,
        /** 自定义hoverTip */
        hoverTip: PropTypes.string,
        /** 点击step的回调函数 */
        onClickStep: PropTypes.func,
        current: PropTypes.number
    };

    onClickStep = () => {
        const {onClickStep, stepNumber} = this.props;
        if (onClickStep) {
            onClickStep(stepNumber);
        }
    }

    renderIconNode = () => {
        const {
            prefixCls,
            stepNumber,
            status,
            icons,
            icon,
            iconClassName = ''
        } = this.props;
        let iconNode;
        const iconClx = classnames(`${prefixCls}-icon`,
            'new-fc-one-icon',
            iconClassName, {
                'new-fc-one-icon-check': status === 'finish' && (icons && !icons.finish),
                'new-fc-one-icon-close': status === 'error' && (icons && !icons.error)
            });
        if (icon && iconClassName) {
            iconNode = <span className={iconClassName}>{icon}</span>;
        } else if (icons && icons.finish && status === 'finish') {
            iconNode = <span className={`${prefixCls}-icon`}>{icons.finish}</span>;
        } else if (icons && icons.error && status === 'error') {
            iconNode = <span className={`${prefixCls}-icon`}>{icons.error}</span>;
        } else if (status === 'finish' || status === 'error') {
            iconNode = <span className={iconClx} />;
        } else {
            iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
        }
        return iconNode;
    }

    render() {
        const {
            className,
            prefixCls,
            style,
            itemWidth,
            status = 'wait',
            adjustMarginRight,
            description,
            title,
            tailContent,
            icon,
            showTipWhenHover,
            hoverTip,
            stepNumber,
            current
        } = this.props;
        const classString = classnames(
            `${prefixCls}-item`,
            `${prefixCls}-item-${status}`,
            {
                [`${prefixCls}-item-custom`]: icon,
                [`${prefixCls}-item-is-current`]: +current === +stepNumber
            },
            className
        );
        const stepItemStyle = {...style};
        if (itemWidth) {
            stepItemStyle.width = itemWidth;
        }
        if (adjustMarginRight) {
            stepItemStyle.marginRight = adjustMarginRight;
        }
        let stepText = '';
        if (status === 'finish') {
            stepText = '已完成';
        } else if (status === 'wait') {
            stepText = '未开始';
        } else if (status === 'process') {
            stepText = '进行中';
        } else if (status === 'error') {
            stepText = '错误';
        }
        const iconNode = this.renderIconNode();
        const iconHoverTip = hoverTip || `第${stepNumber}步${stepText}`;
        const iconRenderItem = showTipWhenHover ? (
            <Tooltip placement="top" title={iconHoverTip} style={{marginBottom: '5px'}}>
                <Button className={`${prefixCls}-item-icon`} icon={iconNode} />
            </Tooltip>
        ) : (
            <Button className={`${prefixCls}-item-icon`} icon={iconNode} />
        );
        const contentClassNames = classnames(`${prefixCls}-item-content`, {
            [`${prefixCls}-item-title-only`]: !description
        });
        const titleTextClassNames = classnames(`${prefixCls}-item-title-text`, {
            [`${prefixCls}-item-title-text-only`]: !description
        });
        return (
            <div
                className={classString}
                style={stepItemStyle}
                onClick={this.onClickStep}
            >
                <div className={`${prefixCls}-item-tail`}>
                    {tailContent}
                </div>
                {iconRenderItem}
                <div className={contentClassNames}>
                    <div className={`${prefixCls}-item-title`}>
                        <span className={titleTextClassNames}>{title}</span>
                    </div>
                    {description && <div className={`${prefixCls}-item-description`}>{description}</div>}
                </div>
            </div>
        );
    }
}
