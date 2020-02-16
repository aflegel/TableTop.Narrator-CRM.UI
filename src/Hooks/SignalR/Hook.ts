import { useRef, useEffect, useCallback, useState } from "react";
import { HubConnection } from "@aspnet/signalr";

export const useSignalREndpoint = <TRecieve, TTransmit>(hubConnection: HubConnection, endpoint: string):
	[TRecieve | undefined, (payload: TTransmit) => void] => {

	const [message, dispatch] = useState<TRecieve>();

	const connection = useRef(hubConnection);

	const listener = useCallback(data => dispatch(data), []);

	useEffect(() => connection.current.on(endpoint, listener), [endpoint, listener]);

	const transmit = (payload: TTransmit): void => {
		connection.current.send(endpoint, payload);
	};

	return [message, transmit];
};