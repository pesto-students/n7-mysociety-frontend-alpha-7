import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    modalData,
    modalTitle,
    showModal
} from "../../store/selectors/modal.selector";
import { Modal, CloseIcon } from "../../shared";
import * as MODAL_ACTION from "../../store/actions/modal.action";
import { makeStyles } from "@material-ui/core/styles";
import "./msModal.scss";
function getModalStyle() {
    return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 500,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        boxShadow: theme.shadows[5],
        padding: "15px"
    }
}));
// eslint-disable-next-line
export default function MsModal(PopupComponent) {
    function Component() {
        const classes = useStyles();
        const [modalStyle] = React.useState(getModalStyle);

        const data = useSelector(modalData);
        const title = useSelector(modalTitle);
        const open = useSelector(showModal);
        const dispatch = useDispatch();

        const preventBackDropClose = (event, reason) => {
            if (reason !== "backdropClick") {
                dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
            }
        };

        const closePopup = () => {
            dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
        };

        return (
            <Modal open={open} onClose={(e, r) => preventBackDropClose(e, r)}>
                <div
                    style={modalStyle}
                    className={`${classes.paper} responsive_width`}
                >
                    <div className="ms-modal-title">
                        <div>{title}</div>
                        <div className="close_icon">
                            <CloseIcon onClick={() => closePopup()} />
                        </div>
                    </div>
                    <div>
                        <PopupComponent item={data} />
                    </div>
                </div>
            </Modal>
        );
    }
    return Component;
}
