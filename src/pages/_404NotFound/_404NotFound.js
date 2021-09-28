import { Typography } from "@material-ui/core";
import React from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import "./_404NotFound.scss";
export default function PageNotFound() {
    return (
        <div className="wrapper _404">
            <DefaultLayout>
                <Typography variant="h4" color="primary">
                    <Typography variant="h1" color="secondary">
                        404
                    </Typography>
                    <Typography variant="h4" color="text">
                        Page not found!
                    </Typography>
                </Typography>
            </DefaultLayout>
        </div>
    );
}
