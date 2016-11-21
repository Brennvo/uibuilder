var Demo;
(function (Demo) {
    var Views;
    (function (Views) {
        function onItemAdded(ev) {
            console.log(`item added: ${ev.detail}`);
        }
        function demoPage(items) {
            return (UIBuilder.createElement("div", {className: "demo-page"}, 
                UIBuilder.createElement("h1", null, "Web Components Demo"), 
                UIBuilder.createElement("div", null, 
                    UIBuilder.createElement("div", {className: "prompt"}, "Enter your favorite artists, separated by commas:"), 
                    UIBuilder.createElement("zx-listeditor", {id: "artists", items: items, itemadded: ev => onItemAdded(ev)})), 
                UIBuilder.createElement("div", {className: "button-bar"}, 
                    UIBuilder.createElement("button", {type: "button", id: "set"}, "Set"), 
                    UIBuilder.createElement("button", {type: "button", id: "get"}, "Get")), 
                UIBuilder.createElement("pre", {class: "result"})));
        }
        Views.demoPage = demoPage;
    })(Views = Demo.Views || (Demo.Views = {}));
})(Demo || (Demo = {}));
