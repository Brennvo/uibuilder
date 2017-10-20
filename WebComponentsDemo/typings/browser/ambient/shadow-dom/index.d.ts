interface Element {
    content: any;
}

interface ShadowRoot extends DocumentFragment {
}

interface HTMLElement extends Element {
    isConnected: boolean;
    shadowRoot: ShadowRoot;
    attachShadow(options: any): any;
}
