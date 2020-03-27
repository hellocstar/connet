import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const Event = ({ events, activityID }) => {
// 	for (let i = 0; i < events.length; i++) {
// 		if (events[i].id === activityID) {
// 			return (
// 				<div>
// 					<h1>{events[i].name}</h1>
// 					<p>{events[i].user}</p>
// 					<p>{events[i].date}</p>
// 					<p>{events[i].location}</p>
// 					<p>{events[i].description}</p>
// 				</div>
// 			);
// 		}
// 	}
// 	return (
// 		<div>
// 			<h1>Event not found</h1>
// 		</div>
// 	);
// };

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

function ActivityCard(prop){
	const classes = useStyles();
	return (		
		<Card className={classes.root}>
		<CardActionArea>
		  <CardMedia
			className={classes.media}
			image="./connet_icon.png"
			title={prop.name}
		  />
		  <CardContent>
			<Typography gutterBottom variant="h5" component="h2">
			{prop.name}
			</Typography>
			<Typography variant="body2" color="textSecondary" component="p">
			{prop.description}
			</Typography>
		  </CardContent>
		</CardActionArea>
		<CardActions>
		  <Button size="small" color="primary">
			Share
		  </Button>
		  <Button size="small" color="primary">
			Learn More
		  </Button>
		</CardActions>
		</Card>
	);
}

const Event = ({ events, activityID }) => {
	
	for (let i = 0; i < events.length; i++) {
		if (events[i].id === activityID) {
			return (
				<ActivityCard 
					name={events[i].name} 
					description={events[i].description} />
			);
		}
	}
	return (
		<div>
			<h1>Event not found</h1>
		</div>
	);
};

export default Event;
