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

//contains methods, theme and styles for componenets to render the community page

const useStyles = makeStyles((theme) => ({
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

const theme = createMuiTheme({
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

export default function Header(props) {
  const classes = useStyles();
  const { sections, suggestions } = props;

  return (
    <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <Divider variant="middle" />
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {/* <Button size="small">Subscribe</Button> */}
        {suggestions.map((suggestions) => (
          <Button variant="outlined" color='secondary'>
            {suggestions.title}
          </Button>
        ))}
        {/* <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button> */}
      </Toolbar>
      <Divider variant="middle" />
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          // <Link
          //   color="inherit"
          //   noWrap
          //   key={section.title}
          //   variant="body2"
          //   href={section.url}
          //   className={classes.toolbarLink}
          // >
          //   {section.title}
          // </Link>
          <Button color='inherit'>
          {section.title}
          </Button>
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