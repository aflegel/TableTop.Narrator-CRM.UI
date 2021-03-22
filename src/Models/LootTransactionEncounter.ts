import { Loot } from "./Loot";
import { Transaction } from "./Transaction";
import { Encounter } from "./Encounter";

export interface LootTransactionEncounter {
	lootId: string;
	transactionId: string;
	encounterId: string;

	quantity: number;

	loot?: Loot;
	transaction?: Transaction;
	encounter?: Encounter;
}