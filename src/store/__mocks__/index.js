export const globalStore = {
    authentication: {
        register: {
            data: null
        },
        login: {
            status: "Success",
            data: {
                _id: "614586a42f9921170261ed47",
                firstName: "Mahesh",
                lastName: "Vora",
                email: "maheshvorahelp@gmail.com",
                mobile: "1234567890",
                flatNo: "B - 109",
                avatarUrl:
                    "https://firebasestorage.googleapis.com/v0/b/mysociety-324111.appspot.com/o/profile%2F4928.jpeg?alt=media&token=e7a0f0b0-2e4c-420f-92f8-d0534ebf9009",
                role: "admin",
                society: {
                    _id: "614586a42f9921170261ed45",
                    name: "Regular society 1",
                    societyEmail: "maheshvorahelp@gmail.com",
                    address: "Regular society 1",
                    mobile: "0201020300"
                }
            },
            isLoggedIn: true
        },
        forgetPassword: {
            data: null
        },
        resetPassword: {
            data: null
        },
        verifySociety: {
            data: null
        },
        societies: {
            data: []
        }
    },
    announcement: {
        announcementList: {
            data: []
        },
        lastAdded: {
            data: null
        },
        lastDeleted: {
            data: null
        }
    },
    modal: {
        isOpened: false,
        type: null,
        data: null,
        modalHeader: null,
        snackbar: {
            show: false,
            message: null
        }
    },
    event: {
        events: {
            status: "None",
            data: []
        },
        lastAdded: {
            status: "None",
            data: null
        },
        lastDeleted: {
            status: "None",
            data: null
        }
    },
    gallery: {
        gallery: {
            status: "None",
            data: []
        },
        lastAdded: {
            status: "None",
            data: null
        },
        lastDeleted: {
            status: "None",
            data: null
        }
    },
    complaint: {
        complaintList: {
            data: []
        },
        lastAdded: {
            data: null
        },
        lastDeleted: {
            data: null
        }
    },
    user: {
        userList: {
            data: []
        },
        lastAdded: {
            data: null
        },
        lastDeleted: {
            data: null
        }
    }
};
