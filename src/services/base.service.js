import axios from "axios";
export class BaseService {
    http = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
