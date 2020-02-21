
export const DecrementAction = "Decrement";
export type DecrementAction = typeof DecrementAction;

export interface Decrement {
	type: DecrementAction;
	value: number;
}

export const decrementAction = (value: number): Decrement => ({
	type: DecrementAction,
	value
});
