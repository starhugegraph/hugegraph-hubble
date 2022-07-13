import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    getActiveIndex
} from '../../../core/tabsTools';

export default class ScrollContainer extends PureComponent {
    static propTypes = {
        content: PropTypes.node.isRequired,
        prefixCls: PropTypes.string.isRequired,
        title: PropTypes.node.isRequired,
        activeKey: PropTypes.string.isRequired
    }

    render() {
        const {content, prefixCls, title, activeKey} = this.props;
        const activeIndex = getActiveIndex(title, activeKey);
        const style = activeIndex ? {
            marginLeft: `-${activeIndex * 100}%`
        } : {};
        return (
            <div className={`${prefixCls}-content`} style={style}>
                {content}
            </div>
        );
    }
}
