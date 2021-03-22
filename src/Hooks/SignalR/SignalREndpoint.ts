import { useEffect, useCallback, useRef } from "react";
import { HubConnection } from "@microsoft/signalr";

export const useSignalREndpoint = <TRecieve, TTransmit>(connection: React.MutableRefObject<HubConnection>, endpoint: string, companyId: string, callback?: (payload: TRecieve) => void): (payload: TTransmit) => Promise<void> => {
	const internalCallback = useRef(callback);

	const listener = useCallback(data => {
		// eslint-disable-next-line no-undef
		console.log(endpoint, data);

		if (internalCallback.current) internalCallback.current(data);
	}, [endpoint, internalCallback]);

	//todo: move this logic into a separate hook
	const startConnection = async (companyId: string) => {
		await connection.current.start();

		await connection.current.send("Join", companyId);
	};


	useEffect(() => {
		connection.current.on(endpoint, listener)

		return () => connection.current.off(endpoint);
	}, [connection, endpoint, listener]);

	const transmit = async (payload: TTransmit): Promise<void> => {
		if (connection.current.state !== "Connected")
			await startConnection(companyId);
		connection.current.send(endpoint, companyId, payload);
	};


	return transmit;
};