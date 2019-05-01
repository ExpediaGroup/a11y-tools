import './track-focus.less';

class TrackFocus {
    constructor() {
        let usingKeyboard = false;

        this.preFocus = (e) => {
            usingKeyboard = (e.type === 'keydown');
        };

        this.addFocus = (e) => {
            if (usingKeyboard && typeof e.target.classList !== 'undefined') {
                this.addFocusRelative(e.target);
                e.target.classList.add('focus--keyboard');
            }
        };

        this.addFocusRelative = (target) => {
            if (typeof window !== 'undefined') {
                const position = window.getComputedStyle(target).position;
                const positionRegex = /(absolute|relative|fixed)/;

                if (!positionRegex.test(position)) {
                    target.classList.add('focus--relative');
                }
            }
        };

        this.removeFocus = (e) => {
            /* istanbul ignore else */
            if (typeof e.target.classList !== 'undefined') {
                e.target.classList.remove('focus--relative');
                e.target.classList.remove('focus--keyboard');
            }
        };
    }

    bindEvents() {
        /* istanbul ignore next */
        if (typeof document !== 'undefined') {
            document.body.addEventListener('keydown', this.preFocus);
            document.body.addEventListener('mousedown', this.preFocus);
            document.body.addEventListener('focusin', this.addFocus);
            document.body.addEventListener('focusout', this.removeFocus);
        }
    }

    unbindEvents() {
        /* istanbul ignore next */
        if (typeof document !== 'undefined') {
            document.body.removeEventListener('keydown', this.preFocus);
            document.body.removeEventListener('mousedown', this.preFocus);
            document.body.removeEventListener('focusin', this.addFocus);
            document.body.removeEventListener('focusout', this.removeFocus);
        }
    }
}

export default TrackFocus;
