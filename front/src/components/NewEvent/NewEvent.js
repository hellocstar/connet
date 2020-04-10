import React, { useState, useEffect } from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const NewEvent = ({ onRouteChange, isSignedIn, user }) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	// const [photo, setPhoto] = useState('');
	const [category, setCategory] = useState([]);

	if (isSignedIn) {
		const categories = [
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

		const onSubmit = () => {
			fetch('http://localhost:3000/newevent', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name,
					date: date,
					time: time,
					location: location,
					organiserID: user.id,
					description: description,
					// photo: photo,
					category: category,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						onRouteChange('community');
					}
				});
		};

		return (
			<div>
				<fieldset id='new_event'>
					<legend>Tell others your idea!</legend>
					<div>
						<label htmlFor='name'>Name of the Event</label>
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
							labelId='demo-mutiple-name-label'
							id='demo-mutiple-name'
							multiple
							value={category}
							onChange={(event) =>
								setCategory(event.target.value)
							}
							input={<Input />}
							// MenuProps={MenuProps}
						>
							{categories.map((cat) => (
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

export default NewEvent;
