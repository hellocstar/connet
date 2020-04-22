import React, { useState } from 'react';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Image from '../Image/Image';
import DefaultImg from './default-img.jpg';

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
	inputfield: {
		width: '84%',
		marginBottom: 10,
		marginTop: 10,
		margin: 'auto',
	},
}));

const NewRoom = ({
	onActivityIDChange,
	onRouteChange,
	isSignedIn,
	user,
	createRoomFor,
}) => {
	const classes = useStyles();

	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [imageName, setImageName] = useState('none');
	const [imageData, setImageData] = useState('');
	const [baseImage, setBaseImage] = useState(DefaultImg);
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

		const getBaseFile = (files) => {
			// create a local readable base64 instance of an image
			setBaseImage(files.base64);
			setImageName('base-image-' + Date.now());
			setImageData(files.base64.toString());
		};

		const onSubmit = () => {
			console.log(createRoomFor);
			fetch('http://localhost:3000/newroom', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: createRoomFor,
					name: name,
					date: date,
					time: time,
					location: location,
					hostID: user.id,
					description: description,
					imageName: imageName,
					imageData: imageData,
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
					<legend>
						<h2>>Create a room!</h2>
					</legend>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='name'
							label='Room Name'
							fullWidth='true'
							variant='filled'
							required
							type='text'
							name='name'
							id='name'
							onChange={(event) => {
								setName(event.target.value);
							}}
						></TextField>
					</div>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='date'
							label='Date'
							InputLabelProps={{ shrink: true }}
							type='date'
							variant='filled'
							fullWidth='true'
							required
							name='date'
							id='date'
							onChange={(event) => setDate(event.target.value)}
						></TextField>
					</div>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='time'
							label='time'
							InputLabelProps={{ shrink: true }}
							type='time'
							variant='filled'
							fullWidth='true'
							required
							name='time'
							id='time'
							onChange={(event) => setTime(event.target.value)}
						></TextField>
					</div>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='location'
							label='Venue'
							fullWidth='true'
							variant='filled'
							required
							multiline
							rows={2}
							type='text'
							name='location'
							id='location'
							onChange={(event) =>
								setLocation(event.target.value)
							}
						></TextField>
					</div>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='description'
							label='Event Description'
							fullWidth='true'
							variant='filled'
							multiline
							rows={5}
							type='text'
							name='description'
							id='description'
							onChange={(event) =>
								setDescription(event.target.value)
							}
						></TextField>
					</div>
					<Image baseImage={baseImage} getBaseFile={getBaseFile} />
					<div>
						<label>Catagory (Can select more than one!)</label>
					</div>
					<div>
						<Select
							// autoWidth='true'
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
					<div className={classes.inputfield}>
						<TextField
							htmlFor='description'
							label='Maximum Number Of Participants'
							fullWidth='true'
							variant='filled'
							required
							type='number'
							name='maxNoOfParticipants'
							id='maxNoOfParticipants'
							onChange={(event) =>
								setMaxNoOfParticipants(event.target.value)
							}
						></TextField>
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
