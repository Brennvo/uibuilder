/// <reference path="typings/jquery/jquery.d.ts" />

namespace Demo {
    export class DemoApp {
        private tabs = ["Store", "Products", "Support"];

        constructor(private $appBody: JQuery) {
            const products = [
                new Models.Product('Hello Kitty', '$45.00', 'Assets/product1.png'),
                new Models.Product('Piggy Bank', '$57.00', 'Assets/product2.png'),
                new Models.Product('Trinket Box', '$63.00', 'Assets/product3.png')
            ];

            $appBody.append(UIBuilder.createElement<Views.TabsProps>(Views.Tabs, {
                tabs: this.tabs,
                selectedIndex: 0,
                onTabSelected: index => this.onTabSelected(index)
            }));

            const page = Demo.Views.demoPage("someone@example.com", products);
            $appBody.append(page);
        }

        private onTabSelected(index: number): void {
            console.log(`${this.tabs[index]} tab selected`);
        }
    }
}
