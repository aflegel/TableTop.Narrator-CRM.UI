import { useReducer, useRef, useEffect, useCallback } from "react";
import { Reducer, InitialState } from "./Reducer";
import { HubConnection } from "@aspnet/signalr";
import { recieveAction } from "./Actions/Recieve";
import { transmitAction } from "./Actions/Transmit";

export const useSignalREndpoint = <TRecieve, TTransmit>(hubConnection: HubConnection, endpoint: string) => {
	const [message, dispatch] = useReducer(Reducer, InitialState);

	const connection = useRef(hubConnection);

	const listener = useCallback(data => dispatch(recieveAction<TRecieve>(data)), []);

	useEffect(() => connection.current.on(endpoint, listener), [listener]);

	const transmitAsync = async (payload: TTransmit): Promise<void> => {
		connection.current.send(endpoint, payload);
		dispatch(transmitAction(payload));
	}

	return [message, transmitAsync];
};