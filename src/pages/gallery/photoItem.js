import { LightgalleryItem } from "react-lightgallery";
import React from "react";
import { Typography } from "../../shared";

const PhotoItem = ({ image, url, title }) => {
    return (
        <div className="singleItem">
            <LightgalleryItem group="any" src={image}>
                <a href={url}>
                    <img src={image} alt="..." className="itemImage" />
                    <Typography>{title}</Typography>
                </a>
            </LightgalleryItem>
        </div>
    );
};

export default PhotoItem;
