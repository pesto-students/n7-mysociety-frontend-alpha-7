import http from "./base.service";

const faqService = (() => {
    const getAllFaqs = () => {
        return http.get("/faqs");
    };
    return {
        getAllFaqs
    };
})();

export default faqService;
