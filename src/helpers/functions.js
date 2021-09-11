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
