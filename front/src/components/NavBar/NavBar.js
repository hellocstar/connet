import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from "@material-ui/core/colors/amber";
import pink from "@material-ui/core/colors/pink";
import Button from '@material-ui/core/Button';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
		main : '#ffffff',
		mainGradient: "linear-gradient(to right, orange, #9c27b0)",
		contrastText: '#fff',
	},
    secondary: {
      main: "#e91e63"
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

const useStyles = makeStyles(theme => ({
  button: {
	margin: theme.spacing(1),
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  
}));

const BootstrapButton = withStyles({
	root: {
	  boxShadow:'none',
	  textTransform: 'none',
	  fontSize: 16,	
	  background: 'orange',  
	  fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	  ].join(','),	  
	  '&:hover': {
		backgroundColor: 'orange',
		
		boxShadow: 'none',
	  },
	  '&:active': {
		boxShadow: 'none',
		backgroundColor: 'orange',
		
	  },
	  
	},
  })(Button);

// // function topButton(){
// // 	return {className={classes.button} color="primary" size="small"};
// // }

// const topButtonProp = {className={classes.button} color="primary" size="small"};
function PrimarySearchAppBar({ onRouteChange, isSignedIn }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
	const handleProfileMenuOpen = event => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handleMobileMenuClose = () => {
	  setMobileMoreAnchorEl(null);
	};
  
	const handleMenuClose = () => {
	  setAnchorEl(null);
	  handleMobileMenuClose();
	};
  
	const handleMobileMenuOpen = event => {
	  setMobileMoreAnchorEl(event.currentTarget);
	};
  
	const menuId = "primary-search-account-menu";
	const renderMenu = (
	  <Menu
		anchorEl={anchorEl}
		anchorOrigin={{ vertical: "top", horizontal: "right" }}
		id={menuId}
		keepMounted
		transformOrigin={{ vertical: "top", horizontal: "right" }}
		open={isMenuOpen}
		onClose={handleMenuClose}
	  >
		<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
		<MenuItem onClick={handleMenuClose}>My account</MenuItem>
	  </Menu>
	);
  
	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
	  <Menu
		anchorEl={mobileMoreAnchorEl}
		anchorOrigin={{ vertical: "top", horizontal: "right" }}
		id={mobileMenuId}
		keepMounted
		transformOrigin={{ vertical: "top", horizontal: "right" }}
		open={isMobileMenuOpen}
		onClose={handleMobileMenuClose}
	  >
		<MenuItem>
		  <IconButton aria-label="show 4 new mails" color="inherit">
			<Badge badgeContent={4} color="secondary">
			  <MailIcon />
			</Badge>
		  </IconButton>
		  <p>Messages</p>
		</MenuItem>
		<MenuItem>
		  <IconButton aria-label="show 11 new notifications" color="inherit">
			<Badge badgeContent={11} color="secondary">
			  <NotificationsIcon />
			</Badge>
		  </IconButton>
		  <p>Notifications</p>
		</MenuItem>
		<MenuItem onClick={handleProfileMenuOpen}>
		  <IconButton
			aria-label="account of current user"
			aria-controls="primary-search-account-menu"
			aria-haspopup="true"
			color="inherit"
		  >
			<AccountCircle />
		  </IconButton>
		  <p>Profile</p>
		</MenuItem>
	  </Menu>
	);

	
  
	return (
	  
	  <div className={classes.grow}>
		<MuiThemeProvider theme={theme}>
		<AppBar position="static" style={{ background: theme.palette.primary.mainGradient }}>
		  <Toolbar>
			<IconButton
			  edge="start"
			  className={classes.menuButton}
			  color="inherit"
			  aria-label="open drawer"
			>
			  <MenuIcon />
			</IconButton>
			<BootstrapButton variant="contained" color="primary" onClick={() => onRouteChange('about')}> 
        			ConNET
      		</BootstrapButton>
			<div className={classes.search}>
			  <div className={classes.searchIcon}>
				<SearchIcon />
			  </div>
			  <InputBase
				placeholder="Search for events…"
				classes={{
				  root: classes.inputRoot,
				  input: classes.inputInput
				}}
				inputProps={{ "aria-label": "search" }}
			  />
			</div>
			<div className={classes.grow} />
			<div className={classes.sectionDesktop}>
			<Button variant="outlined" className={classes.button} color="primary" size="small" onClick={() => onRouteChange('about')}>About</Button>
			<Button variant="outlined" className={classes.button} color="primary" size="small" onClick={() => onRouteChange('mycircle')}>My Circle</Button>
			<Button variant="outlined" className={classes.button} color="primary" size="small" onClick={() => onRouteChange('community')}>Community</Button>
			<Button variant="outlined" className={classes.button} color="primary" size="small" onClick={() => onRouteChange('signin')}>Sign in</Button>
			<Button variant="outlined" className={classes.button} color="primary" size="small" onClick={() => onRouteChange('signup')}>Sign up</Button>
			</div>
			<div className={classes.sectionMobile}>
			  <IconButton
				aria-label="show more"
				aria-controls={mobileMenuId}
				aria-haspopup="true"
				onClick={handleMobileMenuOpen}
				color="inherit"
			  >
				<MoreIcon />
			  </IconButton>
			</div>
		  </Toolbar>
		</AppBar>
		
		{renderMobileMenu}
		{renderMenu}
		</MuiThemeProvider>
	  </div>
	  
	);
}


const NavBar = ({ onRouteChange, isSignedIn }) => {
	//const bar = <PrimarySearchAppBar onRouteChange={onRouteChange} isSignedIn={isSignedIn} />;
	if (isSignedIn) {
		//PrimarySearchAppBar({ onRouteChange, isSignedIn });
		//<PrimarySearchAppBar {...this.prop}/>
		//Welcome("sara");
		return <PrimarySearchAppBar onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
	} else {
		//<PrimarySearchAppBar {...this.prop}/>
		return <PrimarySearchAppBar onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
	}
};

export default NavBar;
