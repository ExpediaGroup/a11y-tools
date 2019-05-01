import {TrackFocus} from '../index.js';
import sinon from 'sinon';
import {expect} from 'chai';

describe('TrackFocus', () => {
    let trackFocusExample;

    beforeEach(() => {
        trackFocusExample = new TrackFocus();
        global.document = {
            body: {
                addEventListener: sinon.stub(),
                removeEventListener: sinon.stub(),
                createEvent: sinon.stub()
            }
        };
    });

    afterEach(() => {
        trackFocusExample = null;

        global.document = null;
    });

    describe('#removeFocus()', () => {
        it('should call remove with `focus--relative`, `focus--keyboard`', () => {
            const e = {
                target: {
                    classList: {
                        remove: sinon.stub()
                    }
                }
            };

            trackFocusExample.removeFocus(e);
            expect(e.target.classList.remove.calledTwice).to.equal(true);
        });
    });

    describe('#addFocus()', () => {
        it('should call add with `focus--keyboard` if keyboardEvent is true', () => {
            const e = {
                type: 'keydown',
                target: {
                    classList: {
                        add: sinon.stub()
                    }
                }
            };

            trackFocusExample.addFocusRelative = sinon.stub();

            // set usingKeyboard to true
            trackFocusExample.preFocus(e);

            trackFocusExample.addFocus(e);

            expect(e.target.classList.add.calledWith('focus--keyboard')).to.equal(true);
        });

        it('should call add addFocusRelative if keyboardEvent is true', () => {
            const e = {
                type: 'keydown',
                target: {
                    classList: {
                        add: sinon.stub()
                    }
                }
            };

            trackFocusExample.addFocusRelative = sinon.stub();

            // set usingKeyboard to true
            trackFocusExample.preFocus(e);

            trackFocusExample.addFocus(e);

            expect(trackFocusExample.addFocusRelative.called).to.equal(true);
        });

        it('should not call add addFocusRelative if e.target.classList is undefined', () => {
            const e = {
                type: 'keydown',
                target: {}
            };

            trackFocusExample.addFocusRelative = sinon.stub();

            trackFocusExample.addFocus(e);

            expect(trackFocusExample.addFocusRelative.called).to.equal(false);
        });

        it('should not call classList.add() with `focus--keyboard` or addFocusRelative when an event other than keydown is received', () => {
            const e = {
                type: 'mousedown',
                target: {
                    classList: {
                        add: sinon.stub()
                    }
                }
            };

            trackFocusExample.addFocusRelative = sinon.stub();

            // set usingKeyboard to false
            trackFocusExample.preFocus(e);

            trackFocusExample.addFocus(e);

            expect(trackFocusExample.addFocusRelative.called).to.equal(false);
            expect(e.target.classList.add.calledWith('focus--keyboard')).to.equal(false);
        });
    });

    describe('#addFocusRelative', () => {
        it('should not call classList.add if window does not exist', () => {
            global.window = undefined; // eslint-disable-line
            const target = {
                classList: {
                    add: sinon.stub()
                }
            };

            trackFocusExample.addFocusRelative();

            expect(target.classList.add.called).to.equal(false);
        });

        describe('with `window`', () => {
            beforeEach(() => {
                global.window = {
                    getComputedStyle: null
                };
            });

            afterEach(() => {
                global.window = null;
            });

            it('should call classList.add() if position is `static`', () => {
                const target = {
                    classList: {
                        add: sinon.stub()
                    }
                };
                global.window.getComputedStyle = sinon.stub().returns({
                    position: 'static'
                });

                trackFocusExample.addFocusRelative(target);
                expect(target.classList.add.called).to.equal(true);
            });

            it('should not call classList.add() if position is `relative`', () => {
                const target = {
                    classList: {
                        add: sinon.stub()
                    }
                };
                global.window.getComputedStyle = sinon.stub().returns({
                    position: 'relative'
                });

                trackFocusExample.addFocusRelative(target);
                expect(target.classList.add.called).to.equal(false);
            });

            it('should not call classList.add() if position is `absolute`', () => {
                const target = {
                    classList: {
                        add: sinon.stub()
                    }
                };
                global.window.getComputedStyle = sinon.stub().returns({
                    position: 'absolute'
                });

                trackFocusExample.addFocusRelative(target);
                expect(target.classList.add.called).to.equal(false);
            });

            it('should notcall classList.add() if position is `fixed`', () => {
                const target = {
                    classList: {
                        add: sinon.stub()
                    }
                };
                global.window.getComputedStyle = sinon.stub().returns({
                    position: 'fixed'
                });

                trackFocusExample.addFocusRelative(target);
                expect(target.classList.add.called).to.equal(false);
            });
        });
    });

    describe('#bindEvents()', () => {
        it('should bind the appropriate methods to their respective events', () => {
            trackFocusExample.bindEvents();

            expect(global.document.body.addEventListener.calledWith('keydown', trackFocusExample.preFocus)).to.equal(true);
            expect(global.document.body.addEventListener.calledWith('mousedown', trackFocusExample.preFocus)).to.equal(true);
            expect(global.document.body.addEventListener.calledWith('focusin', trackFocusExample.addFocus)).to.equal(true);
            expect(global.document.body.addEventListener.calledWith('focusout', trackFocusExample.removeFocus)).to.equal(true);
        });
    });

    describe('#unbindEvents()', () => {
        it('should unbind the appropriate methods from their respective events', () => {
            trackFocusExample.unbindEvents();

            expect(global.document.body.removeEventListener.calledWith('keydown', trackFocusExample.preFocus)).to.equal(true);
            expect(global.document.body.removeEventListener.calledWith('mousedown', trackFocusExample.preFocus)).to.equal(true);
            expect(global.document.body.removeEventListener.calledWith('focusin', trackFocusExample.addFocus)).to.equal(true);
            expect(global.document.body.removeEventListener.calledWith('focusout', trackFocusExample.removeFocus)).to.equal(true);
        });
    });
});
