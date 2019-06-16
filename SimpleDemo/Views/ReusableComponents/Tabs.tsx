/// <reference path="../../Models/Product.ts" />

namespace Demo.Views {
    export interface TabsProps extends UIBuilder.Props<Tabs> {
        tabs: any[];
        selectedIndex: number;
        onTabSelected: (index: number) => void;
    }

    export class Tabs extends UIBuilder.Component<TabsProps> {
        constructor(props: TabsProps) {
            super(props);
        }

        private onClick(event: Event): void {
            const tab = event.target as HTMLElement;
            if (tab.classList.contains('tab')) {
                const tabs = event.currentTarget as HTMLElement;
                Array.from(tabs.querySelectorAll('.tab')).forEach(tab => tab.classList.remove('selected'));

                tab.classList.add('selected');

                const index = tab.dataset['index'];
                this.props.onTabSelected(+index);
            }
        }

        public render(): JSX.Element {
            const items = [] as JSX.Element[];
            for (let i = 0; i < this.props.tabs.length; i++) {
                const tab = this.props.tabs[i];
                const className = (i === this.props.selectedIndex) ? "tab selected" : "tab";
                items.push(<div className={className} data-index={i}>{tab.toString()}</div>);
            }
            return <div className="tabs" onClick={ev => this.onClick(ev)}>{items}</div>;
        }
    }
}
