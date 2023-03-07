import { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { useEffect } from "react";

export const ErrorComp: ErrorBoundaryComponent = ({ error }) => {
    useEffect(() => {
        setTimeout(() => {
            //window.location.reload();
        }, 1500);
    });

    return (
        <div>
            <div>Something went Wrong!</div>
            <div>{error.name === "TypeError" ? "loader data is null on backpress issue, dunno, wait for refresh" : ""}</div>
        </div>
    );
};
