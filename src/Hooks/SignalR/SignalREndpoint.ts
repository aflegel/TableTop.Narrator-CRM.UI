import { useEffect, useCallback, useState } from "react";
import { HubConnection } from "@aspnet/signalr";

export const useSignalREndpoint = <TRecieve, TTransmit>(connection: React.MutableRefObject<HubConnection>, endpoint: string, companyId: string, initial: TRecieve): [TRecieve, (payload: TTransmit) => Promise<void>] => {

	const [message, setMessage] = useState<TRecieve>(initial);

	const listener = useCallback(data => {
		// eslint-disable-next-line no-undef
		console.log(endpoint, data);
		setMessage(data);
	}, [endpoint, setMessage]);

	const startConnection = async (companyId: string) => {
		await connection.current.start();

		await connection.current.send("Join", companyId);
	};

	useEffect(() => connection.current.on(endpoint, listener), [connection, endpoint, listener]);

	const transmit = async (payload: TTransmit): Promise<void> => {
		if (connection.current.state !== "Connected")
			await startConnection(companyId);
		connection.current.send(endpoint, companyId, payload);
	};

	return [message, transmit];
};