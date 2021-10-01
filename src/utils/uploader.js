import S3UploadFile from "react-s3";
import { initializeApp } from "firebase/app";
import * as fireBaseStorageService from "firebase/storage";
import { config } from ".";
export const uploadImage = (image, dirName) => {
    return new Promise((resolve, reject) => {
        S3UploadFile.uploadFile(image, config(dirName))
            .then((response) => {
                resolve(response.location);
            })
            .catch((error) => {
                reject(new Error(error));
            });
    });
};

const fireBaseApp = (() => {
    const firebaseConfig = {
        apiKey: "AIzaSyDlBxFiqwm_zndjxH_jjGcX1zz2zdHyKxQ",
        authDomain: "mysociety-324111.firebaseapp.com",
        projectId: "mysociety-324111",
        storageBucket: "mysociety-324111.appspot.com",
        messagingSenderId: "358023269699",
        appId: "1:358023269699:web:2551420060d9b42d4ff3f6"
    };
    return initializeApp(firebaseConfig);
})();

const getFireBaseStorage = () => {
    return fireBaseStorageService.getStorage(fireBaseApp);
};

const getFireBaseRef = (dirName, fileName) => {
    const storage = getFireBaseStorage();
    return fireBaseStorageService.ref(storage, `${dirName}/${fileName}`);
};

export const uploadToFireBaseStore = (image, dirName) => {
    return new Promise((resolve, reject) => {
        const ref = getFireBaseRef(dirName, image.name);
        const uploadTask = fireBaseStorageService.uploadBytesResumable(
            ref,
            image
        );

        uploadTask.on(
            "state_changed",
            (snapShot) => {
                console.log(snapShot);
            },
            (err) => {
                console.log(err);
                reject(new Error(err));
            },
            () => {
                fireBaseStorageService
                    .getDownloadURL(ref)
                    .then((fireBaseUrl) => {
                        resolve(fireBaseUrl);
                    })
                    .catch((err) => {
                        reject(new Error(err));
                    });
            }
        );
    });
};

export const deleteFileFromFireBaseStore = (file) => {
    return new Promise((resolve, reject) => {
        const storage = getFireBaseStorage();
        const ref = fireBaseStorageService.ref(storage, file);
        fireBaseStorageService
            .deleteObject(ref)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(new Error(err));
            });
    });
};
