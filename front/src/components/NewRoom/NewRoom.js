import React, { useState } from 'react';
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

const NewRoom = ({ onActivityIDChange, onRouteChange, isSignedIn, user }) => {
	const classes = useStyles();

	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	// const [photo, setPhoto] = useState('');
	const [categories, setCategories] = useState([]);
	const [maxNoOfParticipants, setMaxNoOfParticipants] = useState(0);

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
			fetch('http://localhost:3000/newroom', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: 'mycircle',
					name: name,
					date: date,
					time: time,
					location: location,
					hostID: user.id,
					description: description,
					// photo: photo,
					categories: categories,
					maxNoOfParticipants: maxNoOfParticipants,
				}),
			})
				.then((response) => response.json())
				.then((id) => {
					if (id) {
						onActivityIDChange(id);
						onRouteChange('room/' + id);
					}
				});
		};

		return (
			<div>
				<fieldset id='new_room'>
					<legend>Create a room!</legend>
					<div>
						<label htmlFor='name'>Name of the Room</label>
						<input
							type='text'
							name='name'
							id='name'
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							onChange={(event) => setDate(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='time'
							name='time'
							id='time'
							onChange={(event) => setTime(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='location'>Location</label>
						<input
							type='text'
							name='location'
							id='location'
							onChange={(event) =>
								setLocation(event.target.value)
							}
						/>
					</div>
					<div>
						<label htmlFor='description'>Description</label>
						<input
							type='text'
							name='description'
							id='description'
							onChange={(event) =>
								setDescription(event.target.value)
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
							value={categories}
							onChange={(event) =>
								setCategories(event.target.value)
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
					<div>
						<label htmlFor='maxNoOfParticipants'>
							Maximum Number Of Participants
						</label>
						<input
							type='number'
							name='maxNoOfParticipants'
							id='maxNoOfParticipants'
							onChange={(event) =>
								setMaxNoOfParticipants(event.target.value)
							}
						/>
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

export default NewRoom;
