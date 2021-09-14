import React, { useEffect, useState, useContext } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    UserActions,
    Button
} from "../../shared";
import { SpinnerLoader } from "../../shared";
import { ButtonVarientContext } from "../../contexts/variant.context";
import "./complainCard.scss";
export default function ComplainCard({ complain, isAdmin }) {
    const [isLoading, setLoading] = useState(true);
    const buttonVarient = useContext(ButtonVarientContext);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

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

    const takeActionButton = (
        <div className="admin-action-btn">
            <Button variant={buttonVarient} color="primary">
                Take Action
            </Button>
        </div>
    );

    return (
        <SpinnerLoader show={isLoading}>
            <Card className="complain-card">
                <UserActions canEdit={true} canDelete={true} />
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
                </CardContent>
            </Card>
        </SpinnerLoader>
    );
}
