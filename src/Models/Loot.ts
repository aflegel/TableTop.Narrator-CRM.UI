import { LootTransactionCharacter } from "./LootTransactionCharacter";
import { LootTransactionEncounter } from "./LootTransactionEncounter";

export interface Loot {
	lootId: string;

	name: string;
	description: string;
	value: number;

	lootTransactionCharacters: LootTransactionCharacter[];
	lootTransactionEncounters: LootTransactionEncounter[];
}