import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../button';

export default class ActionButton extends Component {
    static propTypes = {
        type: PropTypes.string,
        actionFn: PropTypes.func,
        closeModal: PropTypes.func,
        autoFocus: PropTypes.bool,
        children: PropTypes.any,
        otherProps: PropTypes.object,
        order: PropTypes.number,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            const $this = ReactDOM.findDOMNode(this);
            this.timeoutId = setTimeout(() => $this.focus());
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    onClick = () => {
        const {actionFn, closeModal} = this.props;
        if (actionFn) {
            let ret;
            if (actionFn.length) {
                ret = actionFn(closeModal);
            } else {
                ret = actionFn();
                if (!ret) {
                    closeModal();
                }
            }
            if (ret && ret.then) {
                this.setState({loading: true});
                ret.then((...args) => {
                    closeModal(...args);
                }, () => {
                    this.setState({loading: false});
                });
            }
        } else {
            closeModal();
        }
    }

    render() {
        const {type, children, otherProps, order, size} = this.props;
        const loading = this.state.loading;
        otherProps.style = {};
        if (order) {
            otherProps.style.order = order;
        }
        return (
            <Button type={type} size={size} onClick={this.onClick} loading={loading} {...otherProps}>
                {children}
            </Button>
        );
    }
}
