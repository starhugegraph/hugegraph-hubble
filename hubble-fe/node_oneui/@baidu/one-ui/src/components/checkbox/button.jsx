import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import Checkbox from './checkbox';

export default class CheckboxButton extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        value: PropTypes.any,
        name: PropTypes.string,
        children: PropTypes.node
    };

    static contextTypes = {
        checkboxGroup: PropTypes.any
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-checkbox-button'
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState)
            || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
    }

    render() {
        return (
            <Checkbox {...this.props} mode="strong" />
        );
    }
}
