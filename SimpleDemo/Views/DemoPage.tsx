/// <reference path="../typings/uibuilder/uibuilder-1.4.d.ts" />

namespace Demo.Views {
    function onMenuItemSelected($item: JQuery): void {
        console.log(`menu item clicked: ${$item.text()}`);
    }

    export function demoPage(userId: string, products: Models.Product[]): HTMLElement {
        return (
            <div className="demo-page">
                {Views.loginPanel(userId)}
                <ProductList products={products} />
                <Dropdown title="Dropdown demo">
                    <PopupMenu onMenuItemSelected={onMenuItemSelected}>
                        <div className="menu-item">Monday</div>
                        <div className="menu-item">Tuesday</div>
                        <div className="menu-item">Wednesday</div>
                    </PopupMenu>
                </Dropdown>
            </div>
        );
    }
}
