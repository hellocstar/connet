import React, { useState, useEffect } from 'react';

const Profile = ({ onRouteChange, isSignedIn, user }) => {
	return (
		<div>
			<h1>Welcome {user.name}</h1>
		</div>
	);
};

export default Profile;
