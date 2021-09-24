export const AWS_CONFIG = {
    bucketName: "mysociety-app",
    dirName: process.env.REACT_APP_AWS_EVENT_DIR_NAME,
    region: "eu-west-3",
    accessKeyId: "AKIAZ7OGRQHKI2E6FTGO",
    secretAccessKey: "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"
};

export const getConfig = (dirName) => {
    return {
        ...AWS_CONFIG,
        dirName: dirName
    };
};
