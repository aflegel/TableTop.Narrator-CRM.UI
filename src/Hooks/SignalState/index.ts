import { useReducer, useRef, useEffect, useCallback } from "react";
import { Reducer } from "./Reducer";
import { InitialState } from "./State";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { decrementAction } from "./Actions/Decrement";
import { useSignalREndpoint } from "../SignalR/Hook";

export const useSignalState = (baseUrl: string) => {
	const [counter, dispatch] = useReducer(Reducer, InitialState);

	const connection = useRef(new HubConnectionBuilder().withUrl(`${baseUrl}/sync`).build());

	const [one, joinAsync] = useSignalREndpoint<number, number>(connection.current, "JoinGroup");
	const [two, leaveAsync] = useSignalREndpoint<number, number>(connection.current, "LeaveGroup");

	const companyId = "83F023E9-B743-4525-97B8-D6C5341302FD";

	const startConnection = async () => {
		await connection.current.start();

		await connection.current.send("Join", companyId);
	}


	const incrementListener = useCallback(data => {
		console.log(data);
	}, []);

	useEffect(() => {
		connection.current.on("Sync", incrementListener);
	}, [incrementListener]);

	const decrementListener = useCallback(() => {
		dispatch(decrementAction());
	}, []);

	useEffect(() => {
		connection.current.on("DecrementCounter", decrementListener);
	}, [decrementListener]);


	const timeListener = useCallback(data => {
		console.log(data);

	}, []);

	useEffect(() => {
		connection.current.on("Time", timeListener);
	}, [timeListener]);

	const incrementAsync = async (): Promise<void> => {
		if (connection.current.state !== "Connected")
			await startConnection();

		connection.current.send("Update", "83F023E9-B743-4525-97B8-D6C5341302FD");
	}

	const decrementAsync = async (): Promise<void> => {
		if (connection.current.state !== "Connected")
			await startConnection();

		connection.current.send("DecrementCounter", counter.group);
	}

	return { counter, incrementAsync, decrementAsync, joinAsync, leaveAsync };
};