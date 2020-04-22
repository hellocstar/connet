import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Profile = ({
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	user,
	activityID,
}) => {
	const [username, setUsername] = useState('Loading...');
	const [email, setEmail] = useState('');
	const [imageData, setImageData] = useState('');
	const [biography, setBiography] = useState('');
	const [birthday, setBirthday] = useState('');
	const [friends, setFriends] = useState([]);
	const [history, setHistory] = useState([]);
	const [interests, setInterests] = useState([]);
	const [isFriend, setIsFriends] = useState(false);

	let myself = false;
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
					setImageData(data.profile.imageData);
					setBirthday(data.profile.birthday);
					setInterests(data.profile.interests);
					setFriends(data.friends);
					setHistory(data.history);
				}
			});
	}, [isFriend]);

	const onAddFriend = () => {
		fetch('http://localhost:3000/addfriend/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				me: user.id,
				friend: activityID,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setIsFriends(true);
				}
			});
	};

	return (
		<div>
			<h1>Profile</h1>
			{myself ? (
				<button
					onClick={() => {
						onRouteChange('updateprofile/' + user.id);
					}}
				>
					update your profile
				</button>
			) : null}
			{isSignedIn && !isFriend && !myself ? (
				<button onClick={onAddFriend}>Follow!</button>
			) : null}
			{isFriend && !myself ? (
				<p>You are now following {username}</p>
			) : null}
			<h1>{username}</h1>
			<h1>{email}</h1>
			<h1>{biography}</h1>
			<h1>{birthday}</h1>
			<img src={imageData} alt=''></img>
			{myself
				? friends.map((friend) => {
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
				  })
				: null}
			{history.map((hist) => {
				return (
					<Grid item key={hist} xs={6} sm={6} md={6}>
						<Box m={1}>
							<ListItem
								activity={hist.obj}
								onRouteChange={onRouteChange}
								onActivityIDChange={onActivityIDChange}
								type={hist.type}
							/>
						</Box>
					</Grid>
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
};

export default Profile;
