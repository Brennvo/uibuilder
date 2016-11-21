namespace Demo.Views {
    function onItemAdded(ev): void {
        console.log(`item added: ${ev.detail}`);
    }

    export function demoPage(items: string[]): HTMLElement {
        return (
            <div className="demo-page">
                <h1>Web Components Demo</h1>
                <div>
                    <div className="prompt">Enter your favorite artists, separated by commas:</div>
                    <zx-listeditor id="artists" items={items} onitemadded={ev => onItemAdded(ev)}></zx-listeditor>
                </div>
                <div className="button-bar">
                    <button type="button" id="set">Set</button>
                    <button type="button" id="get">Get</button>
                </div>
                <pre class="result"></pre>
            </div>
        );
    }
}
