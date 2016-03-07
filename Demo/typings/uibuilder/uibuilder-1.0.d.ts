declare module UIBuilder {
    class Component<T> {
        protected props: T;
        constructor(props: T);
        render(): Node;
    }
    function createElement(type: any, props: any, ...children: any[]): Node;
}
