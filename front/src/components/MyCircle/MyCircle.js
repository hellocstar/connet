import React, { useState, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import './MyCircle.css';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const MyCircle = ({
	searchField,
	onRouteChange,
	onActivityIDChange,
	isSignedIn,
	userID,
	categorySearch,
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

	const catSerach = roomList.filter((event) => {
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

	const searchResult = catSerach.filter((event) => {
		return event.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		// <div className='parent'>
		// 	{filtered.map((room) => {
		// 		return (
		// 			<div className='child' key={room._id}>
		// 				<ListItem
		// 					activity={room}
		// 					onRouteChange={onRouteChange}
		// 					onActivityIDChange={onActivityIDChange}
		// 					type={'room'}
		// 				/>
		// 			</div>
		// 		);
		// 	})}
		// </div>
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
				</Container>
			</React.Fragment>
		</Grid>
	);
};

export default MyCircle;
