
export interface SignalState {
	isLoading: boolean;
	counter: number;
	group: string;
}

export const InitialState: SignalState = {
	isLoading: true,
	group: "",
	counter: 0
};