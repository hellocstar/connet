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

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label='user' className={classes.avatar}>
						A
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={activity.name}
				subheader={activity.date}
			/>

			<CardActionArea onClick={onClickName}>
				<CardMedia
					className={classes.media}
					image='./connet_icon.png'
					title={activity.name}
				/>
				<CardContent>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
					>
						{activity.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>{activity.description}</CardContent>
			</Collapse>
		</Card>
	);
};

export default ListItem;
