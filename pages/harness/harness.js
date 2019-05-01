import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TrackFocus} from '../../src/index';
import ToggleExample from './examples/ToggleExample';
import TrapFocusExample from './examples/TrapFocusExample';

const trackFocus = new TrackFocus();

trackFocus.bindEvents();

/**
 * Development Harness
 *
 * This is the entry point for local development of your component. It is mearly a
 * harness that hosts your component and provides an efficient development experience.
 * Please do NOT modify this file directly - instead create your component examples
 * in the UniversalHarness.js file. That file is then imported here and rendered during
 * local development.
 *
 * To work on this locally, run:
 *     npm start
 *
 */

class Harness extends Component {
    render() {
        return (
            <div className="container">
                <h1>{'Track Focus Examples:'}</h1>
                <p>{'These items should only be focused on tab:'}</p>
                <button className="btn btn-primary">{'I am a Button'}</button> <br /><br />
                <button className="btn btn-default">{'I am a Button'}</button> <br /><br />
                <button className="btn btn-default btn--fixed">{'Fixed Position Button'}</button>
                <a href="./" className="btn btn-default a--fixed">{'Fixed Position A Tag'}</a>
                <a href="./" className="a-only--fixed">{'Fixed A Tag'}</a>
                <a href="./" className="btn btn-primary">{'I am link Button'}</a> <br /><br />
                <a href="./" className="btn btn-default">{'I am link Button'}</a> <br /><br />
                <ToggleExample />
                <div className="panel bg-brand">
                    <div className="panel-body">
                        <button className="btn btn-primary btn-inverse">{'I am a Button'}</button> <br /><br />
                        <button className="btn btn-default btn-inverse">{'I am a Button'}</button>
                    </div>
                </div>
                <ul className="list--vertical-grid">
                    <li><a href="./">{'A normal link'}</a></li>
                    <li><a href="./">{'A normal link'}</a></li>
                    <li><a href="./">{'A normal link'}</a></li>
                </ul>
                <br />

                <h1>{'Trap Focus Example:'}</h1>
                <TrapFocusExample />
            </div>
        );
    }
}


ReactDOM.render(
    <Harness/>,
    document.getElementById('content')
);
