import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './MyCircle.css';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import no_result from './no_result.png';

//contains methods, theme and styles for componenets to render the my circle page, similar to the community page

const MyCircle = ({
	searchField,
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	userID,
	categorySearch,
	descriptionSearch,
}) => {
	const [roomList, setRoomList] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/mycircle', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: userID,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setRoomList(data);
					// this.props.onRouteChange('community');
				}
			});
	}, []);

	const catSerach = roomList.filter((event) => {           //handle category search
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

	const desSearch = catSerach.filter((event) => {        //handle description search
		if (descriptionSearch === '') {
			return true;
		} else {
			return event.description
				.toLowerCase()
				.includes(descriptionSearch.toLowerCase());
		}
	});

	const searchResult = desSearch.filter((event) => {              //filter the searched result and reurn an array
		return event.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (       //render the mycircle page
		
		<Grid container direction='row' justify='center' alignItems='center'>
			<React.Fragment>
				<CssBaseline />
				<Container maxWidth='lg'>
					{/* <Header suggestions={suggestions} sections={sections} /> */}
					<div className='parent'>
						{searchResult.map((room) => {
							return (
								<Grid item key={room._id} xs={6} sm={6} md={6}>
									<Box m={1}>
										<ListItem
											activity={room}
											onRouteChange={onRouteChange}
											onActivityIDChange={
												onActivityIDChange
											}
											type={'room'}
										/>
									</Box>
								</Grid>
							);
						})}
					</div>
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

export default MyCircle;
