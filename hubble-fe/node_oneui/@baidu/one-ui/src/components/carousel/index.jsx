import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SlickCarousel from 'react-slick';
import classNames from 'classnames';
import isInteger from 'lodash/isInteger';
import debounce from 'lodash/debounce';
import {IconChevronRight, IconAngleLeft} from '@baidu/one-ui-icon';
import Button from '../button';

const NextArrow = props => {
    const {onClick = () => {}, prefixCls, showButton, buttonProps = {}} = props;
    const buttonCls = `${prefixCls}-slick-change`;
    let style = {
        display: 'block',
        ...(buttonProps.style || {})
    };
    if (!showButton) {
        style = {
            display: 'none'
        };
    }
    const currentButtonProps = {
        className: classNames(buttonCls, `${buttonCls}-next`, {
            [buttonProps.className]: !!buttonProps.className
        }),
        type: 'translucent',
        icon: <IconChevronRight />,
        size: 'medium',
        style,
        onClick,
        disabled: !onClick
    };
    return <Button {...currentButtonProps} />;
};

const PrevArrow = props => {
    const {onClick = () => {}, prefixCls, showButton, buttonProps = {}} = props;
    const buttonCls = `${prefixCls}-slick-change`;
    let style = {
        display: 'block',
        ...(buttonProps.style || {})
    };
    if (!showButton) {
        style = {
            display: 'none'
        };
    }
    const currentButtonProps = {
        className: classNames(buttonCls, `${buttonCls}-prev`, {
            [buttonProps.className]: !!buttonProps.className
        }),
        type: 'translucent',
        icon: <IconAngleLeft />,
        size: 'medium',
        style,
        onClick,
        disabled: !onClick
    };
    return <Button {...currentButtonProps} />;
};

export default class Carousel extends PureComponent {
    static propTypes = {
        /** 样式前缀 */
        prefixCls: PropTypes.string,
        /** 是否自动播放 */
        autoplay: PropTypes.bool,
        /** 每次滚动几张 */
        slidesToScroll: PropTypes.number,
        /** 宽度 */
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** 每屏幕展示多少张 */
        slidesToShow: PropTypes.number,
        /** 是否无限循环 */
        infinite: PropTypes.bool,
        /** 是否淡入淡出 - 效果 */
        effect: PropTypes.string,
        /** 切换前的function */
        beforeChange: PropTypes.func,
        /** 切换后的function */
        afterChange: PropTypes.func,
        /**
         * 模式， 多片滚动模式，单片模式，默认多片滚动
         */
        mode: PropTypes.oneOf(['multiple', 'single']),
        /**
         * dotPosition, 面板指示点的位置，如果dotPosition为left, right，表示垂直滚动
         * dotPostion为bottom和top的时候为左右滚动
         */
        dotPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
        /**
         * sliderMode - 切换的模式，支持两种 滑动条 or 按钮，后续支持点、数字
         */
        sliderMode: PropTypes.oneOf(['line', 'number', 'dot', 'hide', 'button']),
        className: PropTypes.string,
        nextArrow: PropTypes.node,
        prevArrow: PropTypes.node,
        showButton: PropTypes.bool,
        prevButtonProps: PropTypes.object,
        nextButtonProps: PropTypes.object,
        children: PropTypes.node,
        customSuffix: PropTypes.node,
        initialSlide: PropTypes.number
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-carousel',
        autoplay: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        width: '',
        effect: '',
        infinite: false,
        mode: 'multiple',
        dotPosition: 'bottom',
        sliderMode: 'line',
        className: '',
        showButton: false,
        afterChange() {}
    };

    constructor(props) {
        super(props);
        this.onWindowResized = debounce(this.onWindowResized, 500, {
            leading: false
        });
        this.state = {
            current: props.initialSlide || 0
        };
    }

    componentDidMount() {
        const autoplay = this.props.autoplay;
        if (autoplay) {
            window.addEventListener('resize', this.onWindowResized);
        }
        this.innerSlider = this.slick && this.slick.innerSlider;
    }

    componentWillUnmount() {
        const autoplay = this.props.autoplay;
        if (autoplay) {
            window.removeEventListener('resize', this.onWindowResized);
        }
    }

    onWindowResized = () => {
        const autoplay = this.props.autoplay;
        if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
            this.slick.innerSlider.autoPlay();
        }
    }

    saveSlick = node => {
        this.slick = node;
    }

    next() {
        this.slick.slickNext();
    }

    prev() {
        this.slick.slickPrev();
    }

    goTo(slide, dontAnimate = false) {
        this.slick.slickGoTo(slide, dontAnimate);
    }

    getCarouselIsVertical = () => {
        const dotPosition = this.props.dotPosition;
        if (dotPosition === 'left' || dotPosition === 'right') {
            return true;
        }
        return false;
    }

    isSingleSlideMode = () => {
        return this.props.mode === 'single';
    }

    afterChange = current => {
        this.setState({
            current
        });
        this.props.afterChange(current);
    }

    render() {
        const {
            prefixCls,
            width,
            infinite,
            slidesToShow,
            effect,
            mode,
            dotPosition,
            sliderMode,
            nextArrow,
            prevArrow,
            className,
            showButton,
            prevButtonProps,
            nextButtonProps,
            afterChange,
            ...restProps
        } = this.props;
        const isSlidesToShowIsInteger = isInteger(slidesToShow);
        const vertical = this.getCarouselIsVertical();
        const dotsClass = 'slick-dots';
        const isSingleSlide = this.isSingleSlideMode();
        const wrapperPrefixCls = !isSingleSlide ? prefixCls : `${prefixCls}-${mode}`;
        let showDot = !(sliderMode === 'hide' || sliderMode === 'number');
        if ('customSuffix' in this.props) {
            showDot = false;
        }
        const nextArrowProps = {
            prefixCls,
            showButton: showButton || sliderMode === 'button',
            buttonProps: nextButtonProps
        };
        const prevArrowProps = {
            prefixCls,
            showButton: showButton || sliderMode === 'button',
            buttonProps: prevButtonProps
        };
        const slickCarouselProps = {
            dots: showDot,
            vertical,
            nextArrow: nextArrow || <NextArrow {...nextArrowProps} />,
            prevArrow: prevArrow || <PrevArrow {...prevArrowProps} />,
            cssEase: 'cubic-bezier(.25, .1, .25, 1)',
            infinite,
            slidesToShow: isSingleSlide ? 1 : slidesToShow,
            dotsClass: `${dotsClass} ${dotsClass}-${dotPosition}`,
            afterChange: this.afterChange,
            ...restProps
        };
        const classes = classNames(wrapperPrefixCls, className, {
            [`${wrapperPrefixCls}-vertical`]: vertical,
            [`${wrapperPrefixCls}-half-show`]: !isSlidesToShowIsInteger
        }, `${wrapperPrefixCls}-slider-${sliderMode}`);
        const containerProps = {
            className: classes
        };
        if (width) {
            containerProps.style = {
                width
            };
        }
        if (effect === 'fade') {
            slickCarouselProps.fade = true;
        }
        const current = this.state.current;
        let customNode = null;
        if (this.props.customSuffix) {
            customNode = this.props.customSuffix;
        } else if (sliderMode === 'number') {
            customNode = (
                <div className={`${prefixCls}-custom-suffix`}>
                    {current + 1}
                    /
                    {(this.props.children || []).length}
                </div>
            );
        }
        return (
            <div {...containerProps}>
                <SlickCarousel ref={this.saveSlick} {...slickCarouselProps} />
                {
                    !isSlidesToShowIsInteger
                        ? (<div className={`${prefixCls}-half-mask`} />)
                        : null
                }
                {customNode}
            </div>
        );
    }
}

NextArrow.propTypes = {
    onClick: PropTypes.func,
    prefixCls: PropTypes.string,
    showButton: PropTypes.bool,
    buttonProps: PropTypes.object,
    disabled: PropTypes.bool
};

PrevArrow.propTypes = {
    onClick: PropTypes.func,
    prefixCls: PropTypes.string,
    showButton: PropTypes.bool,
    buttonProps: PropTypes.object,
    disabled: PropTypes.bool
};
