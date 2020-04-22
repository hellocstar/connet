import React, { useState } from 'react';
// import axios from 'axios';
import './Image.css';
import FileBase from 'react-file-base64';
// import { storage } from '../firebase/firebase-config';
// import DefaultImg from './default-img.jpg';

// base api url being used
// const API_URL = 'http://localhost:3000';

const Image = ({ baseImage, getBaseFile }) => {
	// const [multerImage, setMulterImage] = useState(DefaultImg);
	// const [baseImage, setBaseImage] = useState(DefaultImg);
	// const [firebaseImage, setFirebaseImage] = useState(DefaultImg);

	// const setDefaultImage = (uploadType) => {
	// 	if (uploadType === 'multer') {
	// 		// setMulterImage(DefaultImg);
	// 		// } else if (uploadType === 'firebase') {
	// 		// setFirebaseImage(DefaultImg);
	// 		// } else {
	// 		setBaseImage(DefaultImg);
	// 	}
	// };

	// function to upload image once it has been captured
	// includes multer and firebase methods
	// const uploadImage = (e, method) => {
	// 	let imageObj = {};

	// 	// if (method === 'multer') {
	// 	// 	let imageFormObj = new FormData();

	// 	// 	imageFormObj.append('imageName', 'multer-image-' + Date.now());
	// 	// 	imageFormObj.append('imageData', e.target.files[0]);

	// 	// 	// stores a readable instance of
	// 	// 	// the image being uploaded using multer
	// 	// 	setMulterImage(URL.createObjectURL(e.target.files[0]));
	// 	// 	axios
	// 	// 		.post(`${API_URL}/image/uploadmulter`, imageFormObj)
	// 	// 		.then((data) => {
	// 	// 			if (data.data.success) {
	// 	// 				alert(
	// 	// 					'Image has been successfully uploaded using multer'
	// 	// 				);
	// 	// 				setDefaultImage('multer');
	// 	// 			}
	// 	// 		})
	// 	// 		.catch((err) => {
	// 	// 			alert('Error while uploading image using multer');
	// 	// 			setDefaultImage('multer');
	// 	// 		});
	// 	// } else
	// 	if (method === 'firebase') {
	// 		let currentImageName = 'firebase-image-' + Date.now();

	// 		let uploadImage = storage
	// 			.ref(`images/${currentImageName}`)
	// 			.put(e.target.files[0]);

	// 		uploadImage.on(
	// 			'state_changed',
	// 			(snapshot) => {},
	// 			(error) => {
	// 				alert(error);
	// 			},
	// 			() => {
	// 				storage
	// 					.ref('images')
	// 					.child(currentImageName)
	// 					.getDownloadURL()
	// 					.then((url) => {
	// 						setFirebaseImage(url);

	// 						// store image object in the database
	// 						imageObj = {
	// 							imageName: currentImageName,
	// 							imageData: url,
	// 						};

	// 						axios
	// 							.post(`${API_URL}/image/uploadbase`, imageObj)
	// 							.then((data) => {
	// 								if (data.data.success) {
	// 									alert(
	// 										'Image has been successfully uploaded using firebase storage'
	// 									);
	// 									console.log(document);
	// 									setDefaultImage('firebase');
	// 								}
	// 							})
	// 							.catch((err) => {
	// 								alert(
	// 									'Error while uploading image using firebase storage'
	// 								);
	// 								setDefaultImage('firebase');
	// 							});
	// 					});
	// 			}
	// 		);
	// 	}
	// };

	// function to capture base64 format of an image
	// const getBaseFile = (files) => {
	// 	// create a local readable base64 instance of an image
	// 	setBaseImage(files.base64);

	// 	let imageObj = {
	// 		imageName: 'base-image-' + Date.now(),
	// 		imageData: files.base64.toString(),
	// 	};

	// 	axios
	// 		.post(`${API_URL}/image/uploadbase`, imageObj)
	// 		.then((data) => {
	// 			if (data.data.success) {
	// 				alert(
	// 					'Image has been successfully uploaded using base64 format'
	// 				);
	// 				setDefaultImage('base');
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			alert('Error while uploading image using base64 format');
	// 			setDefaultImage('base');
	// 		});
	// };

	return (
		<div className='image-container'>
			{/* <div className='process'>
				<h4 className='process__heading'>Process: Using Multer</h4>
				<p className='process__details'>
					Upload image to a node server, connected to a MongoDB
					database, with the help of multer
				</p>

				<input
					type='file'
					className='process__upload-btn'
					onChange={(e) => uploadImage(e, 'multer')}
				/>
				<img
					src={multerImage}
					alt='upload-image'
					className='process__image'
				/>
			</div> */}

			{/* <div className='process'>
				<h4 className='process__heading'>
					Upload a photo
				</h4>
				<p className='process__details'>Upload a photo!</p>

				<input
					type='file'
					className='process__upload-btn'
					// onChange={onImageChange}
					onChange={(e) => uploadImage(e, 'firebase')}
				/>
				<img
					src={firebaseImage}
					alt='upload-firebase'
					className='process__image'
				/>
			</div> */}

			<div className='process'>
				{/* <h4 className='process__heading'>Process: Using Base64</h4> */}
				<p className='process__details'>
					Upload image as Base64 directly to MongoDB database
				</p>

				<div className='process__upload-btn'>
					<FileBase
						type='file'
						multiple={false}
						onDone={getBaseFile}
					/>
				</div>
				<img
					src={baseImage}
					alt='upload-baseimage'
					className='process__image'
				/>
			</div>
		</div>
	);
};

export default Image;
