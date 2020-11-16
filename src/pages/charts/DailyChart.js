import React, { useState } from "react";
import LineChart from "./LineChart";

import {numberWithCommas} from '../../utils';

export const DailyChart = ({
    data
}) => {
    const [confirmedIndex, setConfirmedIndex] = useState(9);
    const [deathIndex, setDeathIndex] = useState(9);

    const confirmedData = data.map((each, index) => {
        return ({
            label: each.reportDate,
            x: index,
            y: each.totalConfirmed
        })
    }).reverse().slice(0, 10).reverse();
    const deathData = data.map((each, index) => {
        return ({
            label: each.reportDate,
            x: index,
            y: each.deaths.total
        })
    }).reverse().slice(0, 10).reverse();

    return (
        <>
            <div className="chart-title-container">
                <div className="chart-title">
                    Spread Trends
                </div>
            </div>
            <div className="chart-container">
                
                <div className="chart-wrapper">
                    <div className="chart-header">
                        <div className="chart-value">
                            {numberWithCommas(confirmedData[confirmedIndex].y)}
                        </div>
                        <div className="chart-type">
                            Confirmed
                        </div>
                    </div>
                    <LineChart
                        width={700}
                        height={300}
                        data={confirmedData}
                        precision={0}
                        selectedIndex={confirmedIndex}
                        onClick={(index) => setConfirmedIndex(index)}
                        primaryColor={"#007bef"}
                        secondaryColor={"rgba(0, 123, 255, 0.2)"}
                    />
                </div>
                <div className="chart-wrapper">
                    <div className="chart-header">
                        <div className="chart-value">
                            {numberWithCommas(deathData[deathIndex].y)}
                        </div>
                        <div className="chart-type">
                            Deaths
                        </div>
                    </div>
                    <LineChart
                        width={700}
                        height={300}
                        data={deathData}
                        precision={0}
                        selectedIndex={deathIndex}
                        onClick={(index) => setDeathIndex(index)}
                        primaryColor={"#ef105a"}
                        secondaryColor={"rgba(255, 7, 58, 0.2)"}
                    />
                </div>
            </div>
        </>
    )
}