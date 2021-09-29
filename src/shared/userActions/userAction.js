import React from "react";
import "./userAction.scss";
import { CardActions, IconButton } from "..";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
export default function UserActions({
    canEdit,
    canDelete,
    show,
    onEdit,
    onDelete
}) {
    const getAllAvailableActions = () => {
        const actions = [];
        if (canEdit) {
            actions.push(
                <IconButton
                    aria-label="edit"
                    size="small"
                    color="secondary"
                    onClick={() => onEdit()}
                >
                    <EditIcon />
                </IconButton>
            );
        }
        if (canDelete) {
            actions.push(
                <IconButton
                    aria-label="delete"
                    size="small"
                    color="secondary"
                    onClick={() => onDelete()}
                >
                    <DeleteIcon />
                </IconButton>
            );
        }

        return actions;
    };

    return (
        <CardActions className="card-action-btns">
            {getAllAvailableActions()}
        </CardActions>
    );
}
