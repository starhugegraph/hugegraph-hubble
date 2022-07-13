import React, {Component} from 'react';
import Portal from 'rc-util/lib/PortalWrapper';
import PropTypes from 'prop-types';
import Dialog from './dialog';

class DialogWrap extends Component {
    static defaultProps = {
        visible: false,
        forceRender: false
    };

    static propTypes = {
        visible: PropTypes.bool,
        forceRender: PropTypes.bool,
        getContainer: PropTypes.func
    }

    shouldComponentUpdate({visible, forceRender}) {
        return !!(this.props.visible || visible) || (this.props.forceRender || forceRender);
    }

    render() {
        const {visible, getContainer, forceRender} = this.props;
        // 渲染在当前 dom 里；
        if (getContainer === false) {
            return (
                <Dialog
                    {...this.props}
                    getOpenCount={() => 2} // 不对 body 做任何操作。。
                />
            );
        }

        return (
            <Portal
                visible={visible}
                forceRender={forceRender}
                getContainer={getContainer}
            >
                {childProps => (
                    <Dialog
                        {...this.props}
                        {...childProps}
                    />
                )}
            </Portal>
        );
    }
}

export default DialogWrap;
