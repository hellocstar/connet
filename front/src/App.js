import React, { Component } from 'react';
import './App.css';
import Toolbar from '@material-ui/core/Toolbar';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import Search from './components/Search/Search';
import Community from './components/Community/Community';
import MyCircle from './components/MyCircle/MyCircle';
import Event from './components/Event/Event';
import Room from './components/Room/Room';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Create from './components/Create/Create';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import NewEvent from './components/NewEvent/NewEvent';
import NewRoom from './components/NewRoom/NewRoom';
import NotFound from './components/NotFound/NotFound';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import StickyFooter from './components/StickyFooter/StickyFooter';
import TitleBanner from './TitleBanner';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({       //custom material ui theme
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
	typography: {
		button: {
			
		},
	},
});




const initialState = {     //state for the entire web app
	pastRoute: 'community',
	route: 'community',
	searchField: '',
	categorySearch: '',
	descriptionSearch: '',
	activityID: '',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		imageData: '',
		friends: '',
	},
	createRoomFor: '',
};

class App extends Component {     //class for the whole web app
	constructor() {
		super();
		this.state = initialState;
	}

	onSearchChange = (search) => {      //handle search
		this.setState({ searchField: search.target.value });
	};

	onCategorySearch = (search) => {       //handle search
		this.setState({ categorySearch: search });
	};

	onDescriptionSearch = (search) => {        //handle search
		this.setState({ descriptionSearch: search });
	};

	onRouteChange = (route) => {        //handle page change
		this.setState({ categorySearch: '' });
		this.setState({ descriptionSearch: '' });
		this.setState({ pastRoute: this.state.route });
		this.setState({ route: route });
		window.scrollTo(0, 0);
	};

	onActivityIDChange = (id) => {            //handle page change
		this.setState({ activityID: id });
	};

	onFollow = (friends) => {        //handle follow action
		this.setState({
			user: {
				id: this.state.user.id,
				name: this.state.user.name,
				imageData: this.state.user.imageData,
				friends: friends,
			},
		});
		console.log(this.state.user);
	};

	onSignIn = (id, name, imageData, friends) => {             //handle sign in
		this.setState({
			user: {
				id: id,
				name: name,
				imageData: imageData,
				friends: friends,
			},
			activityID: id,
			isSignedIn: true,
		});
	};

	onSignOut = () => {               //handle sign out
		this.setState({
			user: { id: '', name: '', imageData: '', friends: [] },
			activityID: '',
			isSignedIn: false,
		});
		this.onRouteChange('community');
	};

	changeCreateRoomFor = (forWhat) => {       //handle create room
		this.setState({ createRoomFor: forWhat });
	};

	render() {         //method for rendering the app 
		const {
			pastRoute,
			route,
			searchField,
			categorySearch,
			descriptionSearch,
			activityID,
			isSignedIn,
			user,
			createRoomFor,
		} = this.state;
		return (
			<MuiThemeProvider theme={theme}>           
			<ErrorBoundary onRouteChange={this.onRouteChange}>
				<div className='App'>
					<NavBar                                  
						isSignedIn={isSignedIn}
						onRouteChange={this.onRouteChange}
						onActivityIDChange={this.onActivityIDChange}
						onSignIn={this.onSignIn}
						onSignOut={this.onSignOut}
						pastRoute={pastRoute}
						user={user}
					/>
					{route === 'community' ? (
						<div>
							<Banner onRouteChange={this.onRouteChange} />
							<Search
								searchChange={this.onSearchChange}
								onRouteChange={this.onRouteChange}
								onCategorySearch={this.onCategorySearch}
								onDescriptionSearch={this.onDescriptionSearch}
							/>
							<Community
								className='itemlist'
								searchField={searchField}
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								categorySearch={categorySearch}
								descriptionSearch={descriptionSearch}
							/>
						</div>
					) : route === 'mycircle' ? (
						<div>
							<Banner onRouteChange={this.onRouteChange} />
							<Search
								searchChange={this.onSearchChange}
								onRouteChange={this.onRouteChange}
								onCategorySearch={this.onCategorySearch}
								onDescriptionSearch={this.onDescriptionSearch}
							/>
							<MyCircle
								className='itemlist'
								searchField={searchField}
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								userID={user.id}
								categorySearch={categorySearch}
								descriptionSearch={descriptionSearch}
							/>
						</div>
					) : route === 'event/' + activityID ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<Event
								activityID={activityID}
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								changeCreateRoomFor={this.changeCreateRoomFor}
							/>
						</div>
					) : route === 'room/' + activityID ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<Room
								activityID={activityID}
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								userID={user.id}
							/>
						</div>
					) : route === 'signin' ? (
						<div>
							<Toolbar />
							<SignIn
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								onSignIn={this.onSignIn}
							/>
						</div>
					) : route === 'signup' ? (
						<div>
							<Toolbar />
							<SignUp
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								onSignIn={this.onSignIn}
							/>
						</div>
					) : route === 'create' ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<Create
								onRouteChange={this.onRouteChange}
								isSignedIn={isSignedIn}
								changeCreateRoomFor={this.changeCreateRoomFor}
							/>
						</div>
					) : route === 'profile/' + activityID ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<Profile
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
								activityID={activityID}
								onFollow={this.onFollow}
							/>
						</div>
					) : route === 'updateprofile/' + activityID ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<UpdateProfile
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
							/>
						</div>
					) : route === 'newevent' ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<NewEvent
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
							/>
						</div>
					) : route === 'newroom' ? (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<NewRoom
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
								createRoomFor={createRoomFor}
							/>
						</div>
					) : route === 'notfound' ? (
						<div>
							<NotFound onRouteChange={this.onRouteChange} />
						</div>
					) : (
						<div>
							<TitleBanner onRouteChange={this.onRouteChange} />
							<CssBaseline />
							<Container maxWidth='lg'>
								<Paper variant='outlined'>
									<Box m={5}>
										<Typography variant='h4' align='center'>
											About Us
										</Typography>
									</Box>
									<Divider variant='middle' />
									<Box m={5}>
										<Typography variant='h6' align='left'>
											ConNET is a user-friendly,
											multi-functional web application
											which provides an online platform
											for users to join, as well as
											organise various kinds of real-life
											events and meet-ups.
										</Typography>
									</Box>
									<Box m={5}>
										<Typography variant='h6' align='left'>
											ConNET encourages people to build
											connections and a larger social
											circle, thereby improving their
											lives. ConNET is developed in an
											attempt to be a virtual realm of the
											real-life community a with shorter
											distance between people in the
											online community. The developing
											team hopes people understand that
											electronic devices do not always
											bring people apart. They are
											actually the virtuality of us,
											connected by a network. And ConNET
											makes use of the network.
										</Typography>
									</Box>
									<Box m={5}>
										<Typography variant='h6' align='left'>
											The developing team hopes people
											understand that electronic devices
											do not always bring people apart.
											They are actually the virtuality of
											us, connected by a network. And
											ConNET makes use of the network.
										</Typography>
									</Box>
								</Paper>
							</Container>
						</div>
					)}
					<StickyFooter
						title='ConNET'
						description='Anytime, anywhere!'
					/>
				</div>
			</ErrorBoundary>
			</MuiThemeProvider>
		);
	}
}

export default App;
