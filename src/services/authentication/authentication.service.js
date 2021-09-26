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

    forgetPassword(payload) {
        return http.post("/auth/forget-password", payload);
    }

    verifySociety(payload) {
        return http.post("/auth/verify-society", payload);
    }

    resetPassword(payload) {
        return http.post("/auth/reset-password", payload);
    }
}

export default new Authentication();
