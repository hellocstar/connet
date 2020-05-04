import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

//contains methods, theme and styles for componenets to render a list of items (events or rooms)

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		margin: 'auto',
		marginBottom: '20px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	card: {
		display: 'flex',
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
	},
}));

const ListItem = ({ activity, onRouteChange, onActivityIDChange, type }) => {
	const onClickName = () => {
		if (type === 'event') {
			onActivityIDChange(activity._id);
			onRouteChange('event/' + activity._id);
		} else if (type === 'room') {
			onActivityIDChange(activity._id);
			onRouteChange('room/' + activity._id);
		}
	};

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// const DefaultSentence = '';
	// if (type === 'event'){
	// 	DefaultSentence = 'More details about this event......';
	// }
	// else if (type === 'room'){

	// }

	return (
		<Grid item xs={12} md={12}>
			<CardActionArea component='a' onClick={onClickName}>
				<Card className={classes.card} style={{ display: 'flex' }}>
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography
								component='h2'
								align='left'
								variant='h5'
							>
								{activity.name}
							</Typography>
							<Typography
								variant='subtitle1'
								align='left'
								color='textSecondary'
							>
								{'Date: '}
								{new Intl.DateTimeFormat('en-GB', {
									year: 'numeric',
									month: 'long',
									day: '2-digit',
								}).format(Date.parse(activity.date))}
								{/* {activity.date} */}
							</Typography>
							<Typography
								noWrap
								variant='subtitle1'
								align='left'
								paragraph
							>
								{activity.description ? (
									<div style={{overflow: "hidden", textOverflow: "ellipsis", width: '20rem'}}> 
									<Typography
										noWrap
										variant='subtitle1'
										align='left'
										paragraph
									>
										{activity.description}
									</Typography>
									</div>
								) : (
									<div style={{overflow: "hidden", textOverflow: "ellipsis", width: '20rem'}}> 
									<Typography
										noWrap
										variant='subtitle1'
										align='left'
										paragraph
									>
										More details about this {type}......
									</Typography>
									</div>
								)}
							</Typography>
							
							{type === 'event' ? (
								<Typography
									variant='subtitle1'
									align='left'
									color='secondary'
								>
									Continue reading...
								</Typography>
							) : (
								<Typography
									variant='subtitle1'
									align='left'
									color='secondary'
								>
									Enter room
								</Typography>
							)}
						</CardContent>
					</div>
					<Hidden xsDown>
						{activity.imageData ? (
							<CardMedia
								className={classes.cardMedia}
								image={activity.imageData}
								title={activity.name}
							/>
						) : (
							<CardMedia
								className={classes.cardMedia}
								image={'https://source.unsplash.com/random'}
								title={activity.name}
							/>
						)}
					</Hidden>
				</Card>
			</CardActionArea>
		</Grid>
	);
};

{
	/* <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={onClickName}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {activity.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {activity.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {activity.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={'url(https://source.unsplash.com/random)'} title={activity.description} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid> */
}

export default ListItem;
