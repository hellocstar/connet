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

const useStyles = makeStyles({
	root: {
		maxWidth: 1300,
		margin: 'auto',
		margintop: '20px',
	},
	media: {
		height: 350,
	},
});

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

const Event = ({ activityID, onRouteChange, onActivityIDChange }) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	// const [photo, setPhoto] = useState('');
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
					setCategories(data.event.categories);
					setRooms(data.rooms);
					setOrganiser(data.organiser);
				}
			});
	}, []);

	return (
		<div>
			<ActivityCard name={name} description={description} />
			<h1>{date}</h1>
			<h1>{time}</h1>
			<h1>{location}</h1>
			<h1
				onClick={() => {
					onActivityIDChange(organiser.id);
					onRouteChange('profile/' + organiser.id);
				}}
			>
				{organiser.username}
			</h1>
			<h1>{categories}</h1>

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
		</div>
	);
};

export default Event;
