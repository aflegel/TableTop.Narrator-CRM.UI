import { useReducer, useEffect, } from "react";
import { Reducer } from "./Reducer";
import { InitialState } from "./State";
import { decrementAction } from "./Actions/Decrement";
import { incrementAction } from "./Actions/Increment";
import { useSignalREndpoint } from "../SignalR/SignalREndpoint";
import { useSignalRConnection } from "../SignalR/SignalRConnection";

export const useCounter = (companyId: string) => {
	const [counter, dispatch] = useReducer(Reducer, InitialState);

	const callback = () => connection.current.send("Join", companyId);

	const { connection, connect } = useSignalRConnection("http://localhost:5100/encounter/sync", callback);

	useEffect(() => {
		if (connection.current.state !== "Connected")
			connect();
	}, [connection.current]);

	const increaseCallback = (payload: number) => { if (payload) dispatch(incrementAction(payload)); }
	const decreaseCallback = (payload: number) => { if (payload) dispatch(decrementAction(payload)); }

	const incrementAsync = useSignalREndpoint<number, number>(connection, "Increment", companyId, increaseCallback);
	const decrementAsync = useSignalREndpoint<number, number>(connection, "Decrement", companyId, decreaseCallback);

	return { counter, incrementAsync, decrementAsync };
};