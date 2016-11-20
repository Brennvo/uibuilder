/// <reference path="../typings/uibuilder/uibuilder-1.3.d.ts" />
/// <reference path="../Models/Product.ts" />

namespace Demo.Views {
    interface ProductProps {
        product: Models.Product;
    }

    export class Product extends UIBuilder.Component<ProductProps> {
        constructor(props: ProductProps) {
            super(props);
        }

        public render(): HTMLElement {
            return (
                <div className="product">
                    <div className="product-details">
                        <div className="product-name">{this.props.product.name}</div>
                        <div className="product-price">{this.props.product.price}</div>
                    </div>
                    <div className="product-photo"><img src={this.props.product.photoUrl} /></div>
                </div>
            );
        }
    }
}
