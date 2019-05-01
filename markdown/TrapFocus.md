# TrapFocus

Focus helper module for accessibility. Using this module will restrict keyboard tabbing within a container to only the focusable elements. Tabbing cycles forward (`tab`) and backwards (`shift + tab`) within the container and must normally contain an explicit close or an element that will trigger a close for the container.

## Base Usage

```javascript
class TrapFocusExample extends Component {
    constructor(props) {
        super(props);
        this.trapFocus = new TrapFocus();
        this.containerRef = React.createRef();

        this.handleKeydown = this.handleKeydown.bind(this);
    }

    componentDidMount() {
        const node = this.containerRef.current;
        this.trapFocus.determineFocusable(node);
    }

    handleKeydown(e) {
        if (e.keyCode === 9) { // Tab key
            this.trapFocus.handleTabbing(e);
        }
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <h2> {'Focus is restricted within container to focusable elements:'} </h2>
                <div role="presentation" onKeyDown={this.handleKeydown}>
                    <button className="btn btn-sm btn-default">{'Button'}</button>
                    <span tabIndex={0}>{'Sample text that you can tab to.'}</span> <br/><br/>
                    <a href="">{'link!'}</a> <br/><br/>
                    <div>
                        <button className="btn btn-sm btn-default">{'button'}</button> <br/><br/>
                        <button disabled className="btn btn-sm btn-default">{'button'}</button> <br/><br/>
                        <div className="row">
                            <form>    
                                <div className="input-group">                    
                                    <div className="input-group-wrapper">
                                        <input id="input-group-7" type="text" className="form-control" placeholder="example" />
                                    </div>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button">Go!</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
```
