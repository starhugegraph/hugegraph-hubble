import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class TabPane extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        prefixCls: PropTypes.string
    }

    static defaultProps = {
        children: null,
        prefixCls: 'new-fc-one-tabs'
    }

    render() {
        const {children, prefixCls} = this.props;
        return (
            <div className={`${prefixCls}-tabpane`}>
                {children}
            </div>
        );
    }
}
