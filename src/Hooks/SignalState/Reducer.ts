import { SignalState } from "./State";
import { SignalStateActions, IncrementAction, DecrementAction, MembershipAction } from "./Actions";

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