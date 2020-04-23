import React, { useState, useEffect } from 'react';
import Moment from 'moment';

const Room = ({
	activityID,
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	userID,
}) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [imageData, setImageData] = useState('');
	const [categories, setCategories] = useState([]);
	const [max, setMax] = useState(-1);
	const [host, setHost] = useState('');
	const [type, setType] = useState('');
	const [typeName, setTypeName] = useState('');
	const [participants, setParticipants] = useState([]);
	const [joined, setJoined] = useState(false);

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
					setImageData(data.room.imageData);
					setCategories(data.room.categories);
					setMax(data.room.maxNoOfParticipants);
					setHost(data.host);
					setType(data.type);
					setTypeName(data.typeName);
					setParticipants(data.participants);
					for (let i = 0; i < data.participants.length; i++) {
						if (data.participants[i].id === userID) {
							setJoined(true);
							break;
						}
					}
				}
			});
	}, [joined]);

	const joinRoom = (userID, roomID) => {
		fetch('http://localhost:3000/joinroom', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userID: userID,
				roomID: roomID,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.joined) {
					setJoined(true);
				}
			});
	};

	return (
		<div>
			{isSignedIn && type === 'mycircle' ? (
				<button
					onClick={() => {
						onRouteChange('mycircle');
					}}
				>
					{typeName}
				</button>
			) : null}
			{type !== 'mycircle' ? (
				<button
					onClick={() => {
						onActivityIDChange(type);
						onRouteChange('event/' + type);
					}}
				>
					{typeName}
				</button>
			) : null}
			<h1>{name}</h1>
			<h1>{Moment(date).format('YYYY-MM-DD')}</h1>
			<h1>{time}</h1>
			<h1>{location}</h1>
			<img src={imageData} alt=''></img>
			<h1>{description}</h1>
			<h1>{categories}</h1>
			<h1>{max}</h1>
			<h1
				onClick={() => {
					onActivityIDChange(host.id);
					onRouteChange('profile/' + host.id);
				}}
			>
				{host.username}
			</h1>
			{joined ? <p>You are a participant of this room! </p> : null}
			{!joined && isSignedIn ? (
				<button onClick={() => joinRoom(userID, activityID)}>
					Join the room!
				</button>
			) : null}
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
