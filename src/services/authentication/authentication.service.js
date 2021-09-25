import http from "../base.service";
class Authentication {
    loginUser(payload) {
        return http.post("/auth/signin", payload);
    }

    registerUser(payload) {
        return http.post("/auth/signup", payload);
    }

    getAllSocietities() {
        return http.get("/get-all-society");
    }

    getUserDetails(payload) {
        return http.get("/user", { params: payload });
    }
}

export default new Authentication();
