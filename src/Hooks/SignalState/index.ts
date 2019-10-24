import { useReducer, useRef, useEffect, useCallback } from "react";
import { Reducer } from "./Reducer";
import { InitialState } from "./State";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { incrementAction, decrementAction, membershipAction } from "./Actions";

export const useSignalState = () => {
	const [counter, dispatch] = useReducer(Reducer, InitialState);

	const connection = useRef(new HubConnectionBuilder().withUrl("http://localhost:5000/encounter/sync").build());

	if (connection.current.state !== "Connected")
		connection.current.start();

	const memberListener = useCallback(data => {
		console.log(data);
	}, []);

	useEffect(() => {
		connection.current.on("JoinGroup", memberListener);
		connection.current.on("LeftGroup", memberListener);
	}, [memberListener]);

	const incrementListener = useCallback(data => {
		dispatch(incrementAction());
	}, []);

	useEffect(() => {
		connection.current.on("IncrementCounter", incrementListener);
	}, [incrementListener]);

	const decrementListener = useCallback(data => {
		dispatch(decrementAction());
	}, []);

	useEffect(() => {
		connection.current.on("DecrementCounter", decrementListener);
	}, [decrementListener]);

	const incrementAsync = async (): Promise<void> => {
		if (connection.current.state !== "Connected")
			await connection.current.start();

		connection.current.send("IncrementCounter", counter.group);

		dispatch(incrementAction());
	}

	const decrementAsync = async (): Promise<void> => {
		if (connection.current.state !== "Connected")
			await connection.current.start();

		connection.current.send("DecrementCounter", counter.group);

		dispatch(decrementAction());
	}

	const joinAsync = async (group: string): Promise<void> => {
		if (connection.current.state !== "Connected")
			await connection.current.start();

		connection.current.send("JoinGroup", group);

		dispatch(membershipAction(group));
	}

	const leaveAsync = async (group: string): Promise<void> => {
		if (connection.current.state !== "Connected")
			await connection.current.start();

		connection.current.send("LeaveGroup", group);

		dispatch(membershipAction(""));
	}

	return { counter, incrementAsync, decrementAsync, joinAsync, leaveAsync };
};