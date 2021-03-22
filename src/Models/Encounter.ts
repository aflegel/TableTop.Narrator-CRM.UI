import { CharacterEncounter } from "./CharacterEncounter";
import { LootTransactionEncounter } from "./LootTransactionEncounter";

export interface Encounter {
	encounterId: string;
	companyId: string;

	name: string;
	description: string;

	characterEncounters: CharacterEncounter[];
	lootTransactionEncounters: LootTransactionEncounter[];
}