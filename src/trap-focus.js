class TrapFocus {
    constructor() {
        this.focusableElements = [];
    }

    /** a11y: create list of focusable items. This could change during component life cycle, so this method should be called again in componentDidUpdate. */
    determineFocusable(container) {
        this.focusableElements = container.querySelectorAll('a[href], area[href], input, select, textarea, button:not([disabled]), [tabindex="0"]');
    }

    resetFocus() {
        const firstFocusable = this.focusableElements[0];

        if (this.focusableElements.length >= 1) {
            firstFocusable.focus();
        }
    }

    /** a11y: limit tabbing of elements to those within the container */
    handleTabbing(e) {
        if (this.focusableElements.length < 1) {
            return false;
        }

        const firstFocusable = this.focusableElements[0];

        if (this.focusableElements.length === 1) {
            e.preventDefault();
            firstFocusable.focus();
            return true;
        }

        const lastFocusable = this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            if (window.document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else if (window.document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }

        return true;
    }
}

export default TrapFocus;
