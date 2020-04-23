import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '../ListItem/ListItem';
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Moment from 'moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ffffff',
			mainGradient: 'linear-gradient(to right, orange, #9c27b0)',
			contrastText: '#fff',
		},
		secondary: {
			main: '#e91e63',
		},
	},
});

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

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		avatar: {
			// position: 'absolute',
			// zIndex: 1,
			// top: -30,
			// left: 0,
			// right: 0,
			// margin: '0 auto',
			width: '90',
			height: '90',
		},
		cardGrid: {
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8),
		},
		card: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
		},
		cardMedia: {
			paddingTop: '56.25%', // 16:9
		},
		cardContent: {
			flexGrow: 1,
		},
	}));

	// const useStyles = makeStyles(styles);
	const classes = useStyles();

	return (
		// <div>
		// 	<h1>Profile</h1>
		// 	{myself ? (
		// 		<button
		// 			onClick={() => {
		// 				onRouteChange('updateprofile/' + user.id);
		// 			}}
		// 		>
		// 			update your profile
		// 		</button>
		// 	) : null}
		// 	{isSignedIn && !isFriend && !myself ? (
		// 		<button onClick={onAddFriend}>Follow!</button>
		// 	) : null}
		// 	{isFriend && !myself ? (
		// 		<p>You are now following {username}!</p>
		// 	) : null}
		// 	<h1>{username}</h1>
		// 	<h1>{email}</h1>
		// 	<h1>{biography}</h1>
		// 	<h1>{birthday}</h1>
		// 	<img src={imageData} alt=''></img>
		// 	{myself
		// 		? friends.map((friend) => {
		// 				return (
		// 					<div className='child' key={friend.id}>
		// 						<p
		// 							onClick={() => {
		// 								onActivityIDChange(friend.id);
		// 								onRouteChange('profile/' + friend.id);
		// 							}}
		// 						>
		// 							{friend.username}
		// 						</p>
		// 					</div>
		// 				);
		// 		  })
		// 		: null}
		// 	{history.map((hist) => {
		// 		return (
		// 			<Grid item key={hist} xs={6} sm={6} md={6}>
		// 				<Box m={1}>
		// 					<ListItem
		// 						activity={hist.obj}
		// 						onRouteChange={onRouteChange}
		// 						onActivityIDChange={onActivityIDChange}
		// 						type={hist.type}
		// 					/>
		// 				</Box>
		// 			</Grid>
		// 		);
		// 	})}
		// 	{interests.map((interest) => {
		// 		return (
		// 			<div className='child' key={interest}>
		// 				<p>{interest.username}</p>
		// 			</div>
		// 		);
		// 	})}
		// </div>

		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth='lg'>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							{/* <Avatar src={imageData} className='classes.avatar' sizes='200'>
					{username}
				</Avatar> */}
				<CardMedia
                    className={classes.cardMedia}
                    image={imageData}
                    title={username}
				/>
				<CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" align='left'>
						{username}
                    </Typography>
                    <Typography align='left'>
                      {biography}
                    </Typography>
					<Typography align='left'>
						{'Email: '}
                      {email}
                    </Typography>
					<Typography align='left'>
						{'Birthday: '}
					  {Moment(birthday).format('YYYY-MM-DD')}
                    </Typography>
				</CardContent>
				<CardActions>
					{myself ? (
						<Button
							variant='contained'
							color='secondary'
							startIcon={<EditIcon />}
							onClick={() => {
								onRouteChange('updateprofile/' + user.id);
							}}
						>
							update your profile
						</Button>
					) : null}
					{isSignedIn && !isFriend && !myself ? (
						<Button
							variant='contained'
							color='secondary'
							startIcon={<NotificationsIcon />}
							onClick={onAddFriend}
						>
							follow!
						</Button>
					) : null}
					
				</CardActions>

			</Card>
			</Grid>

			
		</Grid>
		
		
		{isFriend && !myself ? (
			// <p>You are now following {username}!</p>
			<Grid container direction='row' justify='center' alignItems='center' >
			<Typography variant='p' align='left'>
				<Box
					fontWeight='fontWeightBold'
					fontSize='h6.fontSize'
					m={1}
				>
					You are now following {username}!
				</Box>
			</Typography>
			</Grid>
		) : null}

		{myself ? (
			<Grid container direction='row' justify='center' alignItems='center' >
			<Box m={2}>
			<Typography variant='p' align='left'>
				<Box
					fontWeight='fontWeightBold'
					fontSize='h6.fontSize'
				>
					{'Friends ('}
					{friends.length}
					{'): '}
				</Box>
			</Typography>	
			</Box>
			</Grid>

		) : null}

		<Grid container direction='row' justify='center' alignItems='center' >
			
			{myself
				? friends.map((friend) => {
						return (
							<Grid item key={friend} xs={1} sm={1} md={1}>
							<div className='child' key={friend.id}>
								<Typography
									gutterBottom
									variant='h5'
									component='h2'
									align='left'
								>
									{username}
								</Typography>
								<Typography align='left'>
									{biography}
								</Typography>
								<Typography align='left'>
									{'Email: '}
									{email}
								</Typography>
								<Typography align='left'>
									{'Birthday: '}
									{Moment(birthday).format('YYYY-MM-DD')}
								</Typography>
							</CardContent>
							<CardActions>
								{myself ? (
									<Button
										variant='contained'
										color='secondary'
										startIcon={<EditIcon />}
										onClick={() => {
											onRouteChange(
												'updateprofile/' + user.id
											);
										}}
									>
										update your profile
									</Button>
								) : null}
								{isSignedIn && !isFriend && !myself ? (
									<Button
										variant='contained'
										color='secondary'
										startIcon={<NotificationsIcon />}
										onClick={onAddFriend}
									>
										follow!
									</Button>
								) : null}
							</CardActions>
						</Card>
					</Grid>
				</Grid>

				{myself ? (
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
					>
						<Box m={2}>
							<Typography variant='p' align='left'>
								<Box
									fontWeight='fontWeightBold'
									fontSize='h6.fontSize'
								>
									{'Friends ('}
									{friends.length}
									{'): '}
								</Box>
							</Typography>
						</Box>
					</Grid>
				) : null}

				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					{myself
						? friends.map((friend) => {
								return (
									<Grid
										item
										key={friend}
										xs={1}
										sm={1}
										md={1}
									>
										<div className='child' key={friend.id}>
											<Typography
											// onClick={() => {
											// 	console.log(friend._id);
											// 	onActivityIDChange(
											// 		friend._id
											// 	);
											// 	onRouteChange(
											// 		'profile/' + friend._id
											// 	);
											// }}
											>
												<Box fontWeight='fontWeightBold'>
													{friend.username}
												</Box>
											</Typography>
											<IconButton>
												<Avatar
													alt={friend.username}
													src={friend.imageData}
													onClick={() => {
														console.log(user.id);
														console.log(friend.id);
														onActivityIDChange(
															friend.id
														);
														onRouteChange(
															'profile/' +
																friend.id
														);
													}}
												>
													{friend.username}
												</Avatar>
											</IconButton>
										</div>
									</Grid>
								);
						  })
						: null}
				</Grid>

				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<Box m={2}>
						<Typography variant='p' align='left'>
							<Box
								fontWeight='fontWeightBold'
								fontSize='h6.fontSize'
							>
								{'History ('}
								{history.length}
								{'): '}
							</Box>
						</Typography>
					</Box>
				</Grid>

				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
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
				</Grid>

				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<Box m={2}>
						<Typography variant='p' align='left'>
							<Box
								fontWeight='fontWeightBold'
								fontSize='h6.fontSize'
							>
								{'Interests ('}
								{interests.length}
								{'): '}
							</Box>
						</Typography>
					</Box>
				</Grid>

				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					{interests.map((interest) => {
						return (
							// <div className='child' key={interest}>
							// 	<p>{interest.username}</p>
							// </div>
							<Grid item key={interest} xs={1} sm={1} md={1}>
								<div className='child' key={interest.id}>
									<Typography>
										<Box fontWeight='fontWeightBold'>
											{interest}
										</Box>
									</Typography>
									{/* <IconButton>
						<Avatar 
							alt={interest.username} 
							src={interest.imageData}
							onClick={() => {
								onActivityIDChange(interest.id);
								onRouteChange('profile/' + interest.id);
							}}>
							{interest.username}							
						</Avatar>
						</IconButton> */}
								</div>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</MuiThemeProvider>
	);
};

export default Profile;
