import React from 'react';
import ListItem from '../ListItem/ListItem';

const MyCircle = ({
	searchField,
	rooms,
	onRouteChange,
	onActivityIDChange
}) => {
	const filtered = rooms.filter(rooms => {
		return rooms.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<div className="parent">
			{filtered.map(room => {
				return (
					<div className="child">
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