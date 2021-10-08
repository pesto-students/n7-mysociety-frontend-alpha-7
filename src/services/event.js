import http from "./base.service";
const event = (() => {
    const getEvents = (payload) => {
        return http.get("/event", { params: payload });
    };

    const createEvent = (payload) => {
        return http.put("/event", payload);
    };

    const deleteEvent = (payload) => {
        return http.delete("/event", { params: payload });
    };

    return {
        getEvents,
        createEvent,
        deleteEvent
    };
})();

export default event;
