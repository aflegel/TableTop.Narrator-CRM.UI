import React from 'react';
import { BrowserRouter, Link, Route, useRouteMatch } from 'react-router-dom';
import CompanyComponent from './Company';

const Transaction: React.FC = () => (<div>Transaction</div>);

export const trimUrl = (url: string): string => {
	const fixedPath = url.endsWith('/')
		? trimUrl(url.substring(0, url.length - 1))
		: url;

	return fixedPath;
};

const CompanyHome: React.FC = () => {
	const match = useRouteMatch();
	const trimmedUrl = trimUrl(match.url);

	return (<BrowserRouter>
		<div>Company Home</div>

		<Link to={`${trimmedUrl}/transaction/`}>transactions</Link><br />
		<Link to={`${trimmedUrl}/card/`}>card</Link><br />

		<Route path={`${trimmedUrl}}/transaction/`} exact component={Transaction} />
		<Route path={`${trimmedUrl}/card/`} exact component={CompanyComponent} />
	</BrowserRouter>
	);
};

export default CompanyHome;
