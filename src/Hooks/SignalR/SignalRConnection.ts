import { useRef, useEffect, useState, useCallback } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";

export type SignalRStatus = "Connected" | "Connecting" | "Disconnected" | "Disconnecting" | "Reconnecting";

export const useSignalRConnection = (baseUrl: string, onConnect?: () => void, onDisconnect?: () => void) => {

	const connection = useRef(new HubConnectionBuilder().withUrl(baseUrl).build());
	const [state, setState] = useState<SignalRStatus>("Disconnected");

	useEffect(() => setState(connection.current.state), [connection.current.state]);

	const onConnectInternal = useRef(onConnect);
	const onDisConnectInternal = useRef(onDisconnect);

	const connect = async () => {
		try {
			await connection.current.start();
			if (onConnectInternal.current) onConnectInternal.current();
		} catch (exception) {
			console.log(exception);
		}
	};

	const disconnect = async () => {
		try {
			await connection.current.stop();
			if (onDisConnectInternal.current) onDisConnectInternal.current();
		} catch (exception) {
			console.log(exception);
		}
	};

	const logListener = useCallback(data => console.log("Connection Hook", data), []);	

	useEffect(() => connection.current.onreconnecting(logListener), [logListener]);
	useEffect(() => connection.current.onreconnected(logListener), [logListener]);
	useEffect(() => connection.current.onclose(logListener), [logListener]);

	return { connection, state, connect, disconnect };
}