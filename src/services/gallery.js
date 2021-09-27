import http from "./base.service";
const gallery = (() => {
    const fetchGallery = (payload) => {
        return http.get("/gallery", { params: payload });
    };

    const createGallery = (payload) => {
        return http.put("/gallery", payload);
    };
    const deleteGallery = (payload) => {
        return http.delete("/gallery", { params: payload });
    };

    return {
        fetchGallery,
        createGallery,
        deleteGallery
    };
})();

export default gallery;
