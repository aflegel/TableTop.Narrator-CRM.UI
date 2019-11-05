
export const IncrementAction = "Increment";
export type IncrementAction = typeof IncrementAction;

export interface Increment {
	type: IncrementAction;
}

export const incrementAction = (): Increment => ({
	type: IncrementAction
});
