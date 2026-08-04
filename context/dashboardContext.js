import { createContext, useContext, useReducer } from "react";

export const DashboardContext = createContext({
  dashboardParams: {},
});

export const DashboardDispatchContext = createContext();

export const useDashboard = () => {
  return useContext(DashboardContext);
};

export const useDashboardDispatch = () => {
  return useContext(DashboardDispatchContext);
};

export const reducer = (state, action) => {
  return {
    dashboardParams: action.params,
  };
};

export const DashboardContextProvider = ({ children }) => {
  const [dashboardState, dashboardDispatch] = useReducer(reducer, {});
  return (
    <DashboardContext.Provider value={dashboardState}>
      <DashboardDispatchContext.Provider value={dashboardDispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
};
