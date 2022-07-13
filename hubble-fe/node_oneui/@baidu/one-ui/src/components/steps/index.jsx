/**
 * @file 步骤条
 * @author huangshiming
 */
import React, {cloneElement, Children, Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';
import Step from './step';

export default class Steps extends Component {
    static Step = Step;

    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 当前步骤 */
        current: PropTypes.number,
        /** 步骤条的方向 */
        direction: PropTypes.string,
        /** 描述文案放置的位置 */
        labelPlacement: PropTypes.string,
        /** 是否需要展示hover状态 */
        showTipWhenHover: PropTypes.bool,
        /** size 步骤条的尺寸 */
        size: PropTypes.oneOf(['small', 'medium']),
        /** 当前步骤的状态， wait, process,finish, error */
        status: PropTypes.string,
        /** initialStep 初始化的步骤条 */
        initialStep: PropTypes.number,
        /** 自定义className */
        className: PropTypes.string,
        /** 自定义style */
        style: PropTypes.object,
        /** children */
        children: PropTypes.node,
        /** onClickStep 暴露点击step的函数 */
        onClickStep: PropTypes.func
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-steps',
        current: 0,
        direction: 'horizontal',
        labelPlacement: 'horizontal',
        initialStep: 0,
        status: 'process',
        size: 'medium',
        className: '',
        style: {},
        showTipWhenHover: true
    }

    render() {
        const icons = {
            finish: <Icon type="check" />,
            error: <Icon type="close" />
        };
        const {
            prefixCls, style = {}, className,
            children, direction, labelPlacement, showTipWhenHover,
            status, size, current, initialStep, onClickStep, ...restProps
        } = this.props;
        const filteredChildren = React.Children.toArray(children).filter(child => !!child);
        const stepClxs = classnames(prefixCls, `${prefixCls}-${direction}`, className, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-label-${labelPlacement}`]: direction === 'horizontal'
        });
        return (
            <div className={stepClxs} style={style} {...restProps}>
                {
                    Children.map(filteredChildren, (child, index) => {
                        if (!child) {
                            return null;
                        }
                        const currentStepNumber = initialStep + index;
                        const childProps = {
                            stepNumber: `${currentStepNumber + 1}`,
                            prefixCls,
                            icons,
                            showTipWhenHover,
                            onClickStep,
                            current,
                            ...child.props
                        };
                        if (status === 'error' && index === current - 1) {
                            childProps.className = `${prefixCls}-next-error`;
                        }
                        if (!child.props.status) {
                            if (currentStepNumber === current) {
                                // 如果传入的Step没有status的话
                                childProps.status = status;
                            } else if (currentStepNumber < current) {
                                childProps.status = 'finish';
                            } else {
                                childProps.status = 'wait';
                            }
                        }
                        return cloneElement(child, childProps);
                    })
                }
            </div>
        );
    }
}
