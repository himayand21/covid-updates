import React from "react";

import ChartWrapper from "./ChartWrapper";

export const DailyChart = ({
    data
}) => {
    const reversedData = data.map((each, index) => {
        return ({
            label: each.reportDate,
            x: index,
            confirmed: each.totalConfirmed,
            deaths: each.deaths.total
        })
    }).reverse();

    return (
        <>
            <div className="chart-title-container">
                <div className="chart-title">
                    Spread Trends
                </div>
                <div className="chart-subtitle">
                    A Timeline of Daily Growth Rate of the Coronavirus
                </div>
            </div>
            <div className="chart-container">
                <ChartWrapper
                    data={reversedData}
                    primaryColor={"#007bef"}
                    secondaryColor={"rgba(0, 123, 255, 0.2)"}
                    yKey={'confirmed'}
                />
                <ChartWrapper
                    data={reversedData}
                    primaryColor={"#ef105a"}
                    secondaryColor={"rgba(255, 7, 58, 0.2)"}
                    yKey={'deaths'}
                />
            </div>
            <div className="chart-help">
                <div>
                    Click on any date in the graph to view information for that specific date.
                </div>
                <div>
                    Navigate using the arrow keys to go to older dates.
                </div>             
            </div>
        </>
    )
}