import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import {Provider, create} from 'mini-store';
import _ from 'lodash';
import classes from 'component-classes';
import {polyfill} from 'react-lifecycles-compat';
import ColumnManager from './columnManager';
import HeadTable from './headTable';
import BodyTable from './bodyTable';
import ExpandableTable from './expandableTable';

// 浏览器视口的高度
export const getWindowHeight = () => {
    if (!window) {
        return 0;
    }
    let windowHeight = 0;
    const document = window.document;
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
};

class ComponentTable extends PureComponent {
    static propTypes = {
        headerFixTop: PropTypes.number,
        bottomScroll: PropTypes.object,
        data: PropTypes.array,
        useFixedHeader: PropTypes.bool,
        columns: PropTypes.array,
        prefixCls: PropTypes.string,
        bodyStyle: PropTypes.object,
        style: PropTypes.object,
        rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        onRow: PropTypes.func,
        onHeaderRow: PropTypes.func,
        showHeader: PropTypes.bool,
        title: PropTypes.func,
        id: PropTypes.string,
        footer: PropTypes.func,
        emptyText: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        scroll: PropTypes.object,
        rowRef: PropTypes.func,
        children: PropTypes.node,
        components: PropTypes.shape({
            table: PropTypes.any,
            header: PropTypes.shape({
                wrapper: PropTypes.any,
                row: PropTypes.any,
                cell: PropTypes.any
            }),
            body: PropTypes.shape({
                wrapper: PropTypes.any,
                row: PropTypes.any,
                cell: PropTypes.any
            })
        }),
        ...ExpandableTable.PropTypes
    };

    static childContextTypes = {
        table: PropTypes.any,
        components: PropTypes.any
    };

    static defaultProps = {
        headerFixTop: null,
        data: [],
        useFixedHeader: false,
        rowKey: 'key',
        rowClassName: () => '',
        onRow() { },
        onHeaderRow() { },
        prefixCls: 'new-fc-one-table',
        bodyStyle: {},
        style: {},
        showHeader: true,
        scroll: {},
        bottomScroll: {
            bottom: null,
            style: {}
        },
        rowRef: () => null,
        emptyText: () => '暂无数据'
    };

    constructor(props) {
        super(props);
        this.columnManager = new ColumnManager(props.columns, props.children);
        this.store = create({
            currentHoverKey: null,
            fixedColumnsHeadRowsHeight: [],
            fixedColumnsBodyRowsHeight: [],
            isHeaderFixed: true
        });

        this.setScrollPosition('left');
        this.debouncedWindowResize = _.debounce(this.handleWindowResize, 150);
        this.debouncedWindowScroll = this.handleWindowScroll.bind(this);
        this.renderBottomScroll = this.renderBottomScroll.bind(this);
    }

    state = {};

    getChildContext() {
        return {
            table: {
                props: this.props,
                columnManager: this.columnManager,
                saveRef: this.saveRef,
                headTable: this.headTable,
                rightTable: this.rightTable,
                rightContainerTable: this.rightContainerTable,
                leftTable: this.leftTable,
                leftContainerTable: this.leftContainerTable,
                bottomScroll: this.bottomScroll,
                components: _.merge(
                    {
                        table: 'table',
                        header: {
                            wrapper: 'thead',
                            row: 'tr',
                            cell: 'th'
                        },
                        body: {
                            wrapper: 'tbody',
                            row: 'tr',
                            cell: 'td'
                        }
                    },
                    this.props.components
                )
            }
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.columns && nextProps.columns !== prevState.columns) {
            return {
                columns: nextProps.columns,
                children: null
            };
        } if (nextProps.children !== prevState.children) {
            return {
                columns: null,
                children: nextProps.children
            };
        }
        return null;
    }

    componentDidMount() {
        if (this.columnManager.isAnyColumnsFixed()) {
            const that = this;
            that.handleWindowResize();
            this.resizeEvent = addEventListener(window, 'resize', this.debouncedWindowResize);
        }

        if (this.props.headerFixTop !== null || this.props.bottomScroll.bottom !== null) {
            this.timer = setInterval(() => {
                const {
                    bodyTable,
                    bottomScrollContent,
                    rightContainerTable,
                    rightTable,
                    leftContainerTable,
                    leftTable,
                    headTable,
                    fixedHeadTable
                } = this;
                if (bodyTable && bottomScrollContent && bodyTable.offsetWidth !== bottomScrollContent.offsetWidth) {
                    bottomScrollContent.style.width = `${bodyTable.scrollWidth}px`;
                }
                if (rightContainerTable && rightTable && rightContainerTable.offsetHeight !== rightTable.offsetHeight) {
                    rightContainerTable.style.height = `${rightTable.offsetHeight}px`;
                }
                if (leftContainerTable && leftTable && leftContainerTable.offsetHeight !== leftTable.offsetHeight) {
                    leftContainerTable.style.height = `${leftTable.offsetHeight}px`;
                }
                if (headTable && fixedHeadTable && headTable.offsetHeight !== fixedHeadTable.offsetHeight) {
                    headTable.style.height = `${fixedHeadTable.offsetHeight}px`;
                }
                if (headTable && bodyTable && headTable.offsetWidth !== bodyTable.offsetWidth) {
                    headTable.style.width = `${bodyTable.offsetWidth}px`;
                }
            }, 100);
            this.scrollEvent = addEventListener(window, 'scroll', this.debouncedWindowScroll);
        }
        if (this.props.headerFixTop !== null) {
            this.handleWindowScroll();
            this.scrollEvent = addEventListener(window, 'scroll', this.debouncedWindowScroll);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.columnManager.isAnyColumnsFixed()) {
            this.handleWindowResize();
            if (!this.resizeEvent) {
                this.resizeEvent = addEventListener(window, 'resize', this.debouncedWindowResize);
            }
        }
        // when table changes to empty, reset scrollLeft
        if (prevProps.data.length > 0 && this.props.data.length === 0 && this.hasScrollX()) {
            this.resetScrollX();
        }

        if (this.props.headerFixTop !== null || this.props.bottomScroll.bottom !== null) {
            this.handleWindowScroll();
            if (!this.scrollEvent) {
                this.scrollEvent = addEventListener(window, 'scroll', this.debouncedWindowScroll);
            }
            if (this.headTable) {
                this.headTable.scrollLeft = this.lastScrollLeft;
            }
            if (this.fixedHeadTable) {
                this.fixedHeadTable.scrollLeft = this.lastScrollLeft;
            }
            if (this.bottomScroll) {
                this.bottomScroll.scrollLeft = this.lastScrollLeft;
            }
        }
    }

    componentWillUnmount() {
        if (this.resizeEvent) {
            this.resizeEvent.remove();
        }
        if (this.debouncedWindowResize) {
            this.debouncedWindowResize.cancel();
        }
        if (this.scrollEvent) {
            this.scrollEvent.remove();
        }
        // if (this.debouncedWindowScroll) {
        //   this.debouncedWindowScroll.cancel();
        // }
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    }

    getRowKey = (record, index) => {
        const rowKey = this.props.rowKey;
        const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
        return key === undefined ? index : key;
    };

    setScrollPosition(position) {
        this.scrollPosition = position;
        if (this.tableNode) {
            const {prefixCls} = this.props;
            if (position === 'both') {
                classes(this.tableNode)
                    .remove(new RegExp(`^${prefixCls}-scroll-position-.+$`))
                    .add(`${prefixCls}-scroll-position-left`)
                    .add(`${prefixCls}-scroll-position-right`);
            } else {
                classes(this.tableNode)
                    .remove(new RegExp(`^${prefixCls}-scroll-position-.+$`))
                    .add(`${prefixCls}-scroll-position-${position}`);
            }
        }
    }

    setScrollPositionClassName() {
        const node = this.bodyTable;
        const scrollToLeft = node.scrollLeft === 0;
        const scrollToRight = node.scrollLeft + 1
            >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;
        if (scrollToLeft && scrollToRight) {
            this.setScrollPosition('both');
        } else if (scrollToLeft) {
            this.setScrollPosition('left');
        } else if (scrollToRight) {
            this.setScrollPosition('right');
        } else if (this.scrollPosition !== 'middle') {
            this.setScrollPosition('middle');
        }
    }

    handleWindowResize = () => {
        this.syncFixedTableRowHeight();
        this.setScrollPositionClassName();
    };

    handleWindowScroll = () => {
        const {headTable, bodyTable} = this;
        if (headTable && bodyTable) {
            const headTableRect = headTable.getBoundingClientRect();
            const bodyTableRect = bodyTable.getBoundingClientRect();
            const isHeaderFixed = headTableRect.top < this.props.headerFixTop;
            const isBottomScrollShow = bodyTableRect.bottom > getWindowHeight() - this.props.bottomScroll.bottom;
            if (
                isHeaderFixed !== this.state.isHeaderFixed
                || isBottomScrollShow !== this.state.isBottomScrollShow
            ) {
                this.setState({
                    isHeaderFixed,
                    isBottomScrollShow
                });
            }
        }
    };

    syncFixedTableRowHeight = () => {
        const tableRect = this.tableNode.getBoundingClientRect();
        if (tableRect.height !== undefined && tableRect.height <= 0) {
            return;
        }
        const {prefixCls} = this.props;
        const headRows = this.headTable
            ? this.headTable.querySelectorAll('thead')
            : this.bodyTable.querySelectorAll('thead');
        const bodyRows = this.bodyTable.querySelectorAll(`.${prefixCls}-row`) || [];
        const fixedColumnsHeadRowsHeight = [].map.call(
            headRows,
            row => row.getBoundingClientRect().height || 'auto'
        );
        const fixedColumnsBodyRowsHeight = [].map.call(
            bodyRows,
            row => row.getBoundingClientRect().height || 'auto'
        );
        const state = this.store.getState();
        if (
            shallowequal(state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight)
            && shallowequal(state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)
        ) {
            return;
        }

        this.store.setState({
            fixedColumnsHeadRowsHeight,
            fixedColumnsBodyRowsHeight
        });
    };

    resetScrollX() {
        if (this.headTable) {
            this.headTable.scrollLeft = 0;
        }
        if (this.fixedHeadTable) {
            this.fixedHeadTable.scrollLeft = 0;
        }
        if (this.bodyTable) {
            this.bodyTable.scrollLeft = 0;
        }
        if (this.bottomScroll) {
            this.bottomScroll.scrollLeft = 0;
        }
    }

    hasScrollX() {
        const {scroll = {}} = this.props;
        return 'x' in scroll;
    }

    handleBodyScrollLeft = e => {
        if (e.currentTarget !== e.target) {
            return;
        }
        const target = e.target;
        const {scroll = {}} = this.props;
        const {headTable, bodyTable, fixedHeadTable, bottomScroll} = this;
        if (target.scrollLeft !== this.lastScrollLeft && scroll.x) {
            if (target === bodyTable) {
                if (headTable) {
                    headTable.scrollLeft = target.scrollLeft;
                }
                if (fixedHeadTable) {
                    fixedHeadTable.scrollLeft = target.scrollLeft;
                }
                if (bottomScroll) {
                    bottomScroll.scrollLeft = target.scrollLeft;
                }
            } else if (target === headTable) {
                if (fixedHeadTable) {
                    fixedHeadTable.scrollLeft = target.scrollLeft;
                }
                if (bodyTable) {
                    bodyTable.scrollLeft = target.scrollLeft;
                }
                if (bottomScroll) {
                    bottomScroll.scrollLeft = target.scrollLeft;
                }
            } else if (target === fixedHeadTable) {
                if (headTable) {
                    headTable.scrollLeft = target.scrollLeft;
                }
                if (bodyTable) {
                    bodyTable.scrollLeft = target.scrollLeft;
                }
                if (bottomScroll) {
                    bottomScroll.scrollLeft = target.scrollLeft;
                }
            } else if (target === bottomScroll) {
                if (headTable) {
                    headTable.scrollLeft = target.scrollLeft;
                }
                if (bodyTable) {
                    bodyTable.scrollLeft = target.scrollLeft;
                }
                if (fixedHeadTable) {
                    fixedHeadTable.scrollLeft = target.scrollLeft;
                }
            }

            this.setScrollPositionClassName();
        }
        // Remember last scrollLeft for scroll direction detecting.
        this.lastScrollLeft = target.scrollLeft;
    };

    handleBodyScrollTop = e => {
        const target = e.target;
        if (e.currentTarget !== target) {
            return;
        }
        const {scroll = {}} = this.props;
        const {headTable, bodyTable, fixedColumnsBodyLeft, fixedColumnsBodyRight} = this;
        if (target.scrollTop !== this.lastScrollTop && scroll.y && target !== headTable) {
            const scrollTop = target.scrollTop;
            if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
                fixedColumnsBodyLeft.scrollTop = scrollTop;
            }
            if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
                fixedColumnsBodyRight.scrollTop = scrollTop;
            }
            if (bodyTable && target !== bodyTable) {
                bodyTable.scrollTop = scrollTop;
            }
        }
        // Remember last scrollTop for scroll direction detecting.
        this.lastScrollTop = target.scrollTop;
    };

    handleBodyScroll = e => {
        this.handleBodyScrollLeft(e);
        this.handleBodyScrollTop(e);
    };

    handleWheel = event => {
        const {scroll = {}} = this.props;
        if (window.navigator.userAgent.match(/Trident\/7\./) && scroll.y) {
            event.preventDefault();
            const wd = event.deltaY;
            const target = event.target;
            const {bodyTable, fixedColumnsBodyLeft, fixedColumnsBodyRight} = this;
            let scrollTop = 0;

            if (this.lastScrollTop) {
                scrollTop = this.lastScrollTop + wd;
            } else {
                scrollTop = wd;
            }

            if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
                fixedColumnsBodyLeft.scrollTop = scrollTop;
            }
            if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
                fixedColumnsBodyRight.scrollTop = scrollTop;
            }
            if (bodyTable && target !== bodyTable) {
                bodyTable.scrollTop = scrollTop;
            }
        }
    };

    saveRef = name => node => {
        this[name] = node;
    };

    renderMainTable() {
        const {scroll, prefixCls} = this.props;
        const isAnyColumnsFixed = this.columnManager.isAnyColumnsFixed();
        const scrollable = isAnyColumnsFixed || scroll.x || scroll.y;

        const table = [
            this.renderTable({
                columns: this.columnManager.groupedColumns(),
                isAnyColumnsFixed
            }),
            this.renderEmptyText(),
            this.renderFooter()
        ];

        return scrollable ? <div className={`${prefixCls}-scroll`}>{table}</div> : table;
    }

    renderLeftFixedTable() {
        const {prefixCls} = this.props;
        return (
            <div className={`${prefixCls}-fixed-left`}>
                {this.renderTable({
                    columns: this.columnManager.leftColumns(),
                    fixed: 'left'
                })}
            </div>
        );
    }

    renderRightFixedTable() {
        const {prefixCls} = this.props;

        return (
            <div className={`${prefixCls}-fixed-right`}>
                {this.renderTable({
                    columns: this.columnManager.rightColumns(),
                    fixed: 'right'
                })}
            </div>
        );
    }

    renderTable(options) {
        const {columns, fixed, isAnyColumnsFixed} = options;
        const {prefixCls, scroll = {}} = this.props;
        const tableClassName = scroll.x || fixed ? `${prefixCls}-fixed` : '';
        const isHeaderFixed = this.state.isHeaderFixed;

        const headTable = (
            <HeadTable
                key="head"
                columns={columns}
                fixed={fixed}
                tableClassName={tableClassName}
                handleBodyScrollLeft={this.handleBodyScrollLeft}
                expander={this.expander}
                isHeaderFixed={isHeaderFixed}
            />
        );

        const bodyTable = (
            <BodyTable
                key="body"
                columns={columns}
                fixed={fixed}
                tableClassName={tableClassName}
                getRowKey={this.getRowKey}
                handleWheel={this.handleWheel}
                handleBodyScroll={this.handleBodyScroll}
                expander={this.expander}
                isAnyColumnsFixed={isAnyColumnsFixed}
            />
        );

        return [headTable, bodyTable];
    }

    renderBottomScroll() {
        // const hasBottomScroll = this.state.hasBottomScroll;
        const {bodyTable} = this;
        const prefixCls = this.props.prefixCls;
        const {style, bottom} = this.props.bottomScroll;
        const scrollContainerStyle = {
            ...style,
            bottom,
            width: bodyTable && bodyTable.offsetWidth,
            left: bodyTable && bodyTable.getBoundingClientRect().left
        };
        const scrollContentStyle = {
            width: bodyTable && bodyTable.scrollWidth
        };
        const bottomScroll = (
            <div
                className={`${prefixCls}-scroll-container`}
                style={scrollContainerStyle}
                ref={this.saveRef('bottomScroll')}
                onScroll={this.handleBodyScrollLeft}
            >
                <div
                    className={`${prefixCls}-scroll-content`}
                    style={scrollContentStyle}
                    ref={this.saveRef('bottomScrollContent')}
                />
            </div>
        );
        return bottomScroll;
        // return hasBottomScroll ? bottomScroll : null;
    }

    renderTitle() {
        const {title, prefixCls} = this.props;
        return title ? (
            <div className={`${prefixCls}-title`} key="title">
                {title(this.props.data)}
            </div>
        ) : null;
    }

    renderFooter() {
        const {footer, prefixCls} = this.props;
        return footer ? (
            <div className={`${prefixCls}-footer`} key="footer">
                {footer(this.props.data)}
            </div>
        ) : null;
    }

    renderEmptyText() {
        const {emptyText, prefixCls, data} = this.props;
        if (data.length) {
            return null;
        }
        const emptyClassName = `${prefixCls}-placeholder`;
        return (
            <div className={emptyClassName} key="emptyText">
                {typeof emptyText === 'function' ? emptyText() : emptyText}
            </div>
        );
    }

    render() {
        const props = this.props;
        const prefixCls = props.prefixCls;

        if (this.state.columns) {
            this.columnManager.reset(props.columns);
        } else if (this.state.children) {
            this.columnManager.reset(null, props.children);
        }

        let className = props.prefixCls;
        if (props.className) {
            className += ` ${props.className}`;
        }
        if (props.useFixedHeader || (props.scroll && props.scroll.y)) {
            className += ` ${prefixCls}-fixed-header`;
        }
        if (this.scrollPosition === 'both') {
            className += ` ${prefixCls}-scroll-position-left ${prefixCls}-scroll-position-right`;
        } else {
            className += ` ${prefixCls}-scroll-position-${this.scrollPosition}`;
        }
        const hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
        const hasRightFixed = this.columnManager.isAnyColumnsRightFixed();
        const hasBottomScroll = this.state.isBottomScrollShow && props.bottomScroll.bottom !== null && props.scroll.x;
        return (
            <Provider store={this.store}>
                <ExpandableTable {...props} columnManager={this.columnManager} getRowKey={this.getRowKey}>
                    {expander => {
                        this.expander = expander;
                        return (
                            <div
                                ref={this.saveRef('tableNode')}
                                className={className}
                                style={props.style}
                                id={props.id}
                            >
                                {this.renderTitle()}
                                <div className={`${prefixCls}-content`}>
                                    {this.renderMainTable()}
                                    {hasLeftFixed && this.renderLeftFixedTable()}
                                    {hasRightFixed && this.renderRightFixedTable()}
                                    {hasBottomScroll && this.renderBottomScroll()}
                                </div>
                            </div>
                        );
                    }}
                </ExpandableTable>
            </Provider>
        );
    }
}

polyfill(ComponentTable);

export default ComponentTable;
