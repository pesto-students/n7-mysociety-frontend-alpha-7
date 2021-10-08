import http from "./base.service";

const upload = (() => {
    const uploadImage = (payload) => {
        return http.post("/single-upload", payload);
    };

    const uploadImages = (payload) => {
        return http.post("/multipe-upload", payload);
    };
    return {
        uploadImage,
        uploadImages
    };
})();

export default upload;
