
export const IncrementAction = "Increment";
export type IncrementAction = typeof IncrementAction;

export interface Increment {
	type: IncrementAction;
	value: number;
}

export const incrementAction = (value: number): Increment => ({
	type: IncrementAction,
	value
});
