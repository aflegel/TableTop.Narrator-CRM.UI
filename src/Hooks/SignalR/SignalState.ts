import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import { HubConnectionBuilder } from "@aspnet/signalr";
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

  const [increase, incrementAsync] = useSignalREndpoint<number, number>(
    connection,
    "Increment",
    companyId,
    0
  );
  const [decrease, decrementAsync] = useSignalREndpoint<number, number>(
    connection,
    "Decrement",
    companyId,
    0
  );

  const listener = useCallback(
    (data: number, increase: boolean) =>
      setCounter({
        ...counter,
        counter: increase ? counter.counter + data : counter.counter - data,
      }),
    [setCounter]
  );

  useEffect(() => {
    if (increase) listener(increase, true);
  }, [increase, listener]);
  useEffect(() => {
    if (decrease) listener(decrease, false);
  }, [decrease, listener]);

  return { counter, increase, decrease, incrementAsync, decrementAsync };
};
