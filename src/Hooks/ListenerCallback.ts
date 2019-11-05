import { useEffect, useCallback } from "react";
import { HubConnection } from "@aspnet/signalr";

export const useListenerCallback = (eventName: string, connection: React.MutableRefObject<HubConnection>, callback: Function) => {

	const listener = useCallback(data => {
		callback()
	}, [callback]);

	useEffect(() => {
		connection.current.on(eventName, listener);
	}, [connection, eventName, listener]);
};