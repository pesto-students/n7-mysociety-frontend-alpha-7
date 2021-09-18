export const getAvatarName = (name) => {
    if (!name) {
        return "";
    }
    return name
        .match(/(^\S\S?|\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("")
        .toUpperCase();
};

export const encodeDataToURL = (data) => {
    return Object.keys(data)
        .map((value) => `${value}=${encodeURIComponent(data[value])}`)
        .join("&");
};

export const limitSting = (string, limit) => {
    if (string.length > limit) {
        return `${string.slice(0, limit)}...`;
    } else {
        return string;
    }
};
