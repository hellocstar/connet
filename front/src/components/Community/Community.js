import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './community.css';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import no_result from './no_result.png';
import Zoom from '@material-ui/core/Zoom';

const Community = ({
	searchField,
	onRouteChange,
	onActivityIDChange,
	categorySearch,
	descriptionSearch,
}) => {
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
		{ title: 'Join a movement' },
		{ title: 'Learn to cook' },
		{ title: 'Train fo a marathon' },
		{ title: 'Build a mobile app' },
		{ title: 'Hike a mountain' },
		{ title: 'Practice a language' },
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

	const catSerach = eventList.filter((event) => {
		let push = false;
		if (categorySearch === '') {
			push = true;
		} else {
			for (let i = 0; i < event.categories.length; i++) {
				if (event.categories[i] === categorySearch) {
					push = true;
					break;
				}
			}
		}
		return push;
	});

	const desSearch = catSerach.filter((event) => {
		if (descriptionSearch === '') {
			return true;
		} else {
			return event.description
				.toLowerCase()
				.includes(descriptionSearch.toLowerCase());
		}
	});

	const searchResult = desSearch.filter((event) => {
		return event.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<Grid container direction='row' justify='center' alignItems='center'>
			<React.Fragment>
				<CssBaseline />
				<Container maxWidth='lg'>
					{/* {console.log(searchResult.length)} */}
					{/* <Header suggestions={suggestions} sections={sections} /> */}
					<div className='parent'>
						{searchResult.map((event) => {
							return (
								<Grid item key={event} xs={6} sm={6} md={6}>
									<Box m={1}>
										<Zoom in='true'>
											<ListItem
												activity={event}
												onRouteChange={onRouteChange}
												onActivityIDChange={
													onActivityIDChange
												}
												type={'event'}
											/>
										</Zoom>
									</Box>
								</Grid>
							);
						})}
					</div>
					{/* <img src={no_result} style={{width:'500px'}} /> */}

					{searchResult.length === 0 ? (
						<img
							src={no_result}
							style={{ width: '500px' }}
							alt=''
						/>
					) : null}
				</Container>
			</React.Fragment>
		</Grid>
	);
};

export default Community;
