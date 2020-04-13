import React from 'react';

const Create = ({ isSignedIn, onRouteChange }) => {
	if (isSignedIn) {
		return (
			<div>
				<button onClick={() => onRouteChange('newevent')}>
					Organise an Event in Community
				</button>
				<button onClick={() => onRouteChange('signin')}>
					Host a Room in MyCircle
				</button>
			</div>
		);
	} else {
		return (
			<div>
				<p>Sign In or Sign Up to do whatever you want!</p>
			</div>
		);
	}
};

export default Create;
