import React, { useContext } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    UserActions,
    Button,
    TemperatureLow,
    TemperatureHigh,
    TemperatureMedium,
    Tooltip
} from "../../shared";
import { isLoggedInAsAdmin } from "../../store/selectors/authetication.selector";
import { useSelector, useDispatch } from "react-redux";
import { ButtonVarientContext } from "../../contexts/variant.context";
import { formatDate } from "../../utils";
import { ModalTypes } from "../../modals/constant";
import { limitSting } from "../../helpers/functions";
import { openModal } from "../../store/dispatchers/modal.dispatch";

import "./complainCard.scss";
export default function ComplainCard({ complaint, isDashboard }) {
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const buttonVarient = useContext(ButtonVarientContext);

    const dispatch = useDispatch();

    const dates = (
        <div className="dates">
            <div className="posted-on">
                <div>
                    <label>Posted On:</label>
                </div>
                <div>
                    <span>
                        {formatDate(complaint?.created_at, "DD-MM-YYYY")}
                    </span>
                </div>
            </div>
            <div className="updated-on">
                <div>
                    <label>Updated On:</label>
                </div>
                <div>
                    <span>
                        {formatDate(complaint?.updated_at, "DD-MM-YYYY")}
                    </span>
                </div>
            </div>
        </div>
    );

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
    const status = (
        <span variant={buttonVarient} className={`status ${complaint?.status}`}>
            {complaint?.status}
        </span>
    );
    const complaintPriority = (
        <div className="complaintPriority">
            {complaint.priority === "High" && (
                <Tooltip title="High Priority">
                    <TemperatureHigh />
                </Tooltip>
            )}
            {complaint.priority === "Medium" && (
                <Tooltip title="Medium Priority">
                    <TemperatureMedium />
                </Tooltip>
            )}
            {complaint.priority === "Low" && (
                <Tooltip title="Low Priority">
                    <TemperatureLow />
                </Tooltip>
            )}
        </div>
    );
    return (
        <Card className="complain-card">
            <div className="cardHeaderWrap">
                <CardHeader
                    title={limitSting(complaint.title, 35)}
                ></CardHeader>
                {complaintPriority}
                {!isAdmin ? (
                    <UserActions
                        canEdit={!isAdmin}
                        show={complaint?.status === "Pending"}
                        onEdit={editComplaint}
                    />
                ) : null}
            </div>
            <CardContent>
                {!isDashboard && (
                    <div className="description">
                        {limitSting(complaint?.desc, 200)}
                    </div>
                )}

                {isAdmin ? (
                    <div className="admin-action">
                        {dates}
                        {takeActionButton}
                    </div>
                ) : (
                    <div className="admin-action">
                        {dates}
                        {status}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
