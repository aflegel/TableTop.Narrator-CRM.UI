
export const RecieveAction = "Recieve";
export type RecieveAction = typeof RecieveAction;

export interface Recieve<T> {
	type: RecieveAction;
	payload: T;
}

export const recieveAction = <T>(payload: T): Recieve<T> => ({
	type: RecieveAction,
	payload: payload
});
