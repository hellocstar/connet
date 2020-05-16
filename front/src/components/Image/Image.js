import React from 'react';
import './Image.css';
import FileBase from 'react-file-base64';

//contains methods, theme and styles for componenets to render the area for user to upload pictures

const Image = ({ baseImage, getBaseFile }) => {    //redner the image upload panel, preview and buttons
	return (
		<div className='image-container'>
			<div className='process'>
				{/* <p>Upload an image!</p> */}
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
