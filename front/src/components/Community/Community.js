import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './community.css';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const Community = ({ searchField, onRouteChange, onActivityIDChange }) => {
	const [eventList, setEventList] = useState([]);

	const sections = [
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

	const suggestions = [
		{ title: 'Join a movement'},
		{ title: 'Learn to cook'},
		{ title: 'Train fo a marathon'},
		{ title: 'Build a mobile app'},
		{ title: 'Hike a mountain'},
		{ title: 'Practice a language'},
		
	];

	useEffect(() => {
		fetch('http://localhost:3000/community')
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setEventList(data);
				}
			});
	}, []);

	const searchResult = eventList.filter((event) => {
		return event.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		
		<React.Fragment>
			<CssBaseline />
			<Grid item md={12}>
			<Container maxWidth="lg">
			{/* <Header suggestions={suggestions} sections={sections} /> */}
			<div className='parent'>
			{searchResult.map((event) => {
				return (
					
					<Grid 
						item key={event} 
						xs={6} 
						sm={6} 
						md={6}
						
						>
						<Box m={1}>
						<ListItem
							activity={event}
							onRouteChange={onRouteChange}
							onActivityIDChange={onActivityIDChange}
							type={'event'}
						/>
						</Box>
					</Grid>
					
				);
			})}
			</div>			
			</Container>
			</Grid>
		</React.Fragment>
		
	);
};

export default Community;
