import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import tools from '../../core';

const {
    iconSvgMap
} = tools.iconSvg;


export default function IconSvg(props) {
    const {type, className = '', prefixCls} = props;
    const classString = classNames(
        prefixCls,
        {
            [`${prefixCls}-${type}`]: true
        }, className);
    const Comp = iconSvgMap[type];
    if (!Comp) {
        return null;
    }
    return <Comp {...omit(props, ['type', 'prefixCls'])} className={classString} />;
}

IconSvg.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    prefixCls: PropTypes.string
};

IconSvg.defaultProps = {
    prefixCls: 'new-fc-one-icon-svg'
};
