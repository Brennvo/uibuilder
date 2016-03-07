var UIBuilder;
(function (UIBuilder) {
    var Component = (function () {
        function Component(props) {
            this.props = props;
        }
        Component.prototype.render = function () {
            return null;
        };
        return Component;
    }());
    UIBuilder.Component = Component;
    function createElement(type, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var node = makeNode(type, props);
        for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
            var child = children_1[_a];
            if (child instanceof Node) {
                node.appendChild(child);
            }
            else if (Array.isArray(child)) {
                for (var _b = 0, child_1 = child; _b < child_1.length; _b++) {
                    var item = child_1[_b];
                    node.appendChild(item);
                }
            }
            else {
                node.appendChild(document.createTextNode(child));
            }
        }
        return node;
    }
    UIBuilder.createElement = createElement;
    function makeNode(type, props) {
        if (typeof type === 'function') {
            var component = new type(props);
            return component.render();
        }
        else {
            var node = document.createElement(type);
            applyProps(node, props);
            return node;
        }
    }
    function applyProps(node, props) {
        for (var prop in props) {
            var attrib = attribMap.hasOwnProperty(prop) ? attribMap[prop] : prop;
            node.setAttribute(attrib, props[prop]);
        }
    }
    var attribMap = {
        'htmlFor': 'for',
        'className': 'class',
        'defaultValue': 'value',
        'defaultChecked': 'checked'
    };
})(UIBuilder || (UIBuilder = {}));
