import React from 'react';
import CompanyHome from "./Components/CompanyHome"
import { Switch, BrowserRouter, Link, Route } from 'react-router-dom';


const Index: React.FC = () => {
	return <h2>Home</h2>;
}


const CompanyIndexComponent: React.FC = () => {

	return (<div>Company index page</div>
	);
}

const App: React.FC = () => {

	return (<BrowserRouter><div>Test App</div>
		<Link to="/">Home</Link><br />

		<Link to="/company/">Company Index</Link><br />
		<Link to="/83F023E9-B743-4525-97B8-D6C5341302FD/">Named Company GUID</Link><br />
		<Switch>
			<Route path="/" exact component={Index} />
			<Route path="/company/" exact component={CompanyIndexComponent} />
			<Route path="/:id/" exact component={CompanyHome} />
		</Switch>

	</BrowserRouter>);
}

export default App;
