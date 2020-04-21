import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './MyCircle.css';

const MyCircle = ({
	searchField,
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	userID,
}) => {
	const [roomList, setRoomList] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/mycircle', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: userID,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setRoomList(data);
					// this.props.onRouteChange('community');
				}
			});
	}, []);

	const filtered = roomList.filter((rooms) => {
		return rooms.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<div className='parent'>
			{filtered.map((room) => {
				return (
					<div className='child' key={room._id}>
						<ListItem
							activity={room}
							onRouteChange={onRouteChange}
							onActivityIDChange={onActivityIDChange}
							type={'room'}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default MyCircle;
