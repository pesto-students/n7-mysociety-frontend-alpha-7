import S3UploadFile from "react-s3";
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
