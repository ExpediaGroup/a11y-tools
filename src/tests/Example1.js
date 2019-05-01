import React from 'react';

class Example1 extends React.Component {
    render() {
        return (
            <div role="presentation" id="example-container-1" onKeyDown={this.handleKeydown}>
                <button className="btn btn-sm btn-default">{'button'}</button>
                <span tabIndex={0}>{'some text'}</span>
                <div>
                    <a href="">{'link!'}</a>
                    <form>
                        <input type="text" name="usrname"/>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Example1;
