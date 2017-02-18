import Debug from 'debug';
import App from '../../app';
import React from 'react';
import ReactDOM from 'react-dom';

var attachElement = document.getElementById('app');

var app;

Debug.enable('myApp*');

// Create new app and attach to element
app = new App();

app.renderToDOM(attachElement);
