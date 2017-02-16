import React from 'react/addons';
import axios from 'axios';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    // Remove the 'www.' to cause a CORS error (and see the error state)
    axios.get(`https://jsonplaceholder.typicode.com/photos`)
      .then(res => {
        // Transform the raw data by extracting the nested posts
        const photos = res.data.map(obj => obj);
        console.log(photos);
         this.setState({
          photos,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        console.log('error downloading');
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  shouldComponentUpdate () {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Uh oh: {this.state.error.message}
      </div>
    );
  }

  renderPhotos() {
    if(this.state.error) {
      return this.renderError();
    }

    return (
      <ul>
        {this.state.photos.map(photo =>
          <li key={photo.id}>{photo.title}</li>
        )}
      </ul>
    );
  }

  render () {
    return <div className="gallery">
      <h2>Gallery</h2>
      {this.state.loading ?
          this.renderLoading()
          : this.renderPhotos()}
    </div>;
  }
}

// Prop types validation
Gallery.propTypes = {
  cart: React.PropTypes.object.isRequired,
};

export default Gallery;
