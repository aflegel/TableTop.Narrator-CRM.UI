import React from 'react';
import CompanyHome from "./Components/CompanyHome"
import { Switch, BrowserRouter, Link, Route } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography, Button, } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

const Index: React.FC = () => <h2>Home</h2>;

const CompanyIndexComponent: React.FC = () =>
	(<div>Company index page<Link to="/company/83F023E9-B743-4525-97B8-D6C5341302FD/">Named Company GUID</Link></div>);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	}),
);

const App: React.FC = () => {
	const classes = useStyles();
	const [state, setState] = React.useState(false);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
			return;
		}

		setState(open);
	};

	return (
		<BrowserRouter>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>Narrator</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth="xl">
				<Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
					<Switch>
						<Route path="/" exact component={Index} />
						<Route path="/company/" exact component={CompanyIndexComponent} />
						<Route path="/company/:id/" component={CompanyHome} />
					</Switch>
				</Typography>
				<Drawer open={state} onClose={toggleDrawer(false)}>
					<List>
						<ListItem button component={Link} to="/" key="Home" onClick={toggleDrawer(false)}>
							<ListItemText primary="Home" />
						</ListItem>
						<ListItem button component={Link} to="/company/" key="Companies" onClick={toggleDrawer(false)}>
							<ListItemText primary="Companies" />
						</ListItem>
					</List>
				</Drawer>
			</Container>
		</BrowserRouter>);
}

export default App;
