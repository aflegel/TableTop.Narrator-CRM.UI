import { SignalState } from "./State";
import { Increment, IncrementAction } from "./Actions/Increment";
import { Decrement, DecrementAction } from "./Actions/Decrement";
import { Membership, MembershipAction } from "./Actions/Membership";

export type SignalStateActions = Increment | Decrement | Membership;

export const Reducer = (state: SignalState, action: SignalStateActions): SignalState => {

	switch (action.type) {
		case IncrementAction:
			return { ...state, isLoading: false, counter: state.counter + 1 };
		case DecrementAction:
			return { ...state, isLoading: false, counter: state.counter - 1 };
		case MembershipAction:
			return { ...state, group: action.group }
		default:
			return state;
	}
};