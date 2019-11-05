import { Character } from "./Character";
import { Encounter } from "./Encounter";

export interface CharacterEncounter {
	characterId: string;
	encounterId: string;

	shares: number;

	character?: Character;
	encounter?: Encounter;
}