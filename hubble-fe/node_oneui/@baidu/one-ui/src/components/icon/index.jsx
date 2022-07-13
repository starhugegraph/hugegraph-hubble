
import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import PropTypes from 'prop-types';

export default function Icon(props) {
    const {type, className = '', spin, prefixCls} = props;
    const classString = classNames(
        prefixCls,
        'anchor',
        {
            [`${prefixCls}-spin`]: !!spin || type === 'loading',
            [`${prefixCls}-${type}`]: true
        }, className);
    return <i {...omit(props, ['type', 'spin', 'prefixCls'])} className={classString} />;
}

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    spin: PropTypes.bool,
    style: PropTypes.object,
    prefixCls: PropTypes.string
};

Icon.defaultProps = {
    prefixCls: 'new-fc-one-icon'
};
