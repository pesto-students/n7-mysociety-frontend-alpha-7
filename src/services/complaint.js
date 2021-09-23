import http from "./base.service";
class Complaint {
    getAllComplaints(payload) {
        return http.get("/complaint", { params: payload });
    }

    createComplaint(payload) {
        return http.put("/complaint", payload);
    }
}

export default new Complaint();
