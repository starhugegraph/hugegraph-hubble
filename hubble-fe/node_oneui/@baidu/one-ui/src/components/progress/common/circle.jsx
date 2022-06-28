import React from 'react';
import PropTypes from 'prop-types';
import {Circle as RCCircle} from 'rc-progress';

const Circle = props => {
    const {
        prefixCls,
        percent,
        strokeLinecap,
        strokeColor,
        strokeWidth,
        width,
        trailColor,
        children
    } = props;
    const circleStyle = {
        width,
        height: width
    };
    return (
        <div className={`${prefixCls}-inner`} style={circleStyle}>
            <RCCircle
                percent={percent}
                strokeWidth={strokeWidth}
                trailWidth={strokeWidth}
                strokeColor={strokeColor}
                strokeLinecap={strokeLinecap}
                trailColor={trailColor}
                prefixCls={prefixCls}
            />
            {children}
        </div>
    );
};

Circle.propTypes = {
    prefixCls: PropTypes.string,
    percent: PropTypes.number,
    strokeLinecap: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    width: PropTypes.number,
    trailColor: PropTypes.string,
    children: PropTypes.node
};

Circle.defaultProps = {
    prefixCls: 'new-fc-one-progress',
    percent: 0,
    strokeLinecap: 'round',
    strokeColor: '',
    strokeWidth: 0,
    width: 100,
    trailColor: '#eee'
};

export default Circle;
