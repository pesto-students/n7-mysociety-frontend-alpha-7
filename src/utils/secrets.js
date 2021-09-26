export const AWS_CONFIG = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    dirName: process.env.REACT_APP_AWS_EVENT_DIR_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};
console.log(
    process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    "process.env.REACT_APP_AWS_SECRET_ACCESS_KEY"
);
export const CAPTCHA = {
    siteKey: process.env.GOOGLE_CAPTCHA_SITE_KEY
};
