// This is how react docs instruct you to set up context and reducer
// https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file

import { createContext, useContext, useEffect, useReducer } from 'react';

import { bedsReducer } from './reducer';

const initialState = {
  loading: false,
  error: null,
  beds: [],
  recentBed: null,
};
const initializer = localStorage.getItem('beds') ? JSON.parse(localStorage.getItem('beds')) : initialState;

const BedsStateContext = createContext();
const BedsDispatchContext = createContext();

export const useBedsState = () => useContext(BedsStateContext);
export const useBedsDispatch = () => useContext(BedsDispatchContext);

export const BedsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bedsReducer, initializer);

  // Persist state on each update
  useEffect(() => {
    localStorage.setItem('beds', JSON.stringify(state));
  }, [state]);

  return (
    <BedsStateContext.Provider value={state}>
      <BedsDispatchContext.Provider value={dispatch}>{children}</BedsDispatchContext.Provider>
    </BedsStateContext.Provider>
  );
};
