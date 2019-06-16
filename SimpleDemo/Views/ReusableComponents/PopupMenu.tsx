namespace Demo.Views {
    export interface PopupMenuProps extends UIBuilder.Props<PopupMenu> {
        onMenuItemSelected: (item: HTMLElement) => void;
    }

    export class PopupMenu extends UIBuilder.Component<PopupMenuProps> {
        private el: HTMLElement;

        constructor(props: PopupMenuProps) {
            super(props);
        }

        private onFocus(): void {
            const items = Array.from(this.el.querySelectorAll('.menu-item'));
            items.forEach(item => item.classList.remove('current'));
            items[0].classList.add('current');
        }

        private onBlur(): void {
            this.el.classList.add("hidden");
        }

        private setCurrentItem(index: number): void {
            const items = Array.from(this.el.querySelectorAll('.menu-item'));
            items.forEach(item => item.classList.remove('current'));
            if (index !== -1)
                items[index].classList.add('current');
        }

        private onKeyDown(event: KeyboardEvent): void {
            const items = Array.from(this.el.querySelectorAll('.menu-item'));
            const current = this.el.querySelector('.current') as HTMLElement;
            let currentIndex = items.indexOf(current);
            switch (event.keyCode) {
                case KeyCodes.DownArrow:
                    currentIndex = (currentIndex === -1 || currentIndex === items.length - 1) ? 0 : (currentIndex + 1);
                    this.setCurrentItem(currentIndex);
                    break;
                case KeyCodes.UpArrow:
                    currentIndex = (currentIndex === -1 || currentIndex === 0) ? (items.length - 1) : (currentIndex - 1);
                    this.setCurrentItem(currentIndex);
                    break;
                case KeyCodes.Escape:
                    this.el.classList.add('hidden');
                    break;
                case KeyCodes.Enter:
                    if (current) {
                        this.el.classList.add('hidden');
                        this.props.onMenuItemSelected(current);
                    }
                    break;
            }
            event.preventDefault();
        }

        private onMouseOver(event: Event): void {
            const item = event.target as HTMLElement;
            if (item.classList.contains('menu-item')) {
                this.setCurrentItem(-1);
                item.classList.add('current');
            }
        }

        private onClick(event: Event): void {
            const item = event.target as HTMLElement;
            if (item.classList.contains('menu-item')) {
                this.el.classList.add('hidden');
                this.props.onMenuItemSelected(item);
            }
        }

        public render(): JSX.Element {
            return (
                <div className="popup-menu" tabIndex="0"
                    ref={el => this.el = el}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    onKeyDown={ev => this.onKeyDown(ev)}
                    onMouseOver={ev => this.onMouseOver(ev)}
                    onClick={ev => this.onClick(ev)}>
                    {this.props.children}
                </div>
            );
        }
    }
}
