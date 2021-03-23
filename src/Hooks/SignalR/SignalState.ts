import { useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useSignalREndpoint } from "./SignalREndpoint";

export interface SignalState {
	counter: number;
	group: string;
}

export const InitialState: SignalState = {
	group: "",
	counter: 0,
};

export const useSignalState = (baseUrl: string, companyId: string) => {
	const [counter, setCounter] = useState<SignalState>({
		counter: 0,
		group: companyId,
	});

	const connection = useRef(
		new HubConnectionBuilder().withUrl(baseUrl).build()
	);

	const incrementAsync = useSignalREndpoint<number, number>(
		connection,
		"Increment",
		companyId,
		(data) =>
			setCounter({
				...counter,
				counter: counter.counter + data,
			})
	);
	const decrementAsync = useSignalREndpoint<number, number>(
		connection,
		"Decrement",
		companyId,
		(data) =>
			setCounter({
				...counter,
				counter: counter.counter - data,
			})
	);

	return { counter, incrementAsync, decrementAsync };
};
