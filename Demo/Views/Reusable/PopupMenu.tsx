/// <reference path="../../typings/uibuilder/uibuilder-1.2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

module Demo.Views {
    export interface PopupMenuProps extends UIBuilder.Props {
        onMenuItemSelected: ($item: JQuery) => void;
    }

    export class PopupMenu extends UIBuilder.Component<PopupMenuProps> {
        private $el: JQuery;

        constructor(props: PopupMenuProps) {
            super(props);
        }

        private onFocus(): void {
            this.$el.find('.menu-item').removeClass('current').eq(0).addClass('current');
        }

        private onKeyDown(event: KeyboardEvent): void {
            let $items = this.$el.find('.menu-item');
            let $current = this.$el.find('.current');
            let currentIndex = $items.index($current);
            switch (event.keyCode) {
                case KeyCodes.DownArrow:
                    currentIndex = (currentIndex === -1 || currentIndex === $items.length - 1) ? 0 : (currentIndex + 1);
                    $items.removeClass('current').eq(currentIndex).addClass('current');
                    break;
                case KeyCodes.UpArrow:
                    currentIndex = (currentIndex === -1 || currentIndex == 0) ? ($items.length - 1) : (currentIndex - 1);
                    $items.removeClass('current').eq(currentIndex).addClass('current');
                    break;
                case KeyCodes.Escape:
                    this.$el.hide();
                    break;
                case KeyCodes.Enter:
                    if ($current.length === 1) {
                        this.$el.hide();
                        this.props.onMenuItemSelected($current);
                    }
                    break;
            }
            event.preventDefault();
        }

        private onMouseOver(event: Event): void {
            let $item = $(event.target);
            if ($item.hasClass('menu-item')) {
                this.$el.find('.menu-item').removeClass('current');
                $item.addClass('current');
            }
        }

        private onClick(event: Event): void {
            var $item = $(event.target);
            if ($item.hasClass('menu-item')) {
                this.$el.hide();
                this.props.onMenuItemSelected($item);
            }
        }

        public render(): HTMLElement {
            return (
                <div className="popup-menu" tabIndex="0"
                    ref={el => this.$el = $(el)}
                    onFocus={() => this.onFocus()}
                    onBlur={ev => this.$el.hide()}
                    onKeyDown={ev => this.onKeyDown(ev)}
                    onMouseOver={ev => this.onMouseOver(ev)}
                    onClick={ev => this.onClick(ev)}>
                    {this.props.children}
                </div>
            );
        }
    }
}
