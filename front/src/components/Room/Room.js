import React, { useState, useEffect } from 'react';

const Room = ({ activityID, onRouteChange, onActivityIDChange }) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	// const [photo, setPhoto] = useState('');
	const [categories, setCategories] = useState([]);
	const [max, setMax] = useState(-1);
	const [host, setHost] = useState('');
	const [type, setType] = useState('');
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/room/' + activityID)
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setName(data.room.name);
					setDate(data.room.date);
					setTime(data.room.time);
					setLocation(data.room.location);
					setDescription(data.room.description);
					setCategories(data.room.categories);
					setMax(data.room.maxNoOfParticipants);
					setHost(data.host);
					setType(data.type);
					setParticipants(data.participants);
				}
			});
	}, []);

	return (
		<div>
			<h1>{type}</h1>
			<h1>{name}</h1>
			<h1>{date}</h1>
			<h1>{time}</h1>
			<h1>{location}</h1>
			<h1>{description}</h1>
			<h1>{categories}</h1>
			<h1>{max}</h1>
			<h1
				onClick={() => {
					onActivityIDChange(host._id);
					onRouteChange('profile/' + host._id);
				}}
			>
				{host.username}
			</h1>

			<div className='parent'>
				{participants.map((participant) => {
					return (
						<div className='child' key={participant.id}>
							<p
								onClick={() => {
									onActivityIDChange(participant.id);
									onRouteChange('profile/' + participant.id);
								}}
							>
								{participant.username}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Room;
