import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import connet from './connet_icon.png';

//contains methods, theme and styles for componenets to render the logo

const Logo = () => {      //render the logo
	return (
		<div className='ma4 mt0'>
			<Tilt
				className='Tilt br2 shadow-2'
				options={{ max: 55 }}
				style={{ height: 50, width: 50 }}
			>
				<div className='Tilt-inner pa3'>
					<img
						src={connet}
						alt='icon'
						style={{ paddingTop: 'tpx' }}
					/>
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
