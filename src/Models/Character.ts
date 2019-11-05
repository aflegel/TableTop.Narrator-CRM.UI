import { CharacterEncounter } from "./CharacterEncounter";
import { LootTransactionCharacter } from "./LootTransactionCharacter";

export interface Character {
	characterId: string;
	companyId: string;

	name: string;
	description: string;

	characterEncounters: CharacterEncounter[];
	lootTransactionCharacter: LootTransactionCharacter[]
}