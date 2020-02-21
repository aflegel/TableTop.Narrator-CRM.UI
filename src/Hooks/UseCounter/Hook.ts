import { useReducer, useRef } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { Reducer } from "./Reducer";
import { InitialState } from "./State";
import { decrementAction } from "./Actions/Decrement";
import { incrementAction } from "./Actions/Increment";
import { useSignalREndpoint } from "../SignalR/SignalREndpoint";

export const useCounter = (baseUrl: string, companyId: string) => {
	const [counter, dispatch] = useReducer(Reducer, InitialState);

	const connection = useRef(new HubConnectionBuilder().withUrl(baseUrl).build());

	const increaseCallback = (payload: number) => { if (payload) dispatch(incrementAction(payload)); }
	const decreaseCallback = (payload: number) => { if (payload) dispatch(decrementAction(payload)); }

	const incrementAsync = useSignalREndpoint<number, number>(connection, "Increment", companyId, increaseCallback);
	const decrementAsync = useSignalREndpoint<number, number>(connection, "Decrement", companyId, decreaseCallback);

	return { counter, incrementAsync, decrementAsync };
};