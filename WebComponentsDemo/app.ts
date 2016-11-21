class App {
    constructor(private appContainer: HTMLElement) {
    }
}

window.onload = () => {
    const el = document.getElementById('app-container');
    const app = new App(el);
};
