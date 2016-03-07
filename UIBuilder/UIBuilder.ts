module UIBuilder {
    export class Component<T> {
        constructor(protected props: T) {
        }

        public render(): Node {
            return null;
        }
    }

    export function createElement(type: any, props: any, ...children: any[]): Node {
        let node = makeNode(type, props);
        for (let child of children) {
            if (child instanceof Node) {
                node.appendChild(child);
            }
            else if (Array.isArray(child)) {
                for (let item of child) {
                    node.appendChild(item);
                }
            }
            else {
                node.appendChild(document.createTextNode(child));
            }
        }
        return node;
    }

    function makeNode(type: any, props: any): Node {
        if (typeof type === 'function') {
            let component = new type(props);
            return component.render();
        }
        else {
            let node = document.createElement(type);
            applyProps(node, props);
            return node;
        }
    }

    function applyProps(node: HTMLElement, props: any): void {
        for (let prop in props) {
            let attrib = attribMap.hasOwnProperty(prop) ? attribMap[prop] : prop;
            node.setAttribute(attrib, props[prop]);
        }
    }

    let attribMap = {
        'htmlFor': 'for',
        'className': 'class',
        'defaultValue': 'value',
        'defaultChecked': 'checked'
    };
}
