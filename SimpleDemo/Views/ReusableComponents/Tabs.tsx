/// <reference path="../../typings/uibuilder/uibuilder-1.4.1.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../Models/Product.ts" />

namespace Demo.Views {
    export interface TabsProps extends UIBuilder.Props {
        tabs: any[];
        selectedIndex: number;
        onTabSelected: (index: number) => void;
    }

    export class Tabs extends UIBuilder.Component<TabsProps> {
        constructor(props: TabsProps) {
            super(props);
        }

        private onClick(event: Event): void {
            const $tab = $(event.target);
            if ($tab.hasClass('tab')) {
                const $tabs = $(event.currentTarget);
                $tabs.find('.tab').removeClass('selected');

                $tab.addClass('selected');

                const index = $tab.data('index');
                this.props.onTabSelected(index);
            }
        }

        public render(): HTMLElement {
            const items = [] as HTMLElement[];
            for (let i = 0; i < this.props.tabs.length; i++) {
                const tab = this.props.tabs[i];
                const className = (i === this.props.selectedIndex) ? "tab selected" : "tab";
                items.push(<div className={className} data-index={i}>{tab.toString()}</div>);
            }
            return <div className="tabs" onClick={ev => this.onClick(ev)}>{items}</div>;
        }
    }
}
