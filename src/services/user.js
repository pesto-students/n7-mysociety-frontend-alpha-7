import http from "./base.service";
class User {
    getAllUsers(payload) {
        return http.get("/user", { params: payload });
    }

    createUser(payload) {
        return http.put("/user", payload);
    }

    updateSociety(payload) {
        return http.put("/society", payload);
    }
}

export default new User();
