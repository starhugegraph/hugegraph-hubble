import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shallowEqual from 'shallowequal';

export default class Content extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        isActive: PropTypes.bool,
        children: PropTypes.any,
        destroyNotActivePanel: PropTypes.bool,
        renderDomWhenHide: PropTypes.bool
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(this.props, nextProps);
    }

    render() {
        // 判断isItemActive再与避免不用的重复渲染
        const {renderDomWhenHide, isActive, prefixCls, children, destroyNotActivePanel} = this.props;
        this.isItemActive = renderDomWhenHide || this.isItemActive || isActive;
        if (!this.isItemActive) {
            return null;
        }
        const contentCls = classnames(`${prefixCls}-item-content`, {
            [`${prefixCls}-item-content-active`]: isActive,
            [`${prefixCls}-item-content-not-active`]: !isActive
        });
        const child = !renderDomWhenHide && !isActive && destroyNotActivePanel ? null : <div className={`${prefixCls}-content-box`}>{children}</div>;
        return (
            <div className={contentCls}>{child}</div>
        );
    }
}
