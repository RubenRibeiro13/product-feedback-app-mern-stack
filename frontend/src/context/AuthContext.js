import {createContext, useReducer, useContext} from "react";

const AuthContext = createContext();
export const useAuthContext = () => {return useContext(AuthContext)}

const authReducer = (user, action) => {
    switch (action.type) {
        case "login": return action.payload;
        case "logout": return null;
    }
}

export const AuthContextProvider = ({children}) => {
    const [user, dispatch] = useReducer(authReducer, []);

    return (
        <AuthContext.Provider value={{user, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}