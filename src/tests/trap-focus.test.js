const expect = require('chai').expect;
import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import {TrapFocus} from '../index.js';
import Example1 from './Example1';
const {findDOMNode} = require('react-dom');

class Example2 extends React.Component {
    render() {
        return (
            <div id="example-container-2">
                <span>{'some text'}</span>
                <div>
                    <span>{'Some more text'}</span>
                </div>
            </div>
        );
    }
}

describe('TrapFocus', function() {
    let trapFocusExample;

    beforeEach(() => {
        trapFocusExample = new TrapFocus();
        this.jsdom = require('jsdom-global')();
    });

    afterEach(() => {
        trapFocusExample = null;
    });

    describe('determineFocusable', function() {
        it('should return the correct amount of focusable elements', function() {
            const componentInstance = mount(<Example1/>).instance();
            const node = findDOMNode(componentInstance);

            expect(trapFocusExample.focusableElements.length).to.equal(0);
            trapFocusExample.determineFocusable(node);
            expect(trapFocusExample.focusableElements.length).to.equal(5);
        });

        it('should not create a focusable elements array if there are no focusable elements', function() {
            const componentInstance = mount(<Example2/>).instance();
            const node = findDOMNode(componentInstance);
            trapFocusExample.determineFocusable(node);

            expect(trapFocusExample.focusableElements.length).to.equal(0);
        });
    });

    describe('resetFocus', function() {
        it('should set focus on the first focusable element', function() {
            const e = {
                preventDefault: sinon.stub()
            };

            const firstFocusable = {
                focus: sinon.stub()
            };

            const secondFocusable = {
                focus: sinon.stub()
            };

            trapFocusExample.focusableElements = [firstFocusable, secondFocusable, 'foo'];

            trapFocusExample.handleTabbing(e);
            trapFocusExample.resetFocus();
            expect(firstFocusable.focus.called).to.equal(true);
        });
    });

    describe('handleTabbing', function() {
        afterEach(() => {
            delete global.window;
        });

        it('should return false if focusableElements.length < 1', () => {
            const e = {
                preventDefault: sinon.stub()
            };

            trapFocusExample.focusableElements = [];

            const results = trapFocusExample.handleTabbing(e);
            expect(e.preventDefault.called).to.equal(false);
            expect(results).to.equal(false);
        });

        it('should focus on first focusable if focusableElements.length === 1', () => {
            const e = {
                preventDefault: sinon.stub()
            };

            const firstFocusable = {
                focus: sinon.stub()
            };

            trapFocusExample.focusableElements = [1];

            trapFocusExample.focusableElements = [firstFocusable];

            const results = trapFocusExample.handleTabbing(e);
            expect(e.preventDefault.called).to.equal(true);
            expect(firstFocusable.focus.called).to.equal(true);
            expect(results).to.equal(true);
        });

        it('should focus on last focusable if e.shiftKey and activeElement === firstFocusable', () => {
            const e = {
                shiftKey: true,
                preventDefault: sinon.stub()
            };

            const firstFocusable = {
                focus: sinon.stub()
            };

            const lastFocusable = {
                focus: sinon.stub()
            };

            global.window = {
                document: {
                    activeElement: firstFocusable
                }
            };

            trapFocusExample.focusableElements = [firstFocusable, 'foo', lastFocusable];

            const results = trapFocusExample.handleTabbing(e);
            expect(e.preventDefault.called).to.equal(true);
            expect(lastFocusable.focus.called).to.equal(true);
            expect(results).to.equal(true);
        });

        it('should not focus on last focusable if e.shiftKey and activeElement !== firstFocusable', () => {
            const e = {
                shiftKey: true,
                preventDefault: sinon.stub()
            };

            const firstFocusable = {
                focus: sinon.stub()
            };

            const lastFocusable = {
                focus: sinon.stub()
            };

            global.window = {
                document: {
                    activeElement: lastFocusable
                }
            };

            trapFocusExample.focusableElements = [firstFocusable, 'foo', lastFocusable];

            const results = trapFocusExample.handleTabbing(e);
            expect(e.preventDefault.called).to.equal(false);
            expect(lastFocusable.focus.called).to.equal(false);
            expect(results).to.equal(true);
        });

        it('should focus on first focusableactiveElement === lastFocusable', () => {
            const e = {
                shiftKey: false,
                preventDefault: sinon.stub()
            };

            const firstFocusable = {
                focus: sinon.stub()
            };

            const lastFocusable = {
                focus: sinon.stub()
            };

            global.window = {
                document: {
                    activeElement: lastFocusable
                }
            };

            trapFocusExample.focusableElements = [firstFocusable, 'foo', lastFocusable];

            const results = trapFocusExample.handleTabbing(e);
            expect(e.preventDefault.called).to.equal(true);
            expect(firstFocusable.focus.called).to.equal(true);
            expect(results).to.equal(true);
        });

        it('should not focus on first focusableactiveElement !== lastFocusable', () => {
            const e = {
                shiftKey: false,
                preventDefault: sinon.stub()
            };

            const firstFocusable = {
                focus: sinon.stub()
            };

            const lastFocusable = {
                focus: sinon.stub()
            };

            global.window = {
                document: {
                    activeElement: firstFocusable
                }
            };

            trapFocusExample.focusableElements = [firstFocusable, 'foo', lastFocusable];

            const results = trapFocusExample.handleTabbing(e);
            expect(e.preventDefault.called).to.equal(false);
            expect(firstFocusable.focus.called).to.equal(false);
            expect(results).to.equal(true);
        });
    });
});
