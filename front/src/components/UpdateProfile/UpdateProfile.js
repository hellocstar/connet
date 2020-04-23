import React, { useState, useEffect } from 'react';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Image from '../Image/Image';
import DefaultImg from './default-img.jpg';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
	box: {
		width: '84%',
		margin: 'auto',
		color: 'grey',
		marginBottom: 10,
		marginTop: 10,
		padding: 10,
	},
	button: {
		marginBottom: 20,
		marginTop: 20,
	},
}));

const UpdateProfile = ({
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	user,
}) => {
	const classes = useStyles();

	const [biography, setBiography] = useState('');
	const [birthday, setBirthday] = useState('-1');
	const [imageName, setImageName] = useState('none');
	const [imageData, setImageData] = useState('');
	const [baseImage, setBaseImage] = useState(DefaultImg);
	const [interests, setInterests] = useState([]);

	if (isSignedIn) {
		// const categoriesList = [
		// 	'Outdoors & Adventure',
		// 	'Tech',
		// 	'Family',
		// 	'Health & Wellness',
		// 	'Sports & Fitness',
		// 	'Learning',
		// 	'Photography',
		// 	'Food & Drink',
		// 	'Writing',
		// 	'Language & Culture',
		// 	'Music',
		// 	'Film',
		// 	'Beliefs',
		// 	'Arts',
		// 	'Fashion & Beauty',
		// 	'Career & Business',
		// ];

		const categoriesList = [
			'Technology',
			'Design',
			'Culture',
			'Business',
			'Politics',
			'Opinion',
			'Science',
			'Health',
			'Style',
			'Travel',
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
			fetch('http://localhost:3000/updateprofile/' + user.id, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: user.id,
					biography: biography,
					birthday: birthday,
					interests: interests,
					imageName: imageName,
					imageData: imageData,
				}),
			})
				.then((response) => response.text())
				.then((data) => {
					if (data) {
						onActivityIDChange(data);
						onRouteChange('profile/' + data);
					}
				});
		};

		return (
			<div>
				<fieldset id='update-profile'>
					<legend>
						<Typography variant='button'>
							<h2>Update Your Profile</h2>
						</Typography>
					</legend>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='biography'
							label='Tell us something about yourself'
							fullWidth='true'
							variant='filled'
							type='text'
							name='biography'
							id='biography'
							multiline
							rows={5}
							onChange={(event) => {
								setBiography(event.target.value);
							}}
						></TextField>
					</div>
					<div className={classes.inputfield}>
						<TextField
							htmlFor='birthday'
							label='Date of Birth'
							InputLabelProps={{ shrink: true }}
							type='date'
							variant='filled'
							fullWidth='true'
							name='birthday'
							id='birthday'
							onChange={(event) =>
								setBirthday(event.target.value)
							}
						></TextField>
					</div>
					<div>
						<Box className={classes.box} bgcolor='#e0e0e0'>
							<Typography align='left'>
								Upload an Image of Youself
							</Typography>
							<Image
								baseImage={baseImage}
								getBaseFile={getBaseFile}
							/>
						</Box>
					</div>
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
					<label>
						<Button
							variant='contained'
							color='secondary'
							component='span'
							onClick={onSubmit}
						>
							Update
						</Button>
					</label>
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
