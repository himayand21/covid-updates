import React from "react";

import { Map } from "./Map";
import { WorldChart } from "./WorldChart";
import { DailyChart } from "./DailyChart";
import { CountryChart } from "./CountryChart";

export const Status = (props) => {
    const {
        type,
        worldData,
        dailyData,
        countryData,
        countries,
        selectedCountry,
        updateSelectedCountry
    } = props;

    return (
        <div className="blocks">
            <div className="block-container">
                <Map
                    receivedData={worldData}
                    type={type}
                />
            </div>
            <div className="block-container">
                <WorldChart
                    receivedData={worldData}
                    type={type}
                />
            </div>
            <div className="block-container">
                <DailyChart receivedData={dailyData} />
            </div>
            <div className="block-container">
                <CountryChart
                    receivedData={countryData}
                    countries={countries}
                    updateSelectedCountry={updateSelectedCountry}
                    selectedCountry={selectedCountry}
                />
            </div>
        </div>
    )
}