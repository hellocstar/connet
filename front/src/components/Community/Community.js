import React from 'react';
import ListItem from '../ListItem/ListItem';
import './community.css';

const Community = ({
	searchField,
	events,
	rooms,
	onRouteChange,
	onActivityIDChange
}) => {
	const activities = events.concat(rooms);
	const searchResult = activities.filter(activities => {
		return activities.name
			.toLowerCase()
			.includes(searchField.toLowerCase());
	});

	return (
		<div className="parent">
			{searchResult.map(activity => {
				return (
					<div className="child">
					<ListItem 
						activity={activity}
						onRouteChange={onRouteChange}
						onActivityIDChange={onActivityIDChange}
					/>
					</div>
				);
			})}
		</div>
	);
};

export default Community;