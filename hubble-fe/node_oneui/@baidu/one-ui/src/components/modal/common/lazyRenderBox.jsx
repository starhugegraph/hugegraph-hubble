import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class LazyRenderBox extends Component {
    static propTypes = {
        className: PropTypes.string,
        visible: PropTypes.bool,
        hiddenClassName: PropTypes.string,
        role: PropTypes.string,
        style: PropTypes.object,
        onMouseDown: PropTypes.func
    }

    shouldComponentUpdate(nextProps) {
        return !!nextProps.hiddenClassName || !!nextProps.visible;
    }

    render() {
        let className = this.props.className;
        if (!!this.props.hiddenClassName && !this.props.visible) {
            className += ` ${this.props.hiddenClassName}`;
        }
        const props = {...this.props};
        delete props.hiddenClassName;
        delete props.visible;
        props.className = className;
        return <div {...props} />;
    }
}
