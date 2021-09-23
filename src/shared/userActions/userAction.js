import React from "react";
import "./userAction.scss";
import { CSSTransition } from "react-transition-group";
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
                    size="medium"
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
                    size="medium"
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
        <CSSTransition
            key="adminAction"
            timeout={1000}
            in={show}
            className="slide"
            unmountOnExit
        >
            <CardActions className="card-action-btns">
                {getAllAvailableActions()}
            </CardActions>
        </CSSTransition>
    );
}
