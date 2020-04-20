import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';

const MyCircle = ({
	searchField,
	rooms,
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	userID,
}) => {
	useEffect(() => {
		if (isSignedIn) {
			fetch('http://localhost:3000/mycircle')
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						// this.props.onRouteChange('community');
					}
				});
		}
	});

	// if (!isSignedIn) {
	// 	this.props.onRouteChange('community');
	// }

	const filtered = rooms.filter((rooms) => {
		return rooms.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<div className='parent'>
			{filtered.map((room) => {
				return (
					<div className='child'>
						<ListItem
							activity={room}
							onRouteChange={onRouteChange}
							onActivityIDChange={onActivityIDChange}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default MyCircle;
