import React, {createContext, useState} from "react";

export const StateContext = createContext(null);

function StateContextProvider({children}) {
    const [company, setCompany] = useState("")

return (
    <StateContext.Provider value={{
        company,
        setCompany
    }}
>
{children}
    </StateContext.Provider>
)
}

export default StateContextProvider;
