import React, {Component} from 'react';
import {TrapFocus} from '../../../src/index.js';

class TrapFocusExample extends Component {
    constructor(props) {
        super(props);
        this.trapFocus = new TrapFocus();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        const node = this.containerRef.current;
        this.trapFocus.determineFocusable(node);
    }

    handleKeydown = (e) => {
        if (e.keyCode === 9) { // Tab key
            this.trapFocus.handleTabbing(e);
        }
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <h3> {'Focus is restricted within container to focusable elements.'} </h3>
                <div role="presentation" className="example-container" onKeyDown={this.handleKeydown}>
                    <span tabIndex={0}>{'Some sample text that you can tab to.'}</span>
                    <br/>
                    <a href="">{'link!'}</a>
                    <div>
                        <button className="btn btn-sm btn-default">{'button'}</button> <br/><br/>
                        <div className="row">
                            <form>
                                <div className="input-group">
                                    <div className="input-group-wrapper">
                                        <input id="input-group-7" type="text" className="form-control" placeholder="example"/>
                                    </div>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button">{'Go!'}</button>
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

export default TrapFocusExample;
