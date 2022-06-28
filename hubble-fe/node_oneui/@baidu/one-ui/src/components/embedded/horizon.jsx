import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

export default class Horizon extends PureComponent {
    static propTypes = {
        onClose: PropTypes.func,
        closable: PropTypes.bool,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
        visible: PropTypes.bool
    }

    static defaultProps = {
        closable: true,
        prefixCls: 'new-fc-one-embedded-horizon',
        className: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    onClose = () => {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    render() {
        const {prefixCls, className, closable, children} = this.props;
        let visible = this.state.visible;
        if ('visible' in this.props) {
            visible = this.props.visible;
        }
        if (!visible) {
            return null;
        }
        return (
            <div className={`${prefixCls} ${className}`}>
                {
                    closable ? (
                        <span className={`${prefixCls}-close`} onClick={this.onClose}>
                            <Icon type="close" />
                        </span>
                    ) : null
                }
                <div className={`${prefixCls}-body`}>
                    {children}
                </div>
            </div>
        );
    }
}
