/* const fetchFunction = async (path, method, body) => {
    const response = await fetch("http://localhost:4000" + path, {
        method,
        body,
        headers: {"Content-Type": "application/json"}
    });
    const json = await response.json();

    return json;
} */

const fetchFunction = async (path, method, body) => {
    const response = await fetch("https://product-feedback-app-backend.onrender.com" + path, {
        method,
        body,
        headers: {"Content-Type": "application/json"}
    });
    const json = await response.json();

    return json;
}

export default fetchFunction;