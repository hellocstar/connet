import React, { useState, useEffect } from 'react';
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
}));

function ActivityCard(prop) {
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

	const mainFeaturedPost = {
		title: {name},
		description: {description},
		image: 'https://source.unsplash.com/random',
		imgText: 'main image description',
		linkText: 'Continue reading…',
	};

	const classes = useStyles();

	return (
		
		<div>
			<CssBaseline />
			<Container maxWidth="lg">
			{/* <Banner /> */}
			{/* <ActivityCard name={name} description={description} /> */}
			{/* <MainFeaturedPost post={mainFeaturedPost} /> */}
			<Box m={6}>
			<Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(https://source.unsplash.com/random)` }}>
				<Grid container>
					<Grid item md={6}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography component="h1" variant="h3" color="inherit" gutterBottom>
						{name}
						</Typography>
						<Typography variant="h5" color="inherit" paragraph>
						{description}
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
				<Typography variant="h6" gutterBottom align='left'>
					{date}
				</Typography>
				<Typography variant="h4" gutterBottom align='left'>
					{name}
				</Typography>
				
				<Grid container spacing={0}>
				<Grid>
					<Box m={1}>
					<Avatar src={organiser.imageData} />
					</Box>					
				</Grid>
				<Grid>
					<Typography variant="h6" gutterBottom align='left'>
						{"Hosted by:"}
					</Typography>
					<Typography variant="p" align='middle'>
						{organiser.username}
					</Typography>					
				</Grid>
				</Grid>
				
				<Divider />
				
			</Grid>
			
			</Grid>
			
			
			<h1>{date}</h1>
			<h1>{time}</h1>
			<h1>{location}</h1>
			<img src={imageData} alt=''></img>
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
				<button
					onClick={() => {
						changeCreateRoomFor(activityID);
						onRouteChange('newroom');
					}}
				>
					Host a Room in {name}!
				</button>
			) : null}
			
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
		</div>
		
	);
};

export default Event;
