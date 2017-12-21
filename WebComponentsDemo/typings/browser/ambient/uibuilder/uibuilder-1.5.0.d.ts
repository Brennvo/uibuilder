declare namespace UIBuilder {
    class Component<P> {
        protected props: P;
        constructor(props: P);
        render(): HTMLElement;
    }
    interface Props<T> {
        children?: any;
        ref?: (instance: T) => void;
    }
    function createElement<P extends UIBuilder.Props<Component<P>>>(type: any, props: P, ...children: any[]): HTMLElement | SVGElement;
}
declare namespace UIBuilder {
    function clone<T>(obj: T): T;
}
