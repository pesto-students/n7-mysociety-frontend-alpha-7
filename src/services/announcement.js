import http from "./base.service";
class Announcement {
    getAllAnnouncements(payload) {
        return http.get("/announcement", { params: payload });
    }

    createAnnouncement(payload) {
        return http.put("/announcement", payload);
    }

    deleteAnnouncement(payload) {
        return http.delete("/announcement", { data: payload });
    }
}

export default new Announcement();
