import React, { useContext, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    UserActions,
    Button
} from "../../shared";
import { isLoggedInAsAdmin } from "../../store/selectors/authetication.selector";
import { useSelector, useDispatch } from "react-redux";
import { ButtonVarientContext } from "../../contexts/variant.context";
import { formatDate } from "../../utils";
import { ModalTypes } from "../../modals/constant";
import { openModal } from "../../store/dispatchers/modal.dispatch";
import "./complainCard.scss";
export default function ComplainCard({ complaint, isDashboard }) {
    console.log(complaint, "complaint------");
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const buttonVarient = useContext(ButtonVarientContext);

    const dispatch = useDispatch();

    const dates = (
        <div className="dates">
            <div className="posted-on">
                <label>Posted On:</label>
                <span>{formatDate(complaint?.created_at, "DD-MM-YYYY")}</span>
            </div>
            <div className="updated-on">
                <label>Updated On:</label>
                <span>{formatDate(complaint?.updated_at, "DD-MM-YYYY")}</span>
            </div>
        </div>
    );

    const [showAction, setShowAction] = useState(false);

    const takeAction = () => {
        openPopup(ModalTypes.addComplain, "Take Action On Complaint");
    };
    const editComplaint = () => {
        openPopup(ModalTypes.addComplain, "Edit Complaint");
    };
    const openPopup = (type, title) => {
        dispatch(openModal(type, title, complaint));
    };

    const takeActionButton = (
        <div className="admin-action-btn">
            <Button
                variant={buttonVarient}
                color="primary"
                onClick={takeAction}
            >
                Take Action
            </Button>
        </div>
    );

    return (
        <Card
            className="complain-card"
            onMouseEnter={() => setShowAction(true)}
            onMouseLeave={() => setShowAction(false)}
        >
            <CardHeader title={complaint?.title}></CardHeader>
            <CardContent>
                <div className="description">{complaint?.desc}</div>
                {isAdmin ? (
                    <div className="admin-action">
                        {dates}
                        {takeActionButton}
                    </div>
                ) : (
                    dates
                )}
                <UserActions
                    canEdit={!isAdmin}
                    show={showAction && !isDashboard}
                    onEdit={editComplaint}
                />
            </CardContent>
        </Card>
    );
}
