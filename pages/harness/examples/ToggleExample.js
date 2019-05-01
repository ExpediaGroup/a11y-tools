import React, {Component} from 'react';

class ToggleExample extends Component {
    constructor() {
        super();

        this.state = {
            demoSwitch: true
        };

        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked(event) {
        this.setState({[event.target.name]: event.target.checked});
    }

    render() {
        return (
            <div className="form-group">
                <div className="switch">
                    <input
                        type="checkbox"
                        checked={this.state.demoSwitch}
                        onChange={this.handleChecked}
                        name="demoSwitch"
                        id="demoSwitch"
                    />
                    <label htmlFor="demo-switch-options">
                        <div className="switch-toggle" />
                    </label>
                    <label htmlFor="demoSwitch">{'Toggle this Switch'}</label>
                </div>
            </div>
        );
    }
}

export default ToggleExample;
