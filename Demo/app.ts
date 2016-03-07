/// <reference path="typings/jquery/jquery.d.ts" />

module Demo {
    export class DemoApp {
        constructor(private $appBody: JQuery) {
            var products = [
                new Models.Product('Hello Kitty', '$45.00', 'Assets/product1.png'),
                new Models.Product('Piggy Bank', '$57.00', 'Assets/product2.png'),
                new Models.Product('Trinket Box', '$63.00', 'Assets/product3.png')
            ];

            let panel = Views.loginPanel("wisercoder@gmail.com");
            let list = Views.renderProductList(products);
            $appBody.append(panel);
            $appBody.append(list);
        }
    }
}

$(() => {
    new Demo.DemoApp($("#app-body"));
});
