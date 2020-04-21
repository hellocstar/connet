import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '80%',
		},
	},
}));

const Search = ({ searchChange }) => {
	const classes = useStyles();
	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<div>
				<TextField
					id='filled-search'
					label='Search for activities......'
					type='search'
					variant='outlined'
					type='search'
					placeholder='Explore here'
					onChange={searchChange}
				/>
			</div>
		</form>
	);
};

export default Search;
