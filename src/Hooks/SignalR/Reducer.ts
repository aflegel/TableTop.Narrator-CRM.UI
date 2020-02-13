import { Transmit, TransmitAction } from "./Actions/Transmit";
import { Recieve, RecieveAction } from "./Actions/Recieve";

export interface SignalState {
	isLoading: boolean;
}

export const InitialState: SignalState = {
	isLoading: true,
};

export type SignalStateActions<T> = Recieve<T> | Transmit<T>;

export const Reducer = <T>(state: SignalState, action: SignalStateActions<T>): SignalState => {

	switch (action.type) {
		case TransmitAction:
			return { ...state, isLoading: false, };
		case RecieveAction:
			return { ...state, isLoading: false, };
		default:
			return state;
	}
};