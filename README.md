# UIBuilder
Typed HTML templates using TypeScript's TSX files.

## Typed Templates
UIBuilder is a HTML templating library in the style of Mustache and Handlebars, for Web application development using TypeScript. Unlike Mustache or Handlebars, UIBuilder is strongly typed, which means that many programming mistakes can be caught at compile time.

UIBuilder templates are written using TypeScript's TSX syntax which mixes HTML with TypeScript. If you know HTML and TypeScript you already know TSX. You use regular HTML tags for composing UI elements, and regular TypeScript for loops and conditionals. Building custom tags (Components) is supported.

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
Unlike React.js UIBuilder is just a templating library and so does not do automatic screen updates. When using UIBuilder you typically use jQuery to update the screen manually.

Divide your page into multiple components. When data changes just replace the component that contains stale data. For example, you can update just a single component on your page like this:

```typescript
        const element = UIBuilder.createElement<CustomerPanelProps>(CustomerPanel, { customerInfo: updatedCustomerInfo });
        $page.find(".customer-panel").replaceWith(element);
```

#### Why not just use React?
UIBuilder is just a templating library and is therefore much simpler than React. UIBuilder is not a framework, so it doesn't control the behavior of the application---you do.

UIBuilder creates real DOM nodes, not virtual nodes, which makes it easier to implement advanced features such as drag & drop and animation.

Unlike React, UIBuilder is compatible with [Web Components](https://www.w3.org/standards/techs/components#w3c_all).

UIBuilder does not use any React.js code.

## License
Please see file named LICENSE
