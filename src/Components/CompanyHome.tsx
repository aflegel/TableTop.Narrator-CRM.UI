import React from 'react';
import { BrowserRouter, Link, Route, useRouteMatch } from 'react-router-dom';
import CompanyComponent from './Company';

const Transaction: React.FC = () => {
	return (<div>Transaction</div>);
}

const CompanyHome: React.FC = () => {
	const match = useRouteMatch();

	return (<BrowserRouter>
		<div>Company Home</div>

		<Link to={`${match.url}transaction/`}>transactions</Link><br />
		<Link to={`${match.url}card/`}>card</Link><br />

		<Route path={`${match.url}transaction/`} exact component={Transaction} />
		<Route path={`${match.url}card/`} exact component={CompanyComponent} />
	</BrowserRouter>
	);
}

export default CompanyHome;
