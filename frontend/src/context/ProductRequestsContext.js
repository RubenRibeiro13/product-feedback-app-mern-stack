import {createContext, useReducer, useContext} from "react";

/* export const ProductRequestsContext = createContext();

export const productRequestsReducer = (state, action) => {
    if (action.type === "READ_PRODUCT_REQUESTS") {
        return {
            productRequests: action.payload
        };
    } else if (action.type === "CREATE_PRODUCT_REQUEST") {
        return {
            productRequests: [...state.productRequests, action.payload]
        };
    }
}

export const ProductRequestsContextProvider = ({element}) => {
    const [state, dispatch] = useReducer(productRequestsReducer, {
        productRequests: null
    });

    return (
        <ProductRequestsContext.Provider value={{...state, dispatch}}>
            {element}
        </ProductRequestsContext.Provider>
    );
}

export const useProductRequestsContext = () => {
    const context = useContext(ProductRequestsContext);
    return context;
} */

const ProductRequestsContext = createContext(null);
const ProductRequestsDispatchContext = createContext(null);

export const ProductRequestsProvider = ({children}) => {
    const [productRequests, dispatch] = useReducer(productRequestsReducer, []);

    return (
        <ProductRequestsContext.Provider value={productRequests}>
            <ProductRequestsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductRequestsDispatchContext.Provider>
        </ProductRequestsContext.Provider>
    );
}

export const useProductRequests = () => {
    return useContext(ProductRequestsContext);
}

export const useProductRequestsDispatch = () => {
    return useContext(ProductRequestsDispatchContext);
}

const productRequestsReducer = (productRequests, action) => {
    switch (action.type) {
        case "read": {
            return action.payload;
        }
    }
}