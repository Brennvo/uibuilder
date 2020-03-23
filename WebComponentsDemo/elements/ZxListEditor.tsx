class ZxListEditor extends HTMLElement {
    private container: HTMLDivElement;
    private textInput: HTMLInputElement;
    private minInputWidth = 75;
    private _items: any[];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const container = (
            <div class="container" tabindex="0" ref={el => this.container = el}
                           onKeyDown={ev => this.onContainerKeyDown(ev)} onClick={ev => this.onContainerClick(ev)}>
                <input type="text" ref={el => this.textInput = el} onKeyDown={ev => this.onTextInputKeyDown(ev)} />
            </div>
        );
        this.shadowRoot.appendChild(container);

        this.shadowRoot.appendChild(<style>{css}</style>);
    }

    public get items(): any[] {
        if (this.isConnected) {
            const items = Array.from(this.container.querySelectorAll('.item'));
            this._items = items.map(item => item.textContent);
        }
        return this._items;
    }

    public set items(value: any[]) {
        this._items = value;
        if (this.isConnected) {
            this.displayItems();
        }
    }

    public connectedCallback(): void {
        this.displayItems();

        this.resizeTextInput();
    }

    public disconnectedCallback(): void {
    }

    private displayItems(): void {
        const items = this.container.querySelectorAll(".item");
        items.forEach(item => item.remove());
        if (this._items instanceof Array) {
            this._items.forEach(item => this.finalizeItem(item));
        }
    }

    private onContainerClick(ev: MouseEvent): void {
        const target = ev.target as HTMLElement;
        if (target.classList.contains('delete-item-button')) {
            this.onDeleteItem(ev);
            return;
        }
        let item: HTMLElement;
        if (target.classList.contains('item'))
            item = target;
        else if (target.parentElement && target.parentElement.classList.contains('item'))
            item = target.parentElement;
        if (item) {
            this.deselectAll();
            item.classList.add('selected-item');
            this.textInput.blur();
        }
        else {
            this.deselectAll();
            this.textInput.focus();
        }
    }

    private onContainerKeyDown(ev: KeyboardEvent): void {
        const selected = this.container.querySelector('.selected-item');
        let items = Array.from(this.container.querySelectorAll('.item'));
        let index = items.indexOf(selected);
        if (index == -1)
            return;
        switch (ev.key) {
            case "Backspace":
            case "Delete":
                selected.remove();
                this.resizeTextInput();
                break;
            case "LeftArrow":
                if (index > 0)
                    index--;
                break;
            case "RightArrow":
                index++;
                break;
            case "Home":
                index = 0;
                break;
            case "End":
                index = items.length - 1;
                break;
        }
        this.deselectAll();
        items = Array.from(this.container.querySelectorAll('.item'));
        if (index >= 0 && index < items.length) {
            const selectedItem = items[index];
            selectedItem.classList.add('selected-item');
            this.container.focus();
        }
        else {
            this.textInput.focus();
        }
    }

    private onTextInputKeyDown(ev: KeyboardEvent): void {
        const text = this.textInput.value;
        if (ev.key === "Backspace") {
            if (text.length === 0) {
                // Pressing backspace when text input is empty should select the item before the text input.
                this.deselectAll();
                const items = Array.from(this.container.querySelectorAll('.item'));
                if (items.length) {
                    const last = items[items.length - 1];
                    last.classList.add('selected-item');
                    this.container.focus();
                }
                ev.preventDefault();
            }
        }
        else if (this.isItemSeparator(ev.key)) {
            ev.preventDefault();
            if (text) {
                this.finalizeItem(text);

                const event = new CustomEvent('onitemadded', { detail: text });
                this.dispatchEvent(event);
            }
        }
        else {
            this.deselectAll();
        }
    }

    private deselectAll(): void {
        this.container.querySelectorAll('.selected-item').forEach(item => item.classList.remove('selected-item'));
    }

    private finalizeItem(item: any): void {
        if (!item) {
            return;
        }
        const el = this.createItemElement(item.toString());
        this.container.insertBefore(el, this.textInput);
        this.textInput.value = '';
        this.resizeTextInput();
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        this.container.scrollTop = this.container.scrollHeight;
    }

    private onDeleteItem(ev: MouseEvent): void {
        const item = (ev.target as HTMLElement).parentElement;
        if (item.classList.contains('item')) {
            item.remove();
            this.resizeTextInput();
            window.setTimeout(() => this.textInput.focus(), 0);
        }
    }

    private createItemElement(text: string): Element {
        return (
            <div class="item">
                <span>{text}</span>
                <span class="delete-item-button"></span>
            </div>
        );
    }

    private resizeTextInput(): void {
        this.textInput.style.width = this.minInputWidth + 'px';
        const containerWidth = this.container.clientWidth;
        const availableWidth = containerWidth - this.textInput.offsetLeft;
        this.textInput.style.width = availableWidth + 'px';
    }

    private isItemSeparator(key: string): boolean {
        return key === "," || key === "Enter";
    }
}

window.customElements.define('zx-listeditor', ZxListEditor);

const css = `
:host {
}

.container {
    border: 1px solid #b3b3b3;
    display: inline-block;
    box-sizing: border-box;
    font-size: 0;
    width: 500px;
    height: 175px;
    padding: 3px;
    overflow-y: auto;
    overflow-x: hidden;
    outline: none;
}

input[type=text] {
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
}

.item {
    display: inline-block;
    font-size: 14px;
    background-color: #E4EEFA;
    border: 1px solid #B3CAF1;
    padding: 0px 5px 1px 5px;
    border-radius: 10px;
    margin-right: 3px;
    margin-bottom: 3px;
    cursor: default;
}

.selected-item {
    background-color: #C7DEF9;
    border-color: #A0BCE8;
}

.delete-item-button:after {
    margin-left: 3px;
    color: #999;
    font-family: 'FontAwesome';
    content: "\f00d";
}

.delete-item-button:hover:after {
    color: #555;
}
`;