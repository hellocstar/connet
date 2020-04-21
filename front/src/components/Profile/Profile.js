import React, { useState, useEffect } from 'react';
import proPic from './profile.jpg';
import './Profile.css';

const Profile = ({
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	user,
	activityID,
}) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	// const [photo, setPhoto] = useState('');
	const [biography, setBiography] = useState('');
	const [birthday, setBirthday] = useState(-1);
	const [friends, setFriends] = useState([]);
	//pending_friends
	const [history, setHistory] = useState([]);
	const [interests, setInterests] = useState([]);

	let myself = true;
	if (user.id === activityID) {
		myself = true;
	}

	useEffect(() => {
		fetch('http://localhost:3000/profile/' + activityID)
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setUsername(data.profile.username);
					setEmail(data.profile.email);
					setBiography(data.profile.biography);
					setBirthday(data.profile.birthday);
					setInterests(data.profile.interests);
					setFriends(data.friends);
					setHistory(data.history);
				}
			});
	}, []);

	if (myself) {
		return (
			<div>
				<p>activityID {activityID}</p>
				<h1>my profile</h1>
				<button
					onClick={() => {
						onRouteChange('updateprofile/' + user.id);
					}}
				>
					update your profile
				</button>
				<h1>{username}</h1>
				<h1>{email}</h1>
				<h1>{biography}</h1>
				<h1>{birthday}</h1>
				<h1>{friends}</h1>
				{friends.map((friend) => {
					return (
						<div className='child' key={friend.id}>
							<p
								onClick={() => {
									onActivityIDChange(friend.id);
									onRouteChange('profile/' + friend.id);
								}}
							>
								{friend.username}
							</p>
						</div>
					);
				})}
				{history.map((hist) => {
					return (
						<div className='child' key={hist.id}>
							<p
								onClick={() => {
									onActivityIDChange(hist.id);
									onRouteChange('event/' + hist.id);
								}}
							>
								{hist.name}
							</p>
						</div>
					);
				})}
				{interests.map((interest) => {
					return (
						<div className='child' key={interest}>
							<p>{interest.username}</p>
						</div>
					);
				})}
			</div>
		);
	} else {
		return <p>not me</p>;
	}
};

export default Profile;
