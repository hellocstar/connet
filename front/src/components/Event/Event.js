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
import MainFeaturedPost from './MainFeaturedPost';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//contains methods, theme and styles for componenets to render the event page

const theme = createMuiTheme({       //custom material ui theme
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

const useStyles = makeStyles((theme) => ({           //custom material ui style
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
}));

function ActivityCard(prop) {              //code for activity card
	const classes = useStyles();
	return (

		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image='./connet_icon.png'
					title={prop.name}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{prop.name}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
					>
						{prop.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='primary'>
					Share
				</Button>
				<Button size='small' color='primary'>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}
 

const Event = ({
	activityID, 
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	changeCreateRoomFor,
}) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [imageData, setImageData] = useState('');
	const [categories, setCategories] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [organiser, setOrganiser] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/event/' + activityID)
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setName(data.event.name);
					setDate(data.event.date);
					setTime(data.event.time);
					setLocation(data.event.location);
					setDescription(data.event.description);
					setImageData(data.event.imageData);
					setCategories(data.event.categories);
					setRooms(data.rooms);
					setOrganiser(data.organiser);
				}
			});
	}, []);

	const mainFeaturedPost = {            //attributes for the top banner
		title: { name },
		description: { description },
		image: 'https://source.unsplash.com/random',
		imgText: 'main image description',
		linkText: 'Continue reading…',
	};

	const classes = useStyles();

	return (            //rendering the event page
		<div>
			<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth='lg'>
				{/* <Banner /> */}
				{/* <ActivityCard name={name} description={description} /> */}
				{/* <MainFeaturedPost post={mainFeaturedPost} /> */}
				<Box m={6}>
					<Paper
						className={classes.mainFeaturedPost}
						style={{
							backgroundImage: `url(https://source.unsplash.com/random)`,
						}}
					>
						<div className={classes.overlay} />
						<Grid container>
							<Grid item md={6}>
								<div
									className={classes.mainFeaturedPostContent}
								>
									<Typography
										component='h1'
										variant='h3'
										color='inherit'
										gutterBottom
									>
										
										{name}
									</Typography>
									<Typography
										variant='h5'
										color='inherit'
										paragraph
									>
										{Moment(date).format('YYYY-MM-DD')}
									</Typography>
									{/* <Link variant="subtitle1" href="#">
						{"fuck u"}
						</Link> */}
								</div>
							</Grid>
						</Grid>
					</Paper>
				</Box>

				<Grid container spacing={5} className={classes.mainGrid}>
					<Grid item xs={12} md={8}>
						<Typography variant='h6' gutterBottom align='left'>
							{/* {date} */}
							{Moment(date).format('YYYY-MM-DD')}
						</Typography>
						<Typography variant='h4' gutterBottom align='left'>
							{name}
						</Typography>

						<Grid container spacing={0}>
							<Grid
								onClick={() => {
									onActivityIDChange(organiser._id);
									onRouteChange('profile/' + organiser._id);
								}}
							>
								<Box m={1}>
									<Avatar src={organiser.imageData} />
									{/* {console.log(organiser.imageData)} */}
								</Box>
							</Grid>
							<Grid
								onClick={() => {
									onActivityIDChange(organiser._id);
									onRouteChange('profile/' + organiser._id);
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
										{organiser.username}
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
								{'Categories: '}
							</Box>
						</Typography>

						<Typography variant='p' align='left'>
							<Box fontSize='h6.fontSize'>{categories.join(' ')}</Box>
						</Typography>

						{/* <Typography variant='p' align='left'><Box fontSize='h6.fontSize'>
						{categories.map((cate) => {
							return (
								
							)
						})}
						</Box></Typography> */}

						<Typography
							variant='p'
							align='left'
							style={{ whiteSpace: 'pre-line' }}
						>
							<Box
								fontWeight='fontWeightBold'
								fontSize='h6.fontSize'
							>
								{'Description: \n'}
							</Box>
						</Typography>
						<Typography
							variant='p'
							align='left'
							style={{ whiteSpace: 'pre-line' }}
						>
							<Box fontSize='h6.fontSize'>{description}</Box>
						</Typography>
						
						<Box m={5}>
							{isSignedIn ? (
								<div>
								<Divider variant="middle" />
								{/* <Grid item md={4}> */}
								<Box m={1}>
								<Button
									onClick={() => {
										changeCreateRoomFor(activityID);
										onRouteChange('newroom');
									}}
									variant="contained"
									color='secondary'
								>
									Host a Room in {name}!
								</Button>
								</Box>
								{/* <Divider variant="middle" /> */}
								{/* </Grid> */}
								</div>
							) : null}
						</Box>
						
					</Grid>
				</Grid>

				{/* <h1>{date}</h1>
			<h1>{time}</h1> */}
				{/* <h1>{location}</h1>
			
			<h1
				onClick={() => {
					onActivityIDChange(organiser.id);
					onRouteChange('profile/' + organiser.id);
				}}
			>
				{organiser.username}
			</h1>
			<h1>{categories}</h1>
			{isSignedIn ? (
				<Button
					onClick={() => {
						changeCreateRoomFor(activityID);
						onRouteChange('newroom');
					}}
					color = 'primary'
				>
					Host a Room in {name}!
				</Button>
			) : null} */}

				<div className='parent'>
					{rooms.map((room) => {
						return (
							<div className='child' key={room._id}>
								<ListItem
									activity={room}
									onRouteChange={onRouteChange}
									onActivityIDChange={onActivityIDChange}
									type={'room'}
								/>
							</div>
						);
					})}
				</div>
			</Container>
			</MuiThemeProvider>
		</div>
	);
};

export default Event;
