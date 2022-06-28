import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

export default class Popover extends Component {
    static propTypes = {
        /** popOver的标题 */
        title: PropTypes.node,
        /** popOver的内容 */
        content: PropTypes.node,
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 弹出位置 */
        placement: PropTypes.string,
        transitionName: PropTypes.string,
        /** 触发模式 */
        trigger: PropTypes.string,
        /** 鼠标滑入延时 */
        mouseEnterDelay: PropTypes.number,
        /** 鼠标滑出延时 */
        mouseLeaveDelay: PropTypes.number,
        /** 自定义内嵌样式 */
        overlayStyle: PropTypes.object,
        /** visible 是否可见 */
        visible: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-popover',
        placement: 'bottom',
        transitionName: 'zoom-big',
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        overlayStyle: {}
    };

    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }

    getOverlay() {
        const {title, prefixCls, content} = this.props;
        return (
            <div>
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                {
                    content && (
                        <div className={`${prefixCls}-inner-content`}>
                            {content}
                        </div>
                    )
                }
            </div>
        );
    }

    saveTooltip = node => {
        this.tooltip = node;
    }

    render() {
        const props = {...this.props};
        delete props.title;
        return (
            <Tooltip
                {...props}
                ref={this.saveTooltip}
                overlay={this.getOverlay()}
            />
        );
    }
}
