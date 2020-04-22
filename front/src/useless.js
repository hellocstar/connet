const setDefaultImage = (uploadType) => {
			if (uploadType === 'multer') {
				setPhoto({
					multerImage: DefaultImg,
				});
			}
			// else if (uploadType === 'firebase') {
			// 	this.setState({
			// 		firebaseImage: DefaultImg,
			// 	});
			// } else {
			// 	this.setState({
			// 		baseImage: DefaultImg,
			// 	});
			// }
		};

		const uploadImage = (e, method) => {
			let imageObj = {};

			if (method === 'multer') {
				let imageFormObj = new FormData();

				imageFormObj.append('imageName', 'multer-image-' + Date.now());
				imageFormObj.append('imageData', e.target.files[0]);

				// stores a readable instance of
				// the image being uploaded using multer
				setPhoto({
					multerImage: URL.createObjectURL(e.target.files[0]),
				});

				axios
					.post(`${API_URL}/image/uploadmulter`, imageFormObj)
					.then((data) => {
						if (data.data.success) {
							alert(
								'Image has been successfully uploaded using multer'
							);
							setDefaultImage('multer');
						}
					})
					.catch((err) => {
						alert('Error while uploading image using multer');
						setDefaultImage('multer');
					});
			}
			// else if (method === 'firebase') {
			// 	let currentImageName = 'firebase-image-' + Date.now();

			// 	let uploadImage = storage
			// 		.ref(`images/${currentImageName}`)
			// 		.put(e.target.files[0]);

			// 	uploadImage.on(
			// 		'state_changed',
			// 		(snapshot) => {},
			// 		(error) => {
			// 			alert(error);
			// 		},
			// 		() => {
			// 			storage
			// 				.ref('images')
			// 				.child(currentImageName)
			// 				.getDownloadURL()
			// 				.then((url) => {
			// 					this.setState({
			// 						firebaseImage: url,
			// 					});

			// 					// store image object in the database
			// 					imageObj = {
			// 						imageName: currentImageName,
			// 						imageData: url,
			// 					};

			// 					axios
			// 						.post(
			// 							`${API_URL}/image/uploadbase`,
			// 							imageObj
			// 						)
			// 						.then((data) => {
			// 							if (data.data.success) {
			// 								alert(
			// 									'Image has been successfully uploaded using firebase storage'
			// 								);
			// 								this.setDefaultImage('firebase');
			// 							}
			// 						})
			// 						.catch((err) => {
			// 							alert(
			// 								'Error while uploading image using firebase storage'
			// 							);
			// 							this.setDefaultImage('firebase');
			// 						});
			// 				});
			// 		}
			// 	);
			// }
		// };