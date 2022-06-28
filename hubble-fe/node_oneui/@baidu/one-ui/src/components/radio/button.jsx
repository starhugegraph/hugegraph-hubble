import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import Radio from './radio';

export default class RadioButton extends Component {
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
        radioGroup: PropTypes.any
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-radio-button'
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps)
            || !shallowEqual(this.state, nextState)
            || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
    }

    render() {
        return (
            <Radio {...this.props} />
        );
    }
}
