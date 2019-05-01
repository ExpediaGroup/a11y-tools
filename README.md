# a11y-tools

* [Introduction](#introduction)
* [Maintainers](#maintainers)
* [Usage](#usage)
* [Development](#development)
* [Further Reading](#further-reading)

## <a name="introduction"></a>Introduction
Helper library with focus accessibility tools:

`TrackFocus`, which tracks focus events caused by the keyboard and highlights them, but DOES NOT show focus state for mouse and touch events. [More Information](./markdown/TrackFocus.md)

`TrapFocus`, which restricts keyboard tabbing to only focusable elements within a container. [More Information](./markdown/TrapFocus.md)


## <a name="maintainers"></a>Maintainers
* Martin Note <mnote@homeaway.com>

## <a name="usage"></a>Usage

Application developers that want to consume this component should install the package using npm:

```bash
npm install @vrbo/a11y-tools
```

### TrackFocus

Example Usage:

```javascript
// ES6 module syntax:
import {TrackFocus} from '@vrbo/a11y-tools';

const trackFocus = new TrackFocus();

trackFocus.bindEvents();
```

### TrapFocus

Example Usage:

```javascript
import {TrapFocus} from '@vrbo/a11y-tools';
import React, {Component} from 'react';

class Example extends Component {
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
            <div ref={this.containerRef} onKeydown={this.handleKeydown}>
                ...
            </div>
        )
    }
}
```

## <a name="development"></a>Development

| Script | Description |
|---|---|
| `npm install` | Install the project dependencies; once installed `npm run build` is also executed |
| `npm start` | Run the webpack dev server and open the test harness in a browser |
| `npm run start:silent` | Runs the webpack dev server but does not open a browser window |
| `npm run start:docs` | Run the dev server and open the component documentation in a browser window |
| `npm run build` | Compile Less (CSS) and Javascript assets |
| `npm run test` | Run unit tests, stylelint, eslint and provide code coverage metrics |
| `npm run test:unit` | Run unit tests only. To debug within the test suite pass the `--inspect` flag to `mocha` like so: `npm run test:unit -- --inspect` and add `debugger; //eslint-disable-line` to the line in the test file you would like to break on. If you need to break immediately, use `--inspect --inspect-brk`. |
| `npm run test:style` | Run linters to verify code meets the configured `eslint` settings |
| `npm run test:coverage` | Run `npm run test:unit` and provide metrics about coverage |

### Notes

- Any time the scripts related to `start` are executed the documentation or project demo is available in your browser at `localhost:8000` or `0.0.0.0:8000`.
- To see a complete list of `npm scripts`, use: `npm run`


### Component Documentation

The `npm run start:docs` command will build, run and launch the documentation that has been configured for the project. Documentation is configured through the `discovery.json` file in the root of the project. To add new documentation, add an entry to `discovery.json` and configure the options to point to the new markdown based documentation. Additionally, the `npm run build:docs` command is configured to build the documentation and publish it as the Github Pages content for the associated repository.

## Further Reading

* [Changelog](CHANGELOG.md)
* [Code of conduct](CODE_OF_CONDUCT.md)
* [Contributing](CONTRIBUTING.md)
* [License](LICENSE)