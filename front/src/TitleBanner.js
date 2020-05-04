import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';

const theme = createMuiTheme({           //material ui custom theme
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

const useStyles = makeStyles((theme) => ({             //material ui custom style
	Banner: {
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
	BannerContent: {
		position: 'relative',
		padding: theme.spacing(1),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(3),
			paddingRight: 1,
		},
	},
	toolbar: {
		borderBottom: `2px solid ${theme.palette.common.white}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
}));

const sections = [                    //section for categories
	{ title: 'Technology', url: '#' },
	{ title: 'Design', url: '#' },
	{ title: 'Culture', url: '#' },
	{ title: 'Business', url: '#' },
	{ title: 'Politics', url: '#' },
	{ title: 'Opinion', url: '#' },
	{ title: 'Science', url: '#' },
	{ title: 'Health', url: '#' },
	{ title: 'Style', url: '#' },
	{ title: 'Travel', url: '#' },
];

export default function TitleBanner(props) {            //create a banner with buttons on top of the page
	const classes = useStyles();
	//const { post } = props;

	return (
		<MuiThemeProvider theme={theme}>
			<Paper
				className={classes.Banner}
				style={{
					backgroundImage: 'url(https://source.unsplash.com/random)',
				}}
			>
				{/* Increase the priority of the hero background image */}
				<div className={classes.overlay} />
				<Grid item md={12}>
					<Grid item container>
						<Container maxWidth='lg'>
							<div className={classes.BannerContent}>
								<React.Fragment>
									<Toolbar className={classes.toolbar}>
										<Typography
											component='h2'
											variant='h5'
											color='inherit'
											align='center'
											noWrap
											className={classes.toolbarTitle}
										></Typography>
									</Toolbar>
									<Toolbar
										component='nav'
										variant='dense'
										className={classes.toolbarSecondary}
									>
										{sections.map((section) => (
											<Button
												color='inherit'
												onClick={() =>
													props.onRouteChange(
														'community'
													)
												}
											>
												{section.title}
											</Button>
										))}
									</Toolbar>
								</React.Fragment>
							</div>
						</Container>
					</Grid>
				</Grid>
			</Paper>
		</MuiThemeProvider>
	);
}

TitleBanner.propTypes = {
	post: PropTypes.object,
};
