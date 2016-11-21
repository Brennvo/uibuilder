namespace Demo {
    export class App {
        constructor(private appContainer: HTMLElement) {
            const items = [
                'Taylor Swift',
                'Rihanna',
                'Beyoncé',
                'Britney Spears'
            ];
            const page = Demo.Views.demoPage(items);
            $(appContainer).append(page);

            if (window.customElements && appContainer.attachShadow) {
                $(".browser-warning").hide();
            }

            $(appContainer).on('click', '#set', () => this.onSetClick());
            $(appContainer).on('click', '#get', () => this.onGetClick());
            $('#artists').on('onitemadded', ev => this.onItemAdded(ev));
        }

        private onItemAdded(ev: JQueryEventObject): void {
            const item = (<any>ev.originalEvent).detail;
            $('.result').text(`item added: ${item}`);
        }

        private onSetClick(): void {
            const artists = [
                'Angus Young',
                'Slash',
                'Alex Lifeson',
                'Richie Sambora'
            ];
            $("#artists").prop('items', artists);
        }

        private onGetClick(): void {
            const items = $("#artists").prop('items');
            $('.result').text(JSON.stringify(items));
        }
    }
}

window.onload = () => {
    const el = document.getElementById('app-container');
    const app = new Demo.App(el);
};
