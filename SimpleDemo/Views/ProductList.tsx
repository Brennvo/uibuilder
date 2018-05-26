/// <reference path="../Models/Product.ts" />

namespace Demo.Views {
    export interface ProductListProps extends UIBuilder.Props<ProductList> {
        products: Models.Product[];
    }

    export class ProductList extends UIBuilder.Component<ProductListProps> {
        constructor(props: ProductListProps) {
            super(props);
        }

        public render(): JSX.Element {
            const items = this.props.products.map(p => <Product product={p} />);
            return (
                <div className="product-list">
                    {items}
                </div>
            );
        }
    }
}
