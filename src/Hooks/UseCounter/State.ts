
export interface SignalState {
	isLoading: boolean;
	counter: number;
	change: number;
}

export const InitialState: SignalState = {
	isLoading: true,
	counter: 0,
	change: 0
};