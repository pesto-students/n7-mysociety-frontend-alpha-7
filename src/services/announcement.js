import http from "./base.service";
class Announcement {
    getAllAnnouncements(payload) {
        return http.get("/announcement", { params: payload });
    }

    createAnnouncement() {}

    deleteAnnouncement() {}
}

export default new Announcement();
