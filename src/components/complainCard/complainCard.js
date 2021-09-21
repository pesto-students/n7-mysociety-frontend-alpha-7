import React, { useContext, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    UserActions,
    Button
} from "../../shared";
import { ButtonVarientContext } from "../../contexts/variant.context";
import "./complainCard.scss";
export default function ComplainCard({ complain, isAdmin }) {
    const buttonVarient = useContext(ButtonVarientContext);

    const dates = (
        <div className="dates">
            <div className="posted-on">
                <label>Posted On:</label>
                <span>{complain.postedOn}</span>
            </div>
            <div className="updated-on">
                <label>Updated On:</label>
                <span>{complain.updatedOn}</span>
            </div>
        </div>
    );

    const [showAction, setShowAction] = useState(false);

    const takeActionButton = (
        <div className="admin-action-btn">
            <Button variant={buttonVarient} color="primary">
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
            <CardHeader title={complain.name}></CardHeader>
            <CardContent>
                <div className="description">{complain.description}</div>
                {isAdmin ? (
                    <div className="admin-action">
                        {dates}
                        {takeActionButton}
                    </div>
                ) : (
                    dates
                )}
                <UserActions
                    canEdit={true}
                    canDelete={true}
                    show={showAction}
                />
            </CardContent>
        </Card>
    );
}
