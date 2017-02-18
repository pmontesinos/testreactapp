import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';

import config from '../../../config/app';

class AppRoot extends React.Component {

	shouldComponentUpdate () {
		return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
	}

	render () {
		return <div className="appRoot">
			<h1 className="text-center">{config.title}</h1>
			<Gallery />
			</div>;
	}
}

export default AppRoot;