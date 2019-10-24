import { Increment, IncrementAction } from "./Increment";
import { Decrement, DecrementAction } from "./Decrement";
import { Membership, MembershipAction } from "./Membership";

export * from "./Decrement";
export * from "./Increment";
export * from "./Membership";

export type SignalStateActions = Increment | Decrement | Membership;

// Action creators
export const incrementAction = (): Increment => ({
	type: IncrementAction
});

export const decrementAction = (): Decrement => ({
	type: DecrementAction
});

export const membershipAction = (group: string): Membership => ({
	group: group,
	type: MembershipAction
});