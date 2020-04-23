import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import ListItem from '../ListItem/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

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

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 1300,
		margin: 'auto',
		margintop: '20px',
	},
	media: {
		height: 350,
	},
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	mainFeaturedPostContent: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	mainGrid: {
		marginTop: theme.spacing(3),
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
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
	cardGrid: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
}));

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

	const classes = useStyles();

	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Container maxWidth='lg'>
					<Box m={6}>
						<Paper
							className={classes.mainFeaturedPost}
							style={{
								backgroundImage: `url(https://source.unsplash.com/random)`,
							}}
						>
							<div className={classes.overlay} />
							<Grid container>
								<Grid item md={1}>
									<div
										className={
											classes.mainFeaturedPostContent
										}
									>
										<Typography
											component='h1'
											variant='h3'
											color='inherit'
											align='left'
											gutterBottom
										>
											{name}
										</Typography>
										<Typography
											variant='h5'
											color='inherit'
											align='left'
											paragraph
										>
											{description}
										</Typography>

										<Grid item md={6}>
											{isSignedIn &&
											type === 'mycircle' ? (
												<Button
													variant='contained'
													color='secondary'
													onClick={() => {
														onRouteChange(
															'mycircle'
														);
													}}
												>
													{typeName}
												</Button>
											) : null}

											{type !== 'mycircle' ? (
												<Button
													variant='contained'
													color='secondary'
													onClick={() => {
														onActivityIDChange(
															type
														);
														onRouteChange(
															'event/' + type
														);
													}}
												>
													{typeName}
												</Button>
											) : null}
										</Grid>
									</div>
								</Grid>
							</Grid>
						</Paper>
					</Box>

					{/* {isSignedIn && type === 'mycircle' ? (
				<Button 
					variant='contained'
					color='secondary'
					onClick={() => {
						onRouteChange('mycircle');
					}}
				>
					{typeName}
				</Button>
			) : null}
			{type !== 'mycircle' ? (
				<Button 
					variant='contained'
					color='secondary'
					onClick={() => {
						onActivityIDChange(type);
						onRouteChange('event/' + type);
					}}
				>
					{typeName}
				</Button>
			) : null} */}

					<Grid container spacing={5} className={classes.mainGrid}>
						<Grid item xs={12} md={8}>
							<Typography variant='h6' gutterBottom align='left'>
								{/* {date} */}
								{Moment(date).format('YYYY-MM-DD')} {time}
							</Typography>
							<Typography variant='h4' gutterBottom align='left'>
								{name}
							</Typography>

							<Grid container spacing={0}>
								<Grid
									onClick={() => {
										onActivityIDChange(host._id);
										onRouteChange('profile/' + host._id);
									}}
								>
									<Box m={1}>
										<Avatar src={host.imageData} />
										{/* {console.log(organiser.imageData)} */}
									</Box>
								</Grid>
								<Grid
									onClick={() => {
										onActivityIDChange(host._id);
										onRouteChange('profile/' + host._id);
									}}
								>
									{/* <Box m={1}> */}
									<Typography
										variant='p'
										gutterBottom
										align='left'
									>
										<Box fontWeight='fontWeightBold'>
											{'Hosted by:'}
										</Box>
									</Typography>
									{/* </Box>	 */}

									<Typography variant='p' align='left'>
										<Box
											fontWeight='fontWeightBold'
											fontSize='h6.fontSize'
										>
											{host.username}
										</Box>
									</Typography>

									{/* {organiser.username} */}
								</Grid>
							</Grid>

							<Divider />

							{imageData ? (
								<Box m={5}>
									<img src={imageData} alt=''></img>
								</Box>
							) : null}

							<Typography variant='p' align='left'>
								<Box
									fontWeight='fontWeightBold'
									fontSize='h6.fontSize'
								>
									{'Location: '}
								</Box>
							</Typography>
							<Typography variant='p' align='left'>
								<Box fontSize='h6.fontSize'>{location}</Box>
							</Typography>

							<Typography variant='p' align='left'>
								<Box
									fontWeight='fontWeightBold'
									fontSize='h6.fontSize'
								>
									{'Description: '}
								</Box>
							</Typography>
							<Typography variant='p' align='left'>
								<Box fontSize='h6.fontSize'>{description}</Box>
							</Typography>

							<Typography variant='p' align='left'>
								<Box
									fontWeight='fontWeightBold'
									fontSize='h6.fontSize'
								>
									{'Categories: '}
								</Box>
							</Typography>
							<Typography variant='p' align='left'>
								<Box fontSize='h6.fontSize'>{categories}</Box>
							</Typography>

							{joined ? (
								<Box mt={1}>
									{/* <p>You are a participant of this room! </p> */}
									<Typography variant='p' align='left'>
										<Box
											fontWeight='fontWeightBold'
											fontSize='h6.fontSize'
										>
											{'You are a participant of this room!'}
										</Box>
									</Typography>
								</Box>
							) : null}

							{/* {!joined && isSignedIn ? (
							<Box m={1}>
							<Button onClick={() => joinRoom(userID, activityID)}>
								Join the room!
							</Button>
							</Box>
						) : null} */}

							<Box m={5}>
								{!joined && isSignedIn ? (
									<div>
										<Divider variant='middle' />
										{/* <Grid item md={4}> */}
										<Box m={1}>
											<Button
												onClick={() =>
													joinRoom(userID, activityID)
												}
												variant='contained'
												color='secondary'
											>
												Join the room!
											</Button>
										</Box>
										{/* <Divider variant="middle" /> */}
										{/* </Grid> */}
									</div>
								) : null}
							</Box>
						</Grid>
					</Grid>

					{/* <h1>{name}</h1>
			<h1>{Moment(date).format('YYYY-MM-DD')}</h1>
			<h1>{time}</h1>
			<h1>{location}</h1>
			<img src={imageData} alt=''></img>
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
			{joined ? <p>You are a participant of this room! </p> : null}
			{!joined && isSignedIn ? (
				<button onClick={() => joinRoom(userID, activityID)}>
					Join the room!
				</button>
			) : null} */}
					<Typography variant='p' align='left'>
						<Box fontWeight='fontWeightBold' fontSize='h6.fontSize'>
							{'Participants ('}
							{participants.length}
							{'): '}
						</Box>
					</Typography>

					{/* <Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={1}> */}
					<AvatarGroup max={8}>
						{participants.map((participant) => {
							return (
								// <div className='child' key={participant.id}>
								// 	<p
								// 		onClick={() => {
								// 			onActivityIDChange(participant.id);
								// 			onRouteChange('profile/' + participant.id);
								// 		}}
								// 	>
								// 		{participant.username}
								// 	</p>
								// </div>

								// <Grid item key={participant} xs={12} sm={6} md={4}>
								// 	<Card className={classes.card}>
								// 	<CardMedia
								// 		className={classes.cardMedia}
								// 		image={participant.imageData}
								// 		title={participant.username}
								// 	/>
								// 	<CardContent className={classes.cardContent}>
								// 		<Typography gutterBottom variant="h5" component="h2" align='center'>
								// 		{participant.username}
								// 		</Typography>
								// 	</CardContent>
								// 	<CardActions>
								// 		<Button
								// 			size="small"
								// 			color="secondary"
								// 			onClick={() => {
								// 				onActivityIDChange(participant.id);
								// 				onRouteChange('profile/' + participant.id);
								// 			}}>
								// 		View
								// 		</Button>
								// 	</CardActions>
								// 	</Card>

								// </Grid>
								<Avatar
									alt={participant.username}
									src={participant.imageData}
									onClick={() => {
										onActivityIDChange(participant.id);
										onRouteChange(
											'profile/' + participant.id
										);
									}}
								>
									{participant.imageData}
									{participant.username}
								</Avatar>
							);
						})}
					</AvatarGroup>
					{/* </Grid>
			</Container> */}
				</Container>
			</MuiThemeProvider>
		</div>
	);
};

export default Room;
