import React from 'react';
import './Banner.css';
import banner from './banner.jpg';
import Logo from './connet_icon.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

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

const logostyle = {
	//position:"relative",
	width: '150px',
};

const imgCenterStyle = {
	position: 'absolute',
	top: '50%',
	color: 'white',
	fontSize: '200%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	//display:"flex",
	//alignItems:"center", /** Y-axis align **/
	//justifyContent:"center", /** X-axis align **/
	//left:"25%",
	//width:"100%",
};

const BootstrapButton = withStyles({
	root: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		padding: '6px 12px',
		margin: '20px',
		lineHeight: 1.5,
		backgroundColor: '#ffa200',

		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			backgroundColor: '#e91e63',

			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#ff9185',
		},
	},
})(Button);

const OldBanner = ({ onRouteChange }) => {
	return (
		<div className='container'>
			<MuiThemeProvider theme={theme}>
				<img className='Banner' src={banner} alt='Banner' />
				<div className='centered'>
					<img src={Logo} alt='Logo' style={logostyle} />
					<div className='title'>The world awaits you</div>
					<div className='description'>
						Join a local group to meet people, try something new, or
						do more of what you love.
					</div>
					<BootstrapButton
						variant='contained'
						color='primary'
						onClick={() => onRouteChange('about')}
					>
						What is ConNET?
					</BootstrapButton>
				</div>
			</MuiThemeProvider>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
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
	  padding: theme.spacing(3),
	  [theme.breakpoints.up('md')]: {
		padding: theme.spacing(10),
		paddingRight: 1,
	  },
	},
  }));

export default function Banner(props) {
const classes = useStyles();
//const { post } = props;

return (
	<MuiThemeProvider theme={theme}>
	<Paper className={classes.Banner} style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}>
	{/* Increase the priority of the hero background image */}
	<div className={classes.overlay} />
	<Grid container>
		<Grid item md={11}>
		<div className={classes.BannerContent}>
			{<img src={Logo} alt='Logo' style={logostyle} />}
			<Typography component="h1" variant="h3" color="inherit" gutterBottom>
			{"The world awaits you."}
			</Typography>
			<Typography variant="h5" color="inherit" paragraph>
			{'Join a local group to meet people, try something new, or do more of what you love.'}
			</Typography>
			<BootstrapButton
				variant='contained'
				color='primary'
				onClick={() => props.onRouteChange('about')}
			>
				What is ConNET?
			</BootstrapButton>
		</div>
		</Grid>
	</Grid>
	</Paper>
	</MuiThemeProvider>
);
}

Banner.propTypes = {
post: PropTypes.object,
};
