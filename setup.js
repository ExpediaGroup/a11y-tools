require('@babel/register');
const ignoreStyles = require('ignore-styles');
const register = require('jsdom-global/register');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({adapter: new Adapter()});

module.exports = {
    Enzyme,
    ignoreStyles,
    register
};
