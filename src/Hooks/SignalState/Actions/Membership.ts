
export const MembershipAction = "Membership";
export type MembershipAction = typeof MembershipAction;

export interface Membership {
	type: MembershipAction;
	group: string;
}
