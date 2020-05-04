import React from 'react';
import Button from '@material-ui/core/Button';
import './NotFound.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//contains methods, theme and styles for componenets to render the no result found page

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

const NotFound = ({ onRouteChange }) => {
	return (
		<MuiThemeProvider theme={theme}>
		<div id='notfound'>
			<div className='notfound'>
				<div className='notfound-404'></div>
				<h1>404</h1>
				<h2>Oops! Page Not Be Found</h2>
				<p>
					Sorry but the page you are looking for does not exist, have
					been removed, name changed or is temporarily unavailable.
				</p>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => onRouteChange('community')}
				>
					Go to Community
				</Button>
			</div>
		</div>
		</MuiThemeProvider>
	);
};

export default NotFound;
