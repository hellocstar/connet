import React from 'react';
import './Image.css';
import FileBase from 'react-file-base64';

const Image = ({ baseImage, getBaseFile }) => {
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
