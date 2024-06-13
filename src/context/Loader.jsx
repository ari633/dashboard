import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext(null)

// eslint-disable-next-line react/prop-types
export function LoaderProvider({children}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const values = {
    isLoading,
    setIsLoading,
    isError,
    setIsError
  }
  return (
    <LoaderContext.Provider value={values}>
      {children}
    </LoaderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoader() {
  return useContext(LoaderContext)
}