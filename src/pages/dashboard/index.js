import React from "react";

import { capitalizeFirst, numberWithCommas } from "../../utils";
import { dashboardCountKeys } from '../../constants/dashboard';

export const Dashboard = (props) => {
    const { type, data, setType } = props;
    return (
        <div className="dashboard-counts">
            {dashboardCountKeys.map((dashboardCountKey, index) => {
                return (
                    <div
                        className={`dashboard-count animate-${index + 1} dashboard-count-${dashboardCountKey} ${type === dashboardCountKey ? "dashboard-count-active" : ""}`}
                        onClick={() => setType(dashboardCountKey)}
                    >
                        <div className="dashboard-count-label">{capitalizeFirst(dashboardCountKey)}</div>
                        <div className="dashboard-count-value">{numberWithCommas(data[dashboardCountKey].value)}</div>
                    </div>
                );
            })}
        </div>
    )
}