import http from "./base.service";
class Complaint {
    getAllComplaints(payload) {
        return http.get("/complaint", { params: payload });
    }

    createComplaint() {}

    deleteComplaint() {}
}

export default new Complaint();
