import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

//contains methods, theme and styles for componenets to render the suggested contents

const useStyles = makeStyles((theme) => ({        //custom material-ui style
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
}));

const theme = createMuiTheme({               //custom material-ui theme
	palette: {
		primary: {
			main: '#ffffff',
			mainGradient: 'linear-gradient(to right, orange, #9c27b0)',
			contrastText: '#fff',
		},
		secondary: {
			main: '#007bd3',
		},
	},
	typography: {
		button: {
			//textTransform: 'none',
		},
	},
});

export default function Header(props) {           //redner the web header with various buttons
	const classes = useStyles();
	const {
		searchChange,
		sections,
		suggestions,
		onRouteChange,
		onCategorySearch,
		onDescriptionSearch,
		
	} = props;

	const [categoryFocused, setCategoryFocused] = React.useState('');
	// let categoryFocused = '';
	const pressCategory = (category) => {
		// console.log(categoryFocused);
		if (categoryFocused === category){
			setCategoryFocused('');
			onCategorySearch('');
		} else {
			setCategoryFocused(category);
			onCategorySearch(category);
		}
		// onCategorySearch(categoryFocused);
		// console.log(categoryFocused);
	}

	const [descriptionFocused, setDescriptionFocused] = React.useState('');
	// let categoryFocused = '';
	const pressDescription = (description) => {
		// console.log(categoryFocused);
		if (descriptionFocused === description){
			setDescriptionFocused('');
			onDescriptionSearch('');
		} else {
			setDescriptionFocused(description);
			onDescriptionSearch(description);
		}
		// onCategorySearch(categoryFocused);
		// console.log(categoryFocused);
	}

	return (
		<React.Fragment>
			<MuiThemeProvider theme={theme}>
				{/* <Divider variant="middle" /> */}
				<Toolbar
					component='nav'
					variant='dense'
					className={classes.toolbarSecondary}
				>
					{/* <Button size="small">Subscribe</Button> */}
					{suggestions.map((suggestion) => (
												
						// <Button
						// 	variant='outlined'
						// 	color='secondary'
						// 	onClick={() => {
						// 		categoryFocused = suggestion.title;
						// 		onDescriptionSearch(categoryFocused);
						// 	}}
						// >
						// 	{suggestion.title}
						// </Button>

						<div>
						{suggestion.title === descriptionFocused ? (
							<Button
								variant='contained'
								color='secondary'
								onClick={() => {
									pressDescription(suggestion.title);
									
								}}
							>
								{suggestion.title}
							</Button>
						) : <Button
								variant='outlined'
								color='secondary'
								onClick={() => {
									pressDescription(suggestion.title);
									
								}}
							>
								{suggestion.title}
							</Button>}
						</div>

						
						
					))}
					{/* <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button> */}
				</Toolbar>
				<Divider variant='middle' />
				<Toolbar
					component='nav'
					variant='dense'
					className={classes.toolbarSecondary}
				>
					{sections.map((section) => (
						
						// <Button
						// 	color='inherit'
						// 	onClick={() => {
						// 		onCategorySearch(section);
						// 	}}
						// >
						// 	{section}
						// </Button>

						<div>
							{section === categoryFocused ? (
								<Button
									
									color='secondary'
									onClick={() => {
										pressCategory(section);
										
									}}
								>
									{section}
								</Button>
							) : <Button									
									color='inherit'
									onClick={() => {
										pressCategory(section);
										
									}}
								>
									{section}
								</Button>}

						</div>
					))}
				</Toolbar>
			</MuiThemeProvider>
		</React.Fragment>
	);
}

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string,
};
