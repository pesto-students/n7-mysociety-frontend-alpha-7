import { setCookie, getCookie, formatDate, getPager } from "..";
import { clearCookies } from "../cookie";
const store = { dispatch: jest.fn() };

describe("cookie", () => {
    beforeAll(() => {
        Object.defineProperty(document, "cookie", {
            writable: true
        });
    });

    describe("when get cookies is called", () => {
        it("should return correct cookie value", () => {
            setCookie("status", "active");
            const result = getCookie("status");
            expect(result).toBe("active");
        });
    });

    describe("when setcookie is called", () => {
        it("should set cookie", () => {
            setCookie("societyId", "123456");
            const societyId = getCookie("societyId");
            expect(societyId).toBeDefined();
            expect(societyId).toBe("123456");
        });
    });

    describe("when clear cookie is called", () => {
        it("should clear cookie", () => {
            const promise = clearCookies();
            expect(promise).toBeInstanceOf(Promise);
            const societyId = getCookie("societyId");
            expect(societyId).toBe("");
        });
    });
});

describe("formatting", () => {
    describe("when formatDate is being called", () => {
        it("should return correct formatted date", () => {
            const date = new Date("2021-10-07T03:24:00");
            const returnValue = formatDate(date, "DD/MM/YYYY");
            expect(returnValue).toEqual("07/10/2021");
        });
    });

    describe("when getPager is called", () => {
        it("should return correct pager object", () => {
            const pageDetails = {
                totalDocs: 2,
                limit: 2,
                totalPages: 1,
                page: 1,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null
            };
            const pager = getPager(pageDetails);
            expect(pager).toStrictEqual({
                page: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false,
                limit: 2,
                prevPage: null,
                nextPage: null,
                totalDocs: 2
            });
        });
    });
});
