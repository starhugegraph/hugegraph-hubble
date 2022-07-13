import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import {IconChevronDown, IconChevronUp} from '@baidu/one-ui-icon';

export default class ExpandIcon extends Component {
    static propTypes = {
        record: PropTypes.object,
        prefixCls: PropTypes.string,
        expandable: PropTypes.any,
        expanded: PropTypes.bool,
        needIndentSpaced: PropTypes.bool,
        onExpand: PropTypes.func
    };


    shouldComponentUpdate(nextProps) {
        return !shallowequal(nextProps, this.props);
    }

    render() {
        const {expandable, prefixCls, expanded, onExpand, needIndentSpaced, record} = this.props;
        if (expandable) {
            const expandClassName = expanded ? 'expanded' : 'collapsed';
            const expandIcon = expanded ? <IconChevronUp /> : <IconChevronDown />;
            return (
                <span
                    className={`${prefixCls}-expand-icon ${prefixCls}-${expandClassName}`}
                    onClick={e => onExpand(record, e)}
                >
                    {expandIcon}
                </span>
            );
        } if (needIndentSpaced) {
            return <span className={`${prefixCls}-expand-icon ${prefixCls}-spaced`} />;
        }
        return null;
    }
}
