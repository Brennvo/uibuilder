declare module UIBuilder {
    class Component<T> {
        protected props: T;
        constructor(props: T);
        render(): Node;
    }
    function createElement<T>(type: any, props: T, ...children: any[]): HTMLElement;
}
