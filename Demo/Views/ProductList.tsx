/// <reference path="../typings/uibuilder/uibuilder-1.2.d.ts" />
/// <reference path="../Models/Product.ts" />

module Demo.Views {
    export interface ProductListProps extends UIBuilder.Props {
        products: Models.Product[];
    }

    export class ProductList extends UIBuilder.Component<ProductListProps> {
        constructor(props: ProductListProps) {
            super(props);
        }

        public render(): HTMLElement {
            var items = this.props.products.map(p => <Product product={p} />);
            return (
                <div className="product-list">
                    {items}
                </div>
            );
        }
    }
}
