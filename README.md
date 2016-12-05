# UIBuilder
Typed HTML templates using TypeScript's TSX files.

## JSX for Web Components
UIBuilder brings the power and convenience of JSX to Web Components.

### What is JSX?
JSX is an extension to JavaScript that allows you to build dynamic user interfaces by embedding HTML-like syntax within JavaScript code. Other templating languages either embed HTML as strings within JavaScript code, or embed code as strings within HTML, which means tools are only able to provide compile-time checking for either code or markup, not both. In JSX both code and markup are first-class citizens, which enables tools to provide compile-time checking, syntax coloring and "intellisense" for code as well as markup. More information about JSX can be found [here](https://facebook.github.io/jsx/).

TypeScript's implementation of JSX is [TSX](https://basarat.gitbooks.io/typescript/content/docs/jsx/tsx.html). UIBuilder leverages TSX and lets the TypeScript compiler do all of the heavy lifting.

### What are Web Components?

Web Components are user interface widgets that are written once and can be reused reliably on multiple pages and Web sites. The reliability comes from the fact that the DOM tree inside a Web Component is encapsulated from the rest of the page, so you don't have to worry about things like conflicting id and style class names or JavaScript variables. The technology that enables this isolation is Shadow DOM. Read more about it [here](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom).

Web Components are a W3 standard. The W3 page for Web Components can be found [here](https://www.w3.org/standards/techs/components).

Note: Shadow DOM is currently implemented in Chrome, Opera and Safari. Firefox support is in development and [Edge will also support Shadow DOM](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/). In the meantime you can use [Polymer](https://www.polymer-project.org) to build custom elements.

If you are not interested in Web Components you can still use UIBuilder as a template library.

## Typed Templates

UIBuilder templates are written using TypeScript's TSX syntax which mixes HTML with TypeScript. If you know HTML and TypeScript you already know TSX. You use regular HTML tags for composing UI elements, and regular TypeScript for loops and conditionals. Building custom elements (Components) is supported.

TypeScript compiler is needed to compile TSX files. Visual Studio is not needed. However, if you use Visual Studio you get benefits such as:
* Auto-indent
* Syntax coloring
* Type checking
* Intellisense suggestions for TypeScript expressions
* Refactoring: you can rename variables without worrying about breaking your templates
* Error checking squiggly lines as you type:
    * Mismatched HTML tags
    * TypeScript syntax errors
* Put breakpoints inside your template

## What it doesn't do
Unlike React.js UIBuilder does not automatically update the screen when data changes. 

A valid approach to update the screen is to divide your page into multiple components. When data changes just replace the component that contains stale data. For example, you can update just a single component on your page like this:

```typescript
 const element = UIBuilder.createElement<CustomerPanelProps>(CustomerPanel, { customerInfo: freshCustomerInfo });
 $page.find(".customer-panel").replaceWith(element);
```

## Why not just use React?

React does not have the equivalent of a Shadow DOM. React components are brittle. The brittleness comes from the global nature of HTML, CSS, and JS. The DOM tree inside a React component isn't encapsulated from the rest of the page. This lack of encapsulation means your document stylesheet might accidentally apply to parts inside the widget; your JavaScript might accidentally modify parts inside the widget; your IDs might overlap with IDs inside the component; and so on. (More on Shadow DOM [here](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom).)

Unlike React, UIBuilder is compatible with [Web Components](https://www.w3.org/standards/techs/components) which does not have the above problems.

Web Components also support multiple [named slots](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom#composition_slot) for placing child elements. React components have just one, unnamed slot.

Web Components are a W3 open standard. React is is opensource but it has a patent rider with what is known as a ["strong retaliation clause"](http://www.rosenlaw.com/lj9.htm).

UIBuilder creates real DOM nodes, not virtual nodes, which makes it easier to implement advanced features that require manipulating the DOM directly, such as drag & drop and animation. It is also easier to integrate with DOM-mutating libraries such as d3.js and take full advantage of its features, such as transitions.

UIBuilder does not use any React.js code.

## License
Please see file named LICENSE
