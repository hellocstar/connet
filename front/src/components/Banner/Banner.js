import React from 'react';
import './Banner.css';
import banner from './banner.jpg';
import Logo from './connet_icon.png';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
	width: '30%',
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

const Banner = ({ onRouteChange }) => {
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

export default Banner;
