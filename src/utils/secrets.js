export const CAPTCHA = {
    siteKey: process.env.GOOGLE_CAPTCHA_SITE_KEY
};

export const config = (dirName) => {
    return {
        bucketName: "mysociety-app",
        dirName: dirName,
        region: "eu-west-3",
        accessKeyId: "AKIAZ7OGRQHKI2E6FTGO",
        secretAccessKey: "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"
    };
};
