import { useEffect, useCallback, useRef } from "react";
import { HubConnection } from "@aspnet/signalr";

export const useSignalREndpoint = <TRecieve, TTransmit>(connection: React.MutableRefObject<HubConnection>, endpoint: string, companyId: string, callback?: (payload: TRecieve) => void): (payload: TTransmit) => Promise<void> => {
	const internalCallback = useRef(callback);

	const listener = useCallback(data => {
		// eslint-disable-next-line no-undef
		console.log(endpoint, data);
		if (internalCallback.current) internalCallback.current(data);
	}, [endpoint, internalCallback]);

	useEffect(() => {
		connection.current.on(endpoint, listener)

		return () => connection.current.off(endpoint);
	}, [connection, endpoint, listener]);

	const transmit = async (payload: TTransmit): Promise<void> => {
		if (connection.current.state === "Connected")
			connection.current.send(endpoint, companyId, payload);
		else
			console.log("SignalR connection is not ready");
	};

	return transmit;
};