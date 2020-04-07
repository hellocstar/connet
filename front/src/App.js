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
import Room from './components/Room/Room';

const CommunityEventDatabase = [
	{
		name: 'Marathon',
		user: 'abc',
		date: '20200327',
		location: 'Hong Kong',
		description: 'Run',
		id: '001',
	},
	{
		name: 'Singing Contest',
		user: 'def',
		date: '20200423',
		location: 'CUHK',
		description: 'Sing',
		id: '002',
	},
	{
		name: 'CSCI3100',
		user: 'ghi',
		date: '20200517',
		location: 'Kowloon',
		description: 'CSCI',
		id: '003',
	},
];

const CommunityRoomDatabase = [
	{
		name: 'Community Room 1',
		host: 'abc',
		date: '20200327',
		location: 'Hong Kong',
		description: 'Run',
		id: '101',
	},
	{
		name: 'Community Room 2',
		host: 'def',
		date: '20200423',
		location: 'CUHK',
		description: 'Sing',
		id: '102',
	},
	{
		name: 'Community Room 3',
		host: 'ghi',
		date: '20200517',
		location: 'Kowloon',
		description: 'CSCI',
		id: '103',
	},
];

const MyCircleDatabase = [
	{
		name: 'MyCircle Room 1',
		host: 'abc',
		date: '20200327',
		location: 'Hong Kong',
		description: 'Run',
		id: '301',
	},
	{
		name: 'MyCircle Room 2',
		host: 'def',
		date: '20200423',
		location: 'CUHK',
		description: 'Sing',
		id: '302',
	},
	{
		name: 'MyCircle Room 3',
		host: 'ghi',
		date: '20200517',
		location: 'Kowloon',
		description: 'CSCI',
		id: '303',
	},
];

const ProfileInformationDatabase = [
	{
		username: 'derek',
		email: 'chanchunyat1999@gmail.com',
		password: '12345678',
	},
	{
		username: 'tommy',
		email: 'tommy@gmail.com',
		password: '12345678',
	},
	{
		username: 'winky',
		email: 'winky@gmail.com',
		password: '12345678',
	},
	{
		username: 'ivan',
		email: 'ivan@gmail.com',
		password: '12345678',
	},
	{
		username: 'albert',
		email: 'albert@gmail.com',
		password: '12345678',
	},
];

const initialState = {
	route: 'community',
	searchField: '',
	communityEvent: CommunityEventDatabase,
	communityRoom: CommunityRoomDatabase,
	myCircle: MyCircleDatabase,
	activityID: '',
	isSignedIn: true,
	user: {
		id: '',
		name: '',
		email: '',
		password: '',
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

	render() {
		const {
			route,
			searchField,
			communityEvent,
			communityRoom,
			myCircle,
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
							events={communityEvent}
							rooms={communityRoom}
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
							rooms={myCircle}
							onRouteChange={this.onRouteChange}
							onActivityIDChange={this.onActivityIDChange}
							isSignedIn={isSignedIn}
							userID={user.id}
						/>
					</div>
				) : route === 'activity' ? (
					<div>
						<Event
							events={communityEvent}
							activityID={activityID}
						/>
					</div>
				) : route === 'signin' ? (
					<div>
						<SignIn onRouteChange={this.onRouteChange} />
					</div>
				) : route === 'signup' ? (
					<div>
						<SignUp onRouteChange={this.onRouteChange} />
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
