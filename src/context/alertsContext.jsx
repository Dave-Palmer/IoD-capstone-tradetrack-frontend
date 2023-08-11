import React from "react";


//named export for this context (to be used via useContext elsewhere)
export const AlertsContext = React.createContext('');

//the provider wrapper for this context. uses its own state to keep track of which theme is in use
export const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = React.useState(0);

    return (
        <AlertsContext.Provider value={{ alerts, setAlerts }}>
            {children}
        </AlertsContext.Provider>
    );
}