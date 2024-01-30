import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  objectName: '',
  objectAddress: '',
  // Add more fields as needed
};

// Define actions for updating state
const actions = {
  setObjectName: 'SET_OBJECT_NAME',
  setObjectAddress: 'SET_OBJECT_ADDRESS',
  // Add more actions as needed
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actions.setObjectName:
      return { ...state, objectName: action.payload };
    case actions.setObjectAddress:
      return { ...state, objectAddress: action.payload };
    // Add more cases as needed
    default:
      return state;
  }
};

// Create the context
const FormDataContext = createContext();

// Create a provider component
export const FormDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <FormDataContext.Provider value={{ state, dispatch }}>{children}</FormDataContext.Provider>;
};

// Custom hook for accessing the context
export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
