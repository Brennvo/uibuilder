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

### Why not just use React?
UIBuilder is just a templating library and is therefore much simpler than React. You are in control. UIBuilder does not use any React.js code.
