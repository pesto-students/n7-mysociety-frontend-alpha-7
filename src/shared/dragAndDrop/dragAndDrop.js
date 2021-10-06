import React from "react";
import { FileDrop } from "react-file-drop";
import "./dragAndDrop.scss";
export default function DrogAndDrop({ getDroppedFiles, children }) {
    return (
        <div style={{ width: "100%" }}>
            <FileDrop onDrop={(files) => getDroppedFiles(files)}>
                {children}
            </FileDrop>
        </div>
    );
}
