import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Debug from 'debug';
import GalleryItem from './GalleryItem';
var debug = Debug('Gallery');

let photos = localStorage.getItem('photos') || '[]';

class Gallery extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			photos: JSON.parse(photos),
			loading: true,
			error: null,
			photosExist: false
		};

		if ( this.state.photos.length > 0 ) {
			this.state = {
				photos: JSON.parse(photos),
				loading: false,
				error: null,
				photosExist: true
			};
		}

		this.onAddDescription = this.onAddDescription.bind(this);
	}

	componentDidMount() {
		if ( this.state.photosExist === false ) {
			axios.get(`https://jsonplaceholder.typicode.com/photos`)
			.then(res => {
				const photosFromCall = res.data.slice(0, 25);

				localStorage.setItem( 'photos', JSON.stringify(photosFromCall) );

				this.setState({
					photos: photosFromCall,
					loading: false,
					error: null
				});
			})
			.catch(err => {
				this.setState({
					loading: false,
					error: err
				});
			});
		}
	}

	onAddDescription( id, description ) {
		for (var i in this.state.photos) {
			if (this.state.photos[i].id === id) {
				this.state.photos[i].description = description;
				localStorage.setItem( 'photos', JSON.stringify(this.state.photos) );
				break;
			}
		}
	}

	renderLoading() {
		return <div>Loading...</div>;
	}

	renderError() {
		return (
			<div>Uh oh: {this.state.error.message}</div>
		);
	}

	renderPhotos() {
		if(this.state.error) {
			return this.renderError();
		}
		var cols = [];
		this.state.photos.forEach(photo => cols.push( <GalleryItem key={photo.id} id={photo.id} thumbnailUrl={photo.thumbnailUrl} alt={photo.title} url={photo.url} onAddDescription={this.onAddDescription} description={photo.description} /> ));

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
