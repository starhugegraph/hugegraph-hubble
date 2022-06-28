/**
 * @file 字体图标工厂函数
 * @author zhanglili
 */

import {memoize, merge} from '../utils';
import './font.css';

const computeScaleStyle = memoize(n => ({display: 'inline-block', transform: `scale(${n})`}));

export default type => {
    const baseClassName = `one-ui-icon icon-${type}`;

    return ({className, scale, style, ...props}) => {
        const iconClassName = className ? baseClassName + ' ' + className : baseClassName;
        const scaleStyle = scale ? computeScaleStyle(scale) : null;
        const iconStyle = merge(scaleStyle, style);

        return <i {...props} style={iconStyle} className={iconClassName} />;
    };
};
