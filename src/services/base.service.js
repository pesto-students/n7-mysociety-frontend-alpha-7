import axios from "axios";
import { getCookie } from "../utils";
import { logout } from "../utils";
const http = (function () {
    const errorHandler = (error) => {
        throw error;
    };

    const handleTokenInjection = (request) => {
        const x_auth_cookie = getCookie("x-auth-token");
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

    httpHandler.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const { response } = error;
            if (response.status === 401 || response.status === 403) {
                logout();
            }
            return error;
        }
    );
    return httpHandler;
})();

export default http;
