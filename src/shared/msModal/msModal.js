import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  modalData,
  modalTitle,
  showModal,
} from "../../store/selectors/modal.selector";
import { Modal } from "../../shared";
import * as MODAL_ACTION from "../../store/actions/modal.action";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Icon } from "../../assets/svgs/closeIcon.svg";
import "./msModal.scss";
function getModalStyle() {
  return {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: "15px",
  },
}));

export default function MsModal(PopupComponent) {
  return function () {
    const preventBackDropClose = (event, reason) => {
      if (reason !== "backdropClick") {
        dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
      }
    };

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const data = useSelector(modalData);
    const title = useSelector(modalTitle);
    const open = useSelector(showModal);
    const dispatch = useDispatch();

    const closePopup = () => {
      dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
    };

    return (
      <Modal open={open} onClose={(e, r) => preventBackDropClose(e, r)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="ms-modal-title">
            <div>{title}</div>
            <div className="close_icon">
              <Icon onClick={(e) => closePopup()} />
            </div>
          </div>
          <div>
            <PopupComponent item={data} />
          </div>
        </div>
      </Modal>
    );
  };
}
