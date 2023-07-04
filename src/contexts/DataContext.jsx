import React, { createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';

const DataContext = createContext();

const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children }) => {
  const API_HOST = import.meta.env.VITE_API_HOST;
  const { data, isLoading, error, fetchRequest } = useFetch(`${API_HOST}/beds/`);

  return <DataContext.Provider value={{ data, isLoading, error, fetchRequest }}>{...children}</DataContext.Provider>;
};

export { DataContext, DataContextProvider, useDataContext };
