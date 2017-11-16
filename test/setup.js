import React from 'react';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}

global.navigator = global.window.navigator;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;
global.React = React;

global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

