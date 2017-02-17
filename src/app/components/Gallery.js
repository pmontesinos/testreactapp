import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Debug from 'debug';
import GalleryItem from './GalleryItem';
var debug = Debug('Gallery');

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
        //const photos = res.data.map(obj => obj);
        const photos = res.data.slice(0, 25);
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
    var cols = [];
    this.state.photos.forEach(photo => cols.push( <GalleryItem key={photo.id} thumbnailUrl={photo.thumbnailUrl} alt={photo.title} url={photo.url} /> ));

    return (
      <div>
        <div className="row small-up-1 medium-up-2 large-up-5">
         {cols}
        </div>
       </div>
    );
  }

  render () {

    return <div className="gallery">
      <h2 className="text-center">Gallery</h2>
      {this.state.loading ?
          this.renderLoading()
          : this.renderPhotos()}
    </div>;
  }
}

export default Gallery;
