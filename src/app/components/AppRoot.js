import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './Cart';
import Gallery from './Gallery';

import config from '../../../config/app';

/*
 * @class AppRoot
 * @extends React.Component
 */
class AppRoot extends React.Component {

  /*
   * AppRootly PureRenderMixin
   *
   * in React 0.13 there is no way to attach mixins to ES6 classes
   * this is a workaround to solve this
   * http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#mixins
   *
   * @method shouldComponentUpdate
   * @returns {Boolean}
   */
  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    return <div className="appRoot">
      <h1 className="text-center">{config.title}</h1>
      <Gallery />
    </div>;
  }
}

// Prop types validation
AppRoot.propTypes = {
  state: React.PropTypes.object.isRequired,
};

export default AppRoot;
