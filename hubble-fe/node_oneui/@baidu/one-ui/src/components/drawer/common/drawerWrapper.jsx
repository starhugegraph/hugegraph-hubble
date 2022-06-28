import Portal from 'rc-util/lib/PortalWrapper';
import * as React from 'react';
import {polyfill} from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import Child from './drawerChild';

class DrawerWrapper extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        open: PropTypes.bool,
        defaultOpen: PropTypes.bool,
        handler: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
        placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
        level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        duration: PropTypes.string,
        ease: PropTypes.string,
        showMask: PropTypes.bool,
        maskClosable: PropTypes.bool,
        maskStyle: PropTypes.object,
        drawerStyle: PropTypes.object,
        onChange: PropTypes.func,
        afterVisibleChange: PropTypes.func,
        onHandleClick: PropTypes.func,
        onClose: PropTypes.func,
        keyboard: PropTypes.bool,
        wrapperClassName: PropTypes.string,
        forceRender: PropTypes.bool,
        getContainer: PropTypes.func,
        className: PropTypes.string
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-drawer',
        placement: 'left',
        getContainer: () => {
            return document.body;
        },
        defaultOpen: false,
        level: 'all',
        duration: '.3s',
        ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
        onChange: () => { },
        afterVisibleChange: () => { },
        handler: (
            <div className="drawer-handle">
                <i className="drawer-handle-icon" />
            </div>
        ),
        showMask: true,
        maskClosable: true,
        maskStyle: {},
        wrapperClassName: '',
        className: '',
        keyboard: true,
        forceRender: false
    }

    constructor(props) {
        super(props);
        const open = typeof props.open !== 'undefined' ? props.open : !!props.defaultOpen;
        this.state = {
            open
        };
    }

    static getDerivedStateFromProps = (props, {prevProps}) => {
        const newState = {
            prevProps: props
        };
        if (typeof prevProps !== 'undefined' && props.open !== prevProps.open) {
            newState.open = props.open;
        }
        return newState;
    }

    onHandleClick = e => {
        const {onHandleClick, open: $open} = this.props;
        if (onHandleClick) {
            onHandleClick(e);
        }
        if (typeof $open === 'undefined') {
            const open = this.state.open;
            this.setState({
                open: !open
            });
        }
    }

    onClose = e => {
        const {onClose, open} = this.props;
        if (onClose) {
            onClose(e);
        }
        if (typeof open === 'undefined') {
            this.setState({
                open: false
            });
        }
    }

    render() {
        const {
            defaultOpen,
            getContainer,
            wrapperClassName,
            forceRender,
            handler,
            ...props
        } = this.props;
        const open = this.state.open;
        // 渲染在当前 dom 里；
        if (!getContainer) {
            return (
                <div
                    className={wrapperClassName}
                    ref={c => {this.dom = c;}}
                >
                    <Child
                        {...props}
                        open={open}
                        handler={handler}
                        getContainer={() => this.dom}
                        onClose={this.onClose}
                        onHandleClick={this.onHandleClick}
                    />
                </div>
            );
        }
        // 如果有 handler 为内置强制渲染；
        const $forceRender = !!handler || forceRender;
        return (
            <Portal
                visible={open}
                forceRender={$forceRender}
                getContainer={getContainer}
                wrapperClassName={wrapperClassName}
            >
                {({visible, afterClose, ...rest}) => (
                    // react 15，componentWillUnmount 时 Portal 返回 afterClose, visible.
                    <Child
                        {...props}
                        {...rest}
                        open={visible !== undefined ? visible : open}
                        afterVisibleChange={afterClose !== undefined ? afterClose : props.afterVisibleChange}
                        handler={handler}
                        onClose={this.onClose}
                        onHandleClick={this.onHandleClick}
                    />
                )}
            </Portal>
        );
    }
}

export default polyfill(DrawerWrapper);
