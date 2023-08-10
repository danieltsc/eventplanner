import React, { useContext, useReducer } from "react";

export enum EventActionType {
  UPDATE_EVENTS,
  DELETE_EVENT,
}
export interface IEventAction {
  type: EventActionType;
  payload?: any;
}

export enum Categories {
  CODING = "Coding",
  SOCIAL = "Social",
}

export interface Event {
  id: number;
  title: string;
  imageURL: string;
  startDate: string;
  isSubscribed?: boolean;
  category: Categories;
  owner: string;
}

export interface IEventState {
  events: Event[];
  nextEvent: Event | undefined;
}

const initialState: IEventState = {
  events: [],
  nextEvent: undefined,
};

const reducer = (state: IEventState, action: IEventAction): IEventState => {
  const payload = action.payload;
  console.info(action);

  switch (action.type) {
    case EventActionType.UPDATE_EVENTS: {
      const userNextEvent = payload.find(
        (event: Event) => event.isSubscribed
      );
      return {
        ...state,
        events: payload,
        nextEvent: userNextEvent
      };
    }
    case EventActionType.DELETE_EVENT: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export interface IEventContext {
  state: IEventState;
  dispatch: React.Dispatch<IEventAction>;
}
const Context = React.createContext<any>({});
Context.displayName = "EventsContext";

export const EventsProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
export const useEvents = () => useContext(Context);
