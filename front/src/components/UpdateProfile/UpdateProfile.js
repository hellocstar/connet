import React, { useState, useEffect } from 'react';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const UpdateProfile = ({
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	user,
}) => {
	const classes = useStyles();

	// const [username, setUsername] = useState('');
	// const [email, setEmail] = useState('');
	// const [photo, setPhoto] = useState('');
	const [biography, setBiography] = useState('');
	const [birthday, setBirthday] = useState(-1);
	// const [friends, setFriends] = useState([]);
	//pending_friends
	// const [history, setHistory] = useState([]);
	const [interests, setInterests] = useState([]);

	if (isSignedIn) {
		const categoriesList = [
			'Outdoors & Adventure',
			'Tech',
			'Family',
			'Health & Wellness',
			'Sports & Fitness',
			'Learning',
			'Photography',
			'Food & Drink',
			'Writing',
			'Language & Culture',
			'Music',
			'Film',
			'Beliefs',
			'Arts',
			'Fashion & Beauty',
			'Career & Business',
		];

		const ITEM_HEIGHT = 48;
		const ITEM_PADDING_TOP = 8;
		const MenuProps = {
			PaperProps: {
				style: {
					maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
					width: 250,
				},
			},
		};

		const onSubmit = () => {
			fetch('http://localhost:3000/updateprofile/' + user.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					// photo: photo,
					id: user.id,
					biography: biography,
					birthday: birthday,
					interests: interests,
				}),
			})
				.then((response) => response.text())
				.then((data) => {
					if (data) {
						onActivityIDChange(user.id);
						onRouteChange('profile/' + user.id);
					}
				});
		};

		return (
			<div>
				<fieldset id='update-profile'>
					<legend>Update your profile</legend>

					<div>
						<label htmlFor='biography'>Biography</label>
						<input
							type='text'
							name='biography'
							id='biography'
							onChange={(event) =>
								setBiography(event.target.value)
							}
						/>
					</div>
					<div>
						<label htmlFor='birthday'>Birthday</label>
						<input
							type='date'
							name='birthday'
							id='birthday'
							onChange={(event) =>
								setBirthday(event.target.value)
							}
						/>
					</div>
					{/* <div>
						<label htmlFor='photo'>Photo</label>
						<input
							type='text'
							name='photo'
							id='photo'
							onChange={(event) => setPhoto(event.target.value)}
						/>
					</div> */}
					<div>
						<Select
							labelId='demo-mutiple-chip-label'
							id='demo-mutiple-chip'
							multiple
							value={interests}
							onChange={(event) =>
								setInterests(event.target.value)
							}
							input={<Input id='select-multiple-chip' />}
							renderValue={(selected) => (
								<div className={classes.chips}>
									{selected.map((value) => (
										<Chip
											key={value}
											label={value}
											className={classes.chip}
										/>
									))}
								</div>
							)}
							MenuProps={MenuProps}
						>
							{categoriesList.map((cat) => (
								<MenuItem key={cat} value={cat}>
									{cat}
								</MenuItem>
							))}
						</Select>
					</div>
				</fieldset>
				<div className=''>
					<input onClick={onSubmit} type='submit' value='Create!' />
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p>Sign In or Sign Up to do whatever you want!</p>
			</div>
		);
	}
};

export default UpdateProfile;
