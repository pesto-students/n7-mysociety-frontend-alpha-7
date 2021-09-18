import React from "react";
import { EditIcon, DeleteIcon } from "..";
import "./userAction.scss";
export default function UserActions({ canEdit, canDelete }) {
    return (
        <div className="user-actions">
            <div className="action">
                {canEdit ? <EditIcon /> : null}
                {canDelete ? <DeleteIcon /> : null}
            </div>
        </div>
    );
}
