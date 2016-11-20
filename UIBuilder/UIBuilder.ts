namespace UIBuilder {
    const attribMap = {
        'htmlFor': 'for',
        'className': 'class',
        'defaultValue': 'value',
        'defaultChecked': 'checked'
    };

    const eventMap = {
        // Clipboard events
        'onCopy': 'oncopy',
        'onCut': 'oncut',
        'onPaste': 'onpaste',
        // Keyboard events
        'onKeyDown': 'onkeydown',
        'onKeyPress': 'onkeypress',
        'onKeyUp': 'onkeyup',
        // Focus events
        'onFocus': 'onfocus',
        'onBlur': 'onblur',
        // Form events
        'onChange': 'onchange',
        'onInput': 'oninput',
        'onSubmit': 'onsubmit',
        // Mouse events
        'onClick': 'onclick',
        'onContextMenu': 'oncontextmenu',
        'onDoubleClick': 'ondblclick',
        'onDrag': 'ondrag',
        'onDragEnd': 'ondragend',
        'onDragEnter': 'ondragenter',
        'onDragExit': 'ondragexit',
        'onDragLeave': 'ondragleave',
        'onDragOver': 'ondragover',
        'onDragStart': 'ondragstart',
        'onDrop': 'ondrop',
        'onMouseDown': 'onmousedown',
        'onMouseEnter': 'onmouseenter',
        'onMouseLeave': 'onmouseleave',
        'onMouseMove': 'onmousemove',
        'onMouseOut': 'onmouseout',
        'onMouseOver': 'onmouseover',
        'onMouseUp': 'onmouseup',
        // Selection events
        'onSelect': 'onselect',
        // Touch events
        'onTouchCancel': 'ontouchcancel',
        'onTouchEnd': 'ontouchend',
        'onTouchMove': 'ontouchmove',
        'onTouchStart': 'ontouchstart',
        // UI events
        'onScroll': 'onscroll',
        // Wheel events
        'onWheel': 'onwheel',
        // Media events
        'onAbort': 'onabort',
        'onCanPlay': 'oncanplay',
        'onCanPlayThrough': 'oncanplaythrough',
        'onDurationChange': 'ondurationchange',
        'onEmptied': 'onemptied',
        'onEncrypted': 'onencrypted',
        'onEnded': 'onended',
        'onLoadedData': 'onloadeddata',
        'onLoadedMetadata': 'onloadedmetadata',
        'onLoadStart': 'onloadstart',
        'onPause': 'onpause',
        'onPlay': 'onplay',
        'onPlaying': 'onplaying',
        'onProgress': 'onprogress',
        'onRateChange': 'onratechange',
        'onSeeked': 'onseeked',
        'onSeeking': 'onseeking',
        'onStalled': 'onstalled',
        'onSuspend': 'onsuspend',
        'onTimeUpdate': 'ontimeupdate',
        'onVolumeChange': 'onvolumechange',
        'onWaiting': 'onwaiting',
        // Image events
        'onLoad': 'onload',
        'onError': 'onerror'
    };

    const svgElements = {
        'circle': true,
        'clipPath': true,
        'defs': true,
        'ellipse': true,
        'g': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'mask': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'text': true,
        'tspan': true
    };

    export class Component<P> {
        constructor(protected props: P) {
        }

        public render(): HTMLElement {
            return null;
        }
    }

    export interface Props {
        children?: any;
    }

    export function createElement<P extends UIBuilder.Props>(type: any, props: P, ...children: any[]): HTMLElement | SVGElement {
        let node: HTMLElement | SVGElement;
        if (typeof type === 'function') {
            let _props = clone(props);
            _props.children = children;
            let component: Component<P> = new type(_props);
            node = component.render();
            applyComponentProps(node, props);
        }
        else {
            if (svgElements[type]) {
                node = document.createElementNS("http://www.w3.org/2000/svg", type);
            }
            else {
                node = document.createElement(type);
            }
            applyProps(node, props);
            for (let child of children) {
                if (child instanceof Node) {
                    node.appendChild(child);
                }
                else if (Array.isArray(child)) {   // example: <div>{items}</div>
                    for (let item of child) {
                        if (item) {
                            node.appendChild(item);
                        }
                    }
                }
                else if (child) {
                    node.appendChild(document.createTextNode(child));
                }
            }
        }
        return node;
    }

    function applyProps(node: HTMLElement | SVGElement, props: Object): void {
        for (let prop in props) {
            if (prop === 'ref') {
                if (typeof props[prop] === 'function') {
                    props[prop](node);
                }
                else {
                    throw new Error("'ref' must be a function");
                }
            }
            else if (eventMap.hasOwnProperty(prop)) {
                node[eventMap[prop]] = props[prop];
            }
            else if (prop === 'style') {
                let style = props[prop];
                for (let styleName in style) {
                    (<HTMLElement>node).style[styleName] = style[styleName];
                }
            }
            else {
                let attrib = attribMap.hasOwnProperty(prop) ? attribMap[prop] : prop;
                node.setAttribute(attrib, props[prop]);
            }
        }
    }

    function applyComponentProps(node: HTMLElement, props: Object): void {
        const ref = props['ref'];
        if (ref) {
            if (typeof ref === 'function') {
                ref(node);
            }
            else {
                throw new Error("'ref' must be a function");
            }
        }
    }
}
