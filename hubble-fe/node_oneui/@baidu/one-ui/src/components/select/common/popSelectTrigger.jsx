import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import ReactDOM from 'react-dom';
import Content from './popContent';

Trigger.displayName = 'Trigger';
const BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    topLeft: {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    bottomRight: {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    },
    topRight: {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow: {
            adjustX: 1,
            adjustY: 1
        }
    }
};

class PopSelectTrigger extends Component {
    static propTypes = {
        trigger: PropTypes.any,
        children: PropTypes.any,
        defaultVisible: PropTypes.bool,
        visible: PropTypes.bool,
        transitionName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        animation: PropTypes.any,
        onVisibleChange: PropTypes.func,
        afterVisibleChange: PropTypes.func,
        overlay: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]).isRequired,
        overlayStyle: PropTypes.object,
        overlayClassName: PropTypes.string,
        prefixCls: PropTypes.string,
        mouseEnterDelay: PropTypes.number,
        mouseLeaveDelay: PropTypes.number,
        getPopUpContainer: PropTypes.func,
        destroyPopUpOnHide: PropTypes.bool,
        align: PropTypes.object,
        id: PropTypes.string,
        dropdownMatchSelectWidth: PropTypes.bool,
        popupPlacement: PropTypes.string
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-select-pop',
        mouseEnterDelay: 0,
        destroyPopUpOnHide: false,
        mouseLeaveDelay: 0.1,
        align: {},
        trigger: ['hover'],
        dropdownMatchSelectWidth: true,
        popupPlacement: 'bottomLeft'
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownWidth: null
        };
    }

    componentDidMount() {
        this.setDropdownWidth();
    }

    componentDidUpdate() {
        this.setDropdownWidth();
    }

    setDropdownWidth = () => {
        const width = ReactDOM.findDOMNode(this).offsetWidth;
        if (width !== this.state.dropdownWidth) {
            this.setState({dropdownWidth: width});
        }
    }

    getPopupElement = () => {
        const {overlay, prefixCls, id} = this.props;
        return (
            <Content
                key="content"
                trigger={this.trigger}
                prefixCls={prefixCls}
                id={id}
                overlay={overlay}
            />
        );
    }

    getPopupDomNode() {
        return this.trigger.getPopupDomNode();
    }

    saveTrigger = node => {
        this.trigger = node;
    }

    render() {
        const {
            overlayClassName, trigger,
            mouseEnterDelay, mouseLeaveDelay,
            overlayStyle, prefixCls,
            children, onVisibleChange, afterVisibleChange,
            transitionName, animation,
            align,
            destroyPopUpOnHide,
            defaultVisible, getPopUpContainer,
            dropdownMatchSelectWidth,
            popupPlacement,
            ...restProps
        } = this.props;
        const extraProps = {...restProps};
        if ('visible' in this.props) {
            extraProps.popupVisible = this.props.visible;
        }
        const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
        const popupStyle = {...overlayStyle};
        if (this.state.dropdownWidth) {
            popupStyle[widthProp] = `${this.state.dropdownWidth}px`;
        }
        return (
            <Trigger
                popupClassName={overlayClassName}
                ref={this.saveTrigger}
                prefixCls={prefixCls}
                popup={this.getPopupElement}
                action={trigger}
                builtinPlacements={BUILT_IN_PLACEMENTS}
                popupPlacement={popupPlacement}
                popupAlign={align}
                getPopupContainer={getPopUpContainer}
                onPopupVisibleChange={onVisibleChange}
                afterPopupVisibleChange={afterVisibleChange}
                popupTransitionName={transitionName}
                popupAnimation={animation}
                defaultPopupVisible={defaultVisible}
                destroyPopupOnHide={destroyPopUpOnHide}
                mouseLeaveDelay={mouseLeaveDelay}
                popupStyle={popupStyle}
                mouseEnterDelay={mouseEnterDelay}

                {...extraProps}
            >
                {children}
            </Trigger>
        );
    }
}

export default PopSelectTrigger;
PopSelectTrigger.displayName = 'PopSelectTrigger';
