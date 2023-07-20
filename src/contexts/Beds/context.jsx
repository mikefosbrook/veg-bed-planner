// This is how react docs instruct you to set up context and reducer
// https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file

import { createContext, useContext, useReducer } from 'react';

import { bedsReducer } from './reducer';

const initialState = {
  loading: true,
  error: null,
  beds: null,
  recentBed: null,
};

const BedsContext = createContext();
const BedsDispatchContext = createContext();

export const useBedsState = () => useContext(BedsContext);
export const useBedsDispatch = () => useContext(BedsDispatchContext);

export const BedsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bedsReducer, initialState);

  return (
    <BedsContext.Provider value={state}>
      <BedsDispatchContext.Provider value={dispatch}>{children}</BedsDispatchContext.Provider>
    </BedsContext.Provider>
  );
};
