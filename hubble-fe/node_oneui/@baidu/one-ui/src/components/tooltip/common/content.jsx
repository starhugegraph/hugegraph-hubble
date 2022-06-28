import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Content extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        overlay: PropTypes.node
    }

    render() {
        const {overlay, prefixCls} = this.props;
        return (
            <div className={`${prefixCls}-inner`} role="tooltip">
                {typeof overlay === 'function' ? overlay() : overlay}
            </div>
        );
    }
}
