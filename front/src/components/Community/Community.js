import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './community.css';

const Community = ({ searchField, onRouteChange, onActivityIDChange }) => {
	const [eventList, setEventList] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/community')
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setEventList(data);
				}
			});
	}, []);

	const searchResult = eventList.filter((event) => {
		return event.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<div className='parent'>
			{searchResult.map((event) => {
				return (
					<div className='child' key={event._id}>
						<ListItem
							activity={event}
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
