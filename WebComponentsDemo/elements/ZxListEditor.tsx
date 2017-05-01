class ZxListEditor extends HTMLElement {
    private $container: JQuery;
    private $textInput: JQuery;
    private minInputWidth = 75;
    private _items: any[];

    private static ownerDocument = document.currentScript.ownerDocument;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = ZxListEditor.ownerDocument.querySelector('template');
        const instance = template.content.cloneNode(true) as HTMLElement;
        this.shadowRoot.appendChild(instance);

        const container = (
            <div class="container" tabindex="0">
                <input type="text" />
            </div>
        );
        this.shadowRoot.appendChild(container);
    }

    public get items(): any[] {
        if (this.isConnected) {
            const $items = this.$container.find('.item');
            this._items = $items.toArray().map(item => $(item).text());
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
        this.$container = $(this.shadowRoot).find('.container');
        this.$textInput = this.$container.find("input[type=text]");

        this.$container.on('keydown', 'input[type=text]', ev => this.onTextInputKeyDown(ev));
        this.$container.on('keydown', ev => this.onContainerKeyDown(ev));
        this.$container.on('click', ev => this.onContainerClick(ev));
        this.$container.on('click', '.delete-item-button', ev => this.onDeleteItem(ev));

        this.displayItems();

        this.resizeTextInput();
    }

    public disconnectedCallback(): void {
        this.$container.off();
    }

    private displayItems(): void {
        this.$container.find('.item').remove();
        if (this._items instanceof Array) {
            this._items.forEach(item => this.finalizeItem(item));
        }
    }

    private onContainerClick(ev: JQueryEventObject): void {
        const $target = $(ev.target);
        let $item: JQuery;
        if ($target.hasClass('item'))
            $item = $target;
        else if ($target.parent().hasClass('item'))
            $item = $target.parent();
        if ($item && $item.length === 1) {
            this.deselectAll();
            $item.addClass('selected-item');
            this.$textInput.blur();
        }
        else {
            this.deselectAll();
            this.$textInput.focus();
        }
    }

    private onContainerKeyDown(ev: JQueryEventObject): void {
        const $selected = this.$container.find('.selected-item');
        let index = this.$container.find('.item').index($selected);
        if (index == -1)
            return;
        let $items = this.$container.find('.item');
        switch (ev.which) {
            case KeyCodes.Backspace:
            case KeyCodes.Delete:
                $selected.remove();
                this.resizeTextInput();
                break;
            case KeyCodes.LeftArrow:
                if (index > 0)
                    index--;
                break;
            case KeyCodes.RightArrow:
                index++;
                break;
            case KeyCodes.Home:
                index = 0;
                break;
            case KeyCodes.End:
                index = $items.length - 1;
                break;
        }
        this.deselectAll();
        $items = this.$container.find('.item');
        if (index >= 0 && index < $items.length) {
            const $selectedItem = $items.eq(index);
            $selectedItem.addClass('selected-item');
            this.$container.focus();
        }
        else {
            this.$textInput.focus();
        }
    }

    private onTextInputKeyDown(ev: JQueryEventObject): void {
        const text = this.$textInput.val();
        if (ev.which === KeyCodes.Backspace) {
            if (text.length === 0) {
                // Pressing backspace when text input is empty should select the item before the text input.
                this.deselectAll();
                const $last = this.$container.find('.item').last();
                if ($last.length > 0) {
                    $last.addClass('selected-item');
                    this.$container.focus();
                }
                ev.preventDefault();
            }
        }
        else if (this.isValidItemSeparator(text, ev.which)) {
            this.finalizeItem(text);
            ev.preventDefault();

            const event = new CustomEvent('onitemadded', { detail: text });
            this.dispatchEvent(event);
        }
        else {
            this.deselectAll();
        }
    }

    private deselectAll(): void {
        this.$container.find('.selected-item').removeClass('selected-item');
    }

    private finalizeItem(item: any): void {
        if (!item) {
            return;
        }
        const el = this.createItemElement(item.toString());
        $(el).insertBefore(this.$textInput);
        this.$textInput.val('');
        this.resizeTextInput();
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        const container = this.$container.get(0);
        container.scrollTop = container.scrollHeight;
    }

    private onDeleteItem(ev: JQueryEventObject): void {
        const $item = $(ev.target).parent('.item');
        if ($item.length === 1) {
            $item.remove();
            this.resizeTextInput();
            window.setTimeout(() => this.$textInput.focus(), 0);
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
        this.$textInput.css('width', this.minInputWidth + 'px');
        const containerWidth = this.$container.get(0).clientWidth;
        const pos = this.$textInput.position();
        const availableWidth = containerWidth - pos.left;
        this.$textInput.css('width', availableWidth + 'px');
    }

    private isValidItemSeparator(text: string, key: number): boolean {
        if (!text.length) {
            return false;
        }
        return key === KeyCodes.Comma || key === KeyCodes.Enter;
    }
}

window.customElements.define('zx-listeditor', ZxListEditor);
