import http from "./base.service";
class Announcement {
    getAllAnnouncements(payload) {
        return http.get("/announcement", { params: payload });
    }

    createAnnouncement(payload) {
        return http.put("/announcement", payload);
    }

    deleteAnnouncement(payload) {
        return http.delete("/announcement", { params: payload });
    }
}

export default new Announcement();
