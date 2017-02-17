import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class GalleryItem extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	      showModal: false
	    };

	    this.openModal = this.openModal.bind(this);
	    this.afterOpenModal = this.afterOpenModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
	    this.setState({showModal: true});
	}

	afterOpenModal() {
	    // references are now sync'd and can be accessed.
	    this.refs.subtitle.style.color = '#f00';
	}

	closeModal() {
	    this.setState({showModal: false});
	}

	render() {
		return (
			<div className="column column-block">
				<img className="float-center" src={this.props.thumbnailUrl} alt={this.props.alt} onClick={this.openModal} />
				<Modal
				isOpen={this.state.showModal}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				style={customStyles}
				contentLabel="Example Modal"
				>
				  <h2 ref="subtitle">{this.props.alt}</h2>
				    <button onClick={this.closeModal}>close</button>
				    <img className="float-center" src={this.props.url} alt={this.props.alt} />
				</Modal>
			</div>
		);
	}
}

export default GalleryItem;