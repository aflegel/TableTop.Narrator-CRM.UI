export const MembershipAction = "Membership";
export type MembershipAction = typeof MembershipAction;

export interface Membership {
	type: MembershipAction;
	group: string;
}

export const membershipAction = (group: string): Membership => ({
	group: group,
	type: MembershipAction
});
