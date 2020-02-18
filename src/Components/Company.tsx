import React from 'react';
import { BrowserRouter, Link, Route, useRouteMatch } from 'react-router-dom';
import { Counter } from './Counter';
import { CompanyContext } from "./CompanyContext";
import { Company } from '../Models/Company';
import { trimUrl } from "../Utilities/UrlUtilities";

const Transaction: React.FC = () => (<div>Transaction</div>);

interface IdRoute {
	id: string;
}

export const CompanyHome: React.FC = () => {
	const match = useRouteMatch<IdRoute>("/company/:id/");
	const id = match ? match.params.id || "" : "";
	const trimmedUrl = trimUrl(match ? match.url : "");

	//todo: pull from api
	const company: Company = {
		companyId: id,
		name: "I made this up",
		description: "",
		loots: [],
		characters: [],
		encounters: []
	};

	return (<BrowserRouter>
		<CompanyContext.Provider value={company}>
			<div>Company Home</div>

			<Link to={`${trimmedUrl}/transaction/`}>transactions</Link><br />
			<Link to={`${trimmedUrl}/card/`}>card</Link><br />

			<Route path={`${trimmedUrl}}/transaction/`} exact component={Transaction} />
			<Route path={`${trimmedUrl}/card/`} exact component={Counter} />
		</CompanyContext.Provider>
	</BrowserRouter>
	);
};
