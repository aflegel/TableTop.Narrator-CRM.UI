import { Character } from "./Character";
import { Encounter } from "./Encounter";
import { Loot } from "./Loot";

export interface Company {
	companyId: string;

	name: string;
	description: string;

	characters: Character[];
	encounters: Encounter[];
	loots: Loot[];
}