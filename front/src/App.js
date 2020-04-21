import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
// import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Search from './components/Search/Search';
import Community from './components/Community/Community';
import MyCircle from './components/MyCircle/MyCircle';
import Banner from './components/Banner/Banner';
import Event from './components/Event/Event';
import Create from './components/Create/Create';
import Profile from './components/Profile/Profile';
import Room from './components/Room/Room';
import NewEvent from './components/NewEvent/NewEvent';
import NewRoom from './components/NewRoom/NewRoom';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';

const initialState = {
	route: 'community',
	searchField: '',
	activityID: '',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
	},
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
		this.setState({ route: route });
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

	render() {
		const {
			route,
			searchField,
			// myCircle,
			activityID,
			isSignedIn,
			user,
		} = this.state;
		return (
			<div className='App'>
				<NavBar
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
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
						<Event
							activityID={activityID}
							onRouteChange={this.onRouteChange}
							onActivityIDChange={this.onActivityIDChange}
						/>
					</div>
				) : route === 'room/' + activityID ? (
					<div>
						<Room
							activityID={activityID}
							onRouteChange={this.onRouteChange}
							onActivityIDChange={this.onActivityIDChange}
						/>
					</div>
				) : route === 'signin' ? (
					<div>
						<SignIn
							onRouteChange={this.onRouteChange}
							onActivityIDChange={this.onActivityIDChange}
							onSignIn={this.onSignIn}
						/>
					</div>
				) : route === 'signup' ? (
					<div>
						<SignUp
							onRouteChange={this.onRouteChange}
							onActivityIDChange={this.onActivityIDChange}
							onSignIn={this.onSignIn}
						/>
					</div>
				) : route === 'create' ? (
					<div>
						<Create
							onRouteChange={this.onRouteChange}
							isSignedIn={isSignedIn}
						/>
					</div>
				) : route === 'profile/' + activityID ? (
					<div>
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
						<UpdateProfile
							onRouteChange={this.onRouteChange}
							onActivityIDChange={this.onActivityIDChange}
							isSignedIn={isSignedIn}
							user={user}
						/>
					</div>
				) : route === 'newevent' ? (
					<div>
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
						/>
					</div>
				) : (
					<div>
						<p>Welcome to ConNET!</p>
					</div>
				)}
			</div>
		);
	}
}

export default App;
