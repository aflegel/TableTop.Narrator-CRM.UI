import { SignalState } from "./State";
import { Increment, IncrementAction } from "./Actions/Increment";
import { Decrement, DecrementAction } from "./Actions/Decrement";

export type SignalStateActions = Increment | Decrement;

export const Reducer = (state: SignalState, action: SignalStateActions): SignalState => {

	switch (action.type) {
		case IncrementAction:
			return { ...state, isLoading: false, counter: state.counter + action.value };
		case DecrementAction:
			return { ...state, isLoading: false, counter: state.counter - action.value };
		default:
			return state;
	}
};