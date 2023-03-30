import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useProductRequests, useProductRequestsDispatch} from "../context/ProductRequestsContext";

const Home = () => {
    /* const navigate = useNavigate();
    navigate("/suggestions"); */

    /* useProductRequests(); */
    /* const dispatch = useProductRequestsDispatch();

    useEffect(() => {
        const fetchProductRequests = async () => {
            const response = await fetch("/");
            const json = await response.json();

            dispatch({type: "read", payload: json});
        }

        fetchProductRequests();
    }); */

    return (
        <Navigate to="/suggestions" />
    );
}

export default Home;