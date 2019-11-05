
export const DecrementAction = "Decrement";
export type DecrementAction = typeof DecrementAction;

export interface Decrement {
	type: DecrementAction;
}

export const decrementAction = (): Decrement => ({
	type: DecrementAction
});
