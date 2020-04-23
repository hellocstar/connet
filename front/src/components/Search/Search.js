import React from 'react';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Header from './Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '80%',
			justifyContent: 'space-between',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

// const sections = [
// 	{ title: 'Technology', url: '#' },
// 	{ title: 'Design', url: '#' },
// 	{ title: 'Culture', url: '#' },
// 	{ title: 'Business', url: '#' },
// 	{ title: 'Politics', url: '#' },
// 	{ title: 'Opinion', url: '#' },
// 	{ title: 'Science', url: '#' },
// 	{ title: 'Health', url: '#' },
// 	{ title: 'Style', url: '#' },
// 	{ title: 'Travel', url: '#' },
// ];

const sections = [
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

const suggestions = [
	{ title: 'Join a movemcent' },
	{ title: 'Learn to cook' },
	{ title: 'Train for a marathon' },
	{ title: 'Build a mobile app' },
	{ title: 'Hike a mountain' },
	{ title: 'Practice a language' },
];

const Search = ({ searchChange, onRouteChange, onCategorySearch }) => {
	const classes = useStyles();
	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<div>
				<Box m={1}>
					<Container maxWidth='lg'>
						<Grid
							container
							alignItems='center'
							direction='row'
							justify='center'
						>
							<Grid
								item
								xs={11}
								alignItems='center'
								direction='row'
								justify='center'
							>
								<div className={classes.search}>
									<div className={classes.searchIcon}>
										<SearchIcon />
									</div>
									<InputBase
										placeholder='Search on!'
										classes={{
											root: classes.inputRoot,
											input: classes.inputInput,
										}}
										onChange={searchChange}
									/>
								</div>
							</Grid>
						</Grid>
					</Container>
				</Box>
				<CssBaseline />
				<Container maxWidth='lg'>
					<Header
						suggestions={suggestions}
						sections={sections}
						searchChange={searchChange}
						onRouteChange={onRouteChange}
						onCategorySearch={onCategorySearch}
					/>
				</Container>
			</div>
		</form>
	);
};

{
	/* <div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search for events…'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						onChange={searchChange}
					/>
				</div> */
}

export default Search;
