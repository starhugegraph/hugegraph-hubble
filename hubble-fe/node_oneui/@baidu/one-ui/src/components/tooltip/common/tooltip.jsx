import React, {PureComponent} from 'react';
import Trigger from 'rc-trigger';
import PropTypes from 'prop-types';
import Content from './content';

export default class Tooltip extends PureComponent {
    static propTypes = {
        trigger: PropTypes.string,
        defaultVisible: PropTypes.bool,
        visible: PropTypes.bool,
        builtinPlacements: PropTypes.object,
        transitionName: PropTypes.string,
        onVisibleChange: PropTypes.func,
        overlay: PropTypes.node,
        overlayStyle: PropTypes.object,
        overlayClassName: PropTypes.string,
        prefixCls: PropTypes.string.isRequired,
        mouseEnterDelay: PropTypes.number,
        mouseLeaveDelay: PropTypes.number,
        getTooltipContainer: PropTypes.func,
        destroyTooltipOnHide: PropTypes.bool,
        align: PropTypes.object,
        children: PropTypes.node,
        popupVisible: PropTypes.bool,
        placement: PropTypes.string
        // ref: PropTypes.func
    }

    getPopupElement = () => {
        const {overlay, prefixCls} = this.props;
        return [
            <div className={`${prefixCls}-arrow`} key="arrow" />,
            <Content key="content" prefixCls={prefixCls} overlay={overlay} />
        ];
    };

    getPopupDOMNode() {
        return this.trigger.getPopupDomNode();
    }

    saveTrigger = node => {
        this.trigger = node;
    };

    render() {
        const {
            overlayClassName,
            trigger = 'hover',
            mouseEnterDelay = 0,
            mouseLeaveDelay = 0.1,
            overlayStyle,
            children,
            onVisibleChange = () => {},
            transitionName,
            placement = 'right',
            align = {},
            destroyTooltipOnHide = false,
            defaultVisible,
            getTooltipContainer,
            prefixCls,
            builtinPlacements,
            // ref,
            ...restProps
        } = this.props;
        const extraProps = {...restProps};
        if ('visible' in this.props) {
            extraProps.popupVisible = this.props.visible;
        }
        return (
            <Trigger
                popupClassName={overlayClassName}
                prefixCls={prefixCls}
                popup={this.getPopupElement()}
                action={trigger}
                builtinPlacements={builtinPlacements}
                popupPlacement={placement}
                ref={this.saveTrigger}
                popupAlign={align}
                getPopupContainer={getTooltipContainer}
                onPopupVisibleChange={onVisibleChange}
                popupTransitionName={transitionName}
                defaultPopupVisible={defaultVisible}
                destroyPopupOnHide={destroyTooltipOnHide}
                mouseLeaveDelay={mouseLeaveDelay}
                popupStyle={overlayStyle}
                mouseEnterDelay={mouseEnterDelay}
                {...extraProps}
            >
                {children}
            </Trigger>
        );
    }
}
