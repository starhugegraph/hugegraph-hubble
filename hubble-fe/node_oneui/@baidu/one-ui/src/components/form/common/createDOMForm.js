import ReactDOM from 'react-dom';
import scrollIntoView from 'dom-scroll-into-view';
import has from 'lodash/has';
import createBaseForm from './createBaseForm';
import {mixin as formMixin} from './createForm';
import {getParams} from '../../../core/formTools';

function computedStyle(el, prop) {
    const getComputedStyle = window.getComputedStyle;
    const style = getComputedStyle ? getComputedStyle(el) : el.currentStyle;
    if (style) {
        return style[
            prop.replace(/-(\w)/gi, (word, letter) => {
                return letter.toUpperCase();
            })
        ];
    }
    return undefined;
}

function getScrollableContainer(n) {
    let node = n;
    let nodeName;
    /* eslint no-cond-assign:0 */
    while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
        const overflowY = computedStyle(node, 'overflowY');
        if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
            return node;
        }
        node = node.parentNode;
    }
    return nodeName === 'body' ? node.ownerDocument : node;
}

const mixin = {
    getForm() {
        return {
            ...formMixin.getForm.call(this),
            validateFieldsAndScroll: this.validateFieldsAndScroll
        };
    },

    validateFieldsAndScroll(ns, opt, cb) {
        const {names, callback, options} = getParams(ns, opt, cb);

        const newCb = (error, values) => {
            if (error) {
                const validNames = this.fieldsStore.getValidFieldsName();
                let firstNode;
                let firstTop;

                validNames.forEach(name => {
                    if (has(error, name)) {
                        const instance = this.getFieldInstance(name);
                        if (instance) {
                            const node = ReactDOM.findDOMNode(instance);
                            const top = node.getBoundingClientRect().top;
                            if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                                firstTop = top;
                                firstNode = node;
                            }
                        }
                    }
                });

                if (firstNode) {
                    const c = options.container || getScrollableContainer(firstNode);
                    scrollIntoView(firstNode, c, {
                        onlyScrollIfNeeded: true,
                        ...options.scroll
                    });
                }
            }

            if (typeof callback === 'function') {
                callback(error, values);
            }
        };
        return this.validateFields(names, options, newCb);
    }
};

function createDOMForm(option) {
    return createBaseForm({
        ...option
    }, [mixin]);
}

export default createDOMForm;
