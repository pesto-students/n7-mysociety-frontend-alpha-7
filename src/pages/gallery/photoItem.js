import { LightgalleryItem } from "react-lightgallery";
import React from "react";
import { Typography } from "../../shared";

const PhotoItem = ({ image, url, title }) => {
    return (
        <LightgalleryItem group="any" src={image}>
            <a href={url}>
                <img src={image} />
                <Typography>{title}</Typography>
            </a>
        </LightgalleryItem>
    );
};

export default PhotoItem;
