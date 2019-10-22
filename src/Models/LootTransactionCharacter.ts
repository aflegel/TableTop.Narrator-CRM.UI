import { Loot } from "./Loot";
import { Transaction } from "./Transaction";
import { Character } from "./Character";

export interface LootTransactionCharacter {
	lootId: string;
	transactionId: string;
	characterId: string;

	quantity: number;

	loot?: Loot;
	transaction?: Transaction;
	character?: Character;
}