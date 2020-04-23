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
import TitleBanner from './TitleBanner'

const initialState = {
	pastRoute: 'community',
	route: 'community',
	searchField: '',
	activityID: '',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
	},
	createRoomFor: '',
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	onSearchChange = (search) => {
		this.setState({ searchField: search.target.value });
	};

	onRouteChange = (route) => {
		this.setState({ pastRoute: this.state.route});
		this.setState({ route: route });
		// console.log(route)
		console.log(this.state.pastRoute);
	};

	onActivityIDChange = (id) => {
		this.setState({ activityID: id });
	};

	onSignIn = (id, name) => {
		this.setState({
			user: { id: id, name: name },
			activityID: id,
			isSignedIn: true,
		});
	};

	onSignOut = () => {
		this.setState({
			user: { id: '', name: '' },
			activityID: '',
			isSignedIn: false,
		});
		this.onRouteChange('community');
	};

	changeCreateRoomFor = (forWhat) => {
		this.setState({ createRoomFor: forWhat });
	};

	render() {
		const {
			pastRoute,
			route,
			searchField,
			activityID,
			isSignedIn,
			user,
			createRoomFor,
		} = this.state;
		return (
			<ErrorBoundary>
				<div className='App'>
					<NavBar
						isSignedIn={isSignedIn}
						onRouteChange={this.onRouteChange}
						onActivityIDChange={this.onActivityIDChange}
						onSignIn={this.onSignIn}
						onSignOut={this.onSignOut}
						pastRoute={pastRoute}
					/>
					{route === 'community' ? (
						<div>
							<Banner onRouteChange={this.onRouteChange} />
							<Search searchChange={this.onSearchChange} />
							<Community
								className='itemlist'
								searchField={searchField}
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
							/>
						</div>
					) : route === 'mycircle' ? (
						<div>
							<Banner onRouteChange={this.onRouteChange} />
							<Search searchChange={this.onSearchChange} />
							<MyCircle
								className='itemlist'
								searchField={searchField}
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								userID={user.id}
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
							<Toolbar />
							<Create
								onRouteChange={this.onRouteChange}
								isSignedIn={isSignedIn}
								changeCreateRoomFor={this.changeCreateRoomFor}
							/>
						</div>
					) : route === 'profile/' + activityID ? (
						<div>
							<Toolbar />
							<Profile
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
								activityID={activityID}
							/>
						</div>
					) : route === 'updateprofile/' + activityID ? (
						<div>
							<Toolbar />
							<UpdateProfile
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
							/>
						</div>
					) : route === 'newevent' ? (
						<div>
							<Toolbar />
							<NewEvent
								onRouteChange={this.onRouteChange}
								onActivityIDChange={this.onActivityIDChange}
								isSignedIn={isSignedIn}
								user={user}
							/>
						</div>
					) : route === 'newroom' ? (
						<div>
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
							<Toolbar />
							<p>
								ConNET is a user-friendly, multi-functional web
								application which provides an online platform
								for users to join, as well as organise various
								kinds of real-life events and meet-ups. ConNET
								encourages people to build connections and a
								larger social circle, thereby improving their
								lives. ConNET is developed in an attempt to be a
								virtual realm of the real-life community a with
								shorter distance between people in the online
								community. The developing team hopes people
								understand that electronic devices do not always
								bring people apart. They are actually the
								virtuality of us, connected by a network. And
								ConNET makes use of the network.
							</p>
						</div>
					)}
					<StickyFooter
						title='ConNET'
						description='Anytime, anywhere!'
					/>
				</div>
			</ErrorBoundary>
		);
	}
}

export default App;
