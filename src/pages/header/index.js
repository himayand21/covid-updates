import React from "react";
import { getFormattedDate } from "../../utils";

export const Header = ({
    lastUpdate
}) => {
    return (
        <div className="header-wrapper">
            <div className="header">
                World's Covid Statistics
            </div>
            <div className="header-subtitle">
                {`As of ${getFormattedDate(lastUpdate)}`}
            </div>
        </div>
    )
}