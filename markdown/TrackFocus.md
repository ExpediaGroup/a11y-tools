# TrackFocus

Focus helper module for accessibility. Tracks focus events caused by the keyboard and highlights them, but DOES NOT show focus state for mouse and touch events.

## Base Usage
TrackFocus will pay attention to focus events and apply class `focus--keyboard` to elements that have received focus from a keyboard event. No classes will be added for mouse or touch interactions.
```html-only
const trackFocus = new TrackFocus();

trackFocus.bindEvents();
```

## CSS
The CSS associated with this module will remove browser default outline styling from buttons and anchor tags.

The CSS is included in this modules's javascript so there is no wiring of CSS required by the host application. This is handled differently for the two different output builds. The default build package is meant for webpack consumers and the transpiled source code imports the less files into the javascript files. This means the host application needs to have the less-loader in its webpack config in order to process these less imports. The 2nd build package, meant for legacy apps (requirejs), gets packaged by webpack and its style-loader embeds a small utility library into the component. When the component is loaded, it creates a <style/> tag in the head of the html document of your page, containing all the CSS for the component.

This component is brand-agnostic, meaning there is only one common stylesheet with no variation by brand. This fact is what allows us to bake the CSS into the Javascript.

## API
| Method | Description |
|----------------- |:------------------------------------------------------------------------------------------------------:|
| `trackFocus.bindEvents()`   | Adds event listeners to determine if a focus event is being caused by keyboard interaction. |
| `trackFocus.unbindEvents()` | This will remove event listeners for `keydown`, `mousedown`, `focusin`, `focusout`.         |
