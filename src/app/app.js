import React from 'react';
import ReactDOM from 'react-dom';
import Debug from 'debug';

import AppRoot from './components/AppRoot';

var debug = Debug('myApp');

class App {

	render (element) {

		debug('render app with state', this.state);

		var appRootElement = React.createElement(AppRoot, {
			state: this.state
		});

		if(element) {
			debug('render to DOM');
			ReactDOM.render(appRootElement, element);
			return;
		}

		debug('render to string');
		return React.renderToString(appRootElement);
	}

	renderToDOM (element) {
		if(!element) {
			return debug(new Error('App.renderToDOM: element is required'));
		}

		this.render(element);
	}

	renderToString () {
		return this.render();
	}
}

export default App;
