/// <reference path="../typings/uibuilder/uibuilder-1.0.d.ts" />
/// <reference path="../Models/Product.ts" />

module Demo.Views {
    export function renderProductList(products: Models.Product[]): HTMLElement {
        var items = products.map(p => <Product product={p} />);
        return (
            <div className="product-list">
                {items}
            </div>
        );
    }
}
