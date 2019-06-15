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
            this.appContainer.appendChild(page);

            if (window.customElements && this.appContainer.attachShadow) {
                document.querySelector(".browser-warning").remove();
            }

            this.appContainer.addEventListener('click', ev => this.onAppContainerClick(ev));
            this.appContainer.querySelector("#artists").addEventListener("onitemadded", ev => this.onItemAdded(ev));
        }

        private onAppContainerClick(ev: MouseEvent): void {
            const target = ev.target as HTMLElement;
            if (target.id === "set")
                this.onSetClick();
            else if (target.id === "get")
                this.onGetClick();
        }

        private onItemAdded(ev: Event): void {
            const item = (ev as any).detail;
            document.querySelector('.result').textContent = `item added: ${item}`;
        }

        private onSetClick(): void {
            const artists = [
                'Angus Young',
                'Slash',
                'Alex Lifeson',
                'Richie Sambora'
            ];
            (document.getElementById("artists") as any).items = artists;
        }

        private onGetClick(): void {
            const items = (document.getElementById("artists") as any).items;
            document.querySelector('.result').textContent = JSON.stringify(items);
        }
    }
}

window.onload = () => {
    const el = document.getElementById('app-container');
    const app = new Demo.App(el);
};
