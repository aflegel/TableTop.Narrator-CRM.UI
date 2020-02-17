import { useReducer, useRef, useEffect, useCallback } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { Reducer } from "./Reducer";
import { InitialState } from "./State";
import { decrementAction } from "./Actions/Decrement";
import { incrementAction } from "./Actions/Increment";
import { useSignalREndpoint } from "../SignalR/SignalREndpoint";

export const useSignalState = (baseUrl: string, companyId: string) => {
	const [counter, dispatch] = useReducer(Reducer, InitialState);

	const connection = useRef(new HubConnectionBuilder().withUrl(baseUrl).build());

	const [increase, incrementAsync] = useSignalREndpoint<number, number>(connection, "Increment", companyId);
	const [decrease, decrementAsync] = useSignalREndpoint<number, number>(connection, "Decrement", companyId);

	const listener = useCallback((data: number, increase: boolean) => dispatch(increase ? incrementAction(data) : decrementAction(data)), [dispatch]);

	useEffect(() => { if (increase) listener(increase, true); }, [increase, listener]);
	useEffect(() => { if (decrease) listener(decrease, false); }, [decrease, listener]);

	return { counter, increase, decrease, incrementAsync, decrementAsync };
};