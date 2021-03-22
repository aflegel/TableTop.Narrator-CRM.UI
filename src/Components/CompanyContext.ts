import React from "react";
import { Company } from "../Models/Company";

export const CompanyContext = React.createContext<Company>({
	companyId: "",
	name: "",
	description: "",
	loots: [],
	characters: [],
	encounters: []
});
