namespace Demo.Views {
    function onMenuItemSelected($item: JQuery): void {
        console.log(`menu item clicked: ${$item.text()}`);
    }

    function Banner(props: { message: string }): JSX.Element {
        return (
            <>
                <hr />
                {props.message}
                <hr />
            </>
        );
    }

    export function demoPage(userId: string, products: Models.Product[]): JSX.Element {
        return (
            <div className="demo-page">
                {Views.loginPanel(userId)}
                <ProductList products={products} />
                <div>
                    <Dropdown title="Dropdown demo">
                        <PopupMenu onMenuItemSelected={onMenuItemSelected}>
                            <div className="menu-item">Monday</div>
                            <div className="menu-item">Tuesday</div>
                            <div className="menu-item">Wednesday</div>
                        </PopupMenu>
                    </Dropdown>
                </div>
                <svg width="300" height="200">
                    <path style="stroke:#0072c6;stroke-width:1.0;fill:#ebf1f5"
                        d="M25 120 c-15 -77 157.183 -110.703 169.807 -81.522 6.078 14.048 -62.066 39.052 -55.973 54.538 9.85 25.034 73.132 -16.107 85.166 10.983 13.183 29.677 -47.599 58.681 -82 66 -47 10 -107.613 -1.814 -117 -50 z "/>
                </svg>
                <Banner message="That's all Folks!" />
            </div>
        );
    }
}
