
export const TransmitAction = "Transmit";
export type TransmitAction = typeof TransmitAction;

export interface Transmit<T> {
	type: TransmitAction;
	payload: T
}

export const transmitAction = <T>(payload: T): Transmit<T> => ({
	type: TransmitAction,
	payload: payload
});
