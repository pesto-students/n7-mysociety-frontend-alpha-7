import axios from "axios";
const http = (function () {
    const getCookie = () => {
        return document.cookie.split("=")[1];
    };

    const errorHandler = (error) => {
        throw error;
    };

    const handleTokenInjection = (request) => {
        const x_auth_cookie = getCookie();
        if (x_auth_cookie) {
            request.headers["x-access-token"] = x_auth_cookie;
        }
        return request;
    };

    const httpHandler = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            "Content-Type": "application/json"
        }
    });
    httpHandler.interceptors.request.use(
        (request) => handleTokenInjection(request),
        (error) => errorHandler(error)
    );
    return httpHandler;
})();

export default http;
