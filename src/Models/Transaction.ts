import { LootTransactionCharacter } from "./LootTransactionCharacter";
import { LootTransactionEncounter } from "./LootTransactionEncounter";

export interface Transaction {
	transactionId: string;

	lootTransactionCharacters: LootTransactionCharacter[];
	lootTransactionEncounters: LootTransactionEncounter[];
}