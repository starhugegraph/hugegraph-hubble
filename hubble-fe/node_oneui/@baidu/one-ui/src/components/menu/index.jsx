import React, {PureComponent} from 'react';
import RcMenu, {Divider, ItemGroup} from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import animation from '../../core/openAnimation';
import Item from './menuItem';
import SubMenu from './subMenu';

const horizontalMap = {
    1: 'large',
    2: 'medium',
    3: 'small'
};

export default class Menu extends PureComponent {
    static Divider = Divider;

    static Item = Item;

    static SubMenu = SubMenu;

    static ItemGroup = ItemGroup;

    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 自定义类名 */
        className: PropTypes.string,
        /**
         * 菜单的模式：垂直弹出、水平内嵌、垂直内嵌
         */
        mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
        /**
         * 只有mode为inline才使用
         */
        inlineCollapsed: PropTypes.bool,
        /**
         * 需要展开的key值
         */
        openKeys: PropTypes.array,
        /**
         * 默认展开的key值
         */
        defaultOpenKeys: PropTypes.array,
        openAnimation: PropTypes.oneOf([
            PropTypes.string,
            PropTypes.object
        ]),
        openTransitionName: PropTypes.oneOf([
            PropTypes.string,
            PropTypes.object
        ]),
        /**
         * SubMenu 展开/关闭的回调
         */
        onOpenChange: PropTypes.func,
        /**
         * 点击 MenuItem 调用此函数
         */
        onClick: PropTypes.func,
        /** 导航层级 */
        menuLevel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        style: PropTypes.object,
        popupClassName: PropTypes.string,
        /** inline是否需要border,默认false */
        needBorder: PropTypes.bool,
        /** 菜单item剪头位置， 默认右边，支持左边， 传入left right */
        arrowPosition: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large'])
    }

    static contextTypes = {
        siderCollapsed: PropTypes.bool
    };

    static childContextTypes = {
        inlineCollapsed: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-menu',
        className: '',
        mode: 'vertical',
        menuLevel: 2, // 默认是二级导航
        needBorder: false,
        popupClassName: '',
        style: {},
        arrowPosition: 'right'
    };

    constructor(props) {
        super(props);
        warning(
            !('inlineCollapsed' in props && props.mode !== 'inline'),
            '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.',
        );
        let openKeys;
        if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        } else if ('openKeys' in props) {
            openKeys = props.openKeys;
        }

        this.state = {
            openKeys: openKeys || []
        };
    }

    getChildContext = () => {
        return {
            inlineCollapsed: this.getInlineCollapsed()
        };
    }

    componentWillReceiveProps = (nextProps, nextContext) => {
        if (this.props.mode === 'inline'
            && nextProps.mode !== 'inline') {
            this.switchModeFromInline = true;
        }
        if ('openKeys' in nextProps) {
            this.setState({openKeys: nextProps.openKeys});
            return;
        }
        if ((nextProps.inlineCollapsed && !this.props.inlineCollapsed)
            || (nextContext.siderCollapsed && !this.context.siderCollapsed)) {
            this.switchModeFromInline = !!this.state.openKeys.length;
            this.inlineOpenKeys = this.state.openKeys;
            this.setState({openKeys: []});
        }
        if ((!nextProps.inlineCollapsed && this.props.inlineCollapsed)
            || (!nextContext.siderCollapsed && this.context.siderCollapsed)) {
            this.setState({openKeys: this.inlineOpenKeys});
            this.inlineOpenKeys = [];
        }
    }

    setOpenKeys = openKeys => {
        if (!('openKeys' in this.props)) {
            this.setState({openKeys});
        }
    }

    getRealMenuMode = () => {
        const inlineCollapsed = this.getInlineCollapsed();
        if (this.switchModeFromInline && inlineCollapsed) {
            return 'inline';
        }
        const mode = this.props.mode;
        return inlineCollapsed ? 'vertical' : mode;
    }

    getInlineCollapsed = () => {
        const inlineCollapsed = this.props.inlineCollapsed;
        if (this.context.siderCollapsed !== undefined) {
            return this.context.siderCollapsed;
        }
        return inlineCollapsed;
    }

    getMenuOpenAnimation(menuMode) {
        const {openAnimation, openTransitionName} = this.props;
        let menuOpenAnimation = openAnimation || openTransitionName;
        if (openAnimation === undefined && openTransitionName === undefined) {
            switch (menuMode) {
                case 'horizontal':
                    menuOpenAnimation = 'slide-up';
                    break;
                case 'vertical':
                    // When mode switch from inline
                    // submenu should hide without animation
                    if (this.switchModeFromInline) {
                        menuOpenAnimation = '';
                        this.switchModeFromInline = false;
                    } else {
                        menuOpenAnimation = 'zoom-big';
                    }
                    break;
                case 'inline':
                    menuOpenAnimation = {
                        ...animation,
                        leave: (node, done) => animation.leave(node, () => {
                            // Make sure inline menu leave animation finished before mode is switched
                            this.switchModeFromInline = false;
                            this.setState({});
                            done();
                        })
                    };
                    break;
                default:
            }
        }
        return menuOpenAnimation;
    }

    handleOpenChange = openKeys => {
        this.setOpenKeys(openKeys);
        const onOpenChange = this.props.onOpenChange;
        if (onOpenChange) {
            onOpenChange(openKeys);
        }
    };

    handleClick = e => {
        this.handleOpenChange([]);

        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    };

    inlineOpenKeys = [];

    render() {
        const {
            prefixCls, className, mode, style,
            needBorder, arrowPosition, size
        } = this.props;
        let menuLevel = this.props.menuLevel;
        if (+menuLevel === 4) {
            // 向下兼容，3.0版本去掉四级了
            menuLevel = 3;
        }
        const menuMode = this.getRealMenuMode();
        const menuOpenAnimation = this.getMenuOpenAnimation(menuMode);
        const menuClassName = classNames(`${prefixCls}-light`, {
            [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
            [`${prefixCls}-container-border`]: (mode === 'inline') && needBorder,
            [`${prefixCls}-container-arrow-left`]: arrowPosition === 'left'
        });
        const currentSize = size || horizontalMap[menuLevel] || 'medium';
        const menuBoxCls = classNames(
            `${prefixCls}-${mode}-box`,
            `${prefixCls}-${mode}-${currentSize}`,
            className
        );
        const menuProps = {
            openKeys: this.state.openKeys,
            onOpenChange: this.handleOpenChange,
            className: menuClassName,
            mode: menuMode,
            inlineIndent: 16
        };
        if (menuMode !== 'inline') {
            menuProps.onClick = this.handleClick;
            menuProps.openTransitionName = menuOpenAnimation;
        } else {
            menuProps.openAnimation = menuOpenAnimation;
        }
        const RcMenuProps = {
            ...this.props
        };
        delete RcMenuProps.menuLevel;
        delete RcMenuProps.needBorder;
        delete RcMenuProps.arrowPosition;
        return (
            <div className={menuBoxCls} style={style}>
                <RcMenu {...RcMenuProps} {...menuProps} />
            </div>
        );
    }
}
