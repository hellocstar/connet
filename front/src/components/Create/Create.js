import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//contains methods, theme and styles for componenets to render the create page

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

const Create = ({ isSignedIn, onRouteChange, changeCreateRoomFor }) => {
	if (isSignedIn) {
		return (
			// <div>
			// 	<button onClick={() => onRouteChange('newevent')}>
			// 		Organise an Event in Community
			// 	</button>
			// 	<button
			// 		onClick={() => {
			// 			changeCreateRoomFor('mycircle');
			// 			onRouteChange('newroom');
			// 		}}
			// 	>
			// 		Host a Room in MyCircle
			// 	</button>
			// </div>
			<div>
			<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth='lg'>
				<Box m={5}>
					<Button
						variant='contained'
						color='secondary'
						startIcon={<EditIcon />}
						onClick={() => onRouteChange('newevent')}
					>
						Organise an Event in Community
					</Button>
				</Box>

				<Box m={5}>
					<Button
						variant='contained'
						color='secondary'
						startIcon={<EventIcon />}
						onClick={() => {
							changeCreateRoomFor('mycircle');
							onRouteChange('newroom');
						}}
					>
						Host a Room in MyCircle
					</Button>
				</Box>
			</Container>
			</MuiThemeProvider>
			</div>
		);
	} else {
		return (
			<div>
				<p>Sign In or Sign Up to do whatever you want!</p>
			</div>
		);
	}
};

export default Create;
