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
			{worldData ?
            <div className="block-container">
                <Map
                    receivedData={worldData}
                    type={type}
                />
            </div> : null}
			{worldData ?
            <div className="block-container">
                <WorldChart
                    receivedData={worldData}
                    type={type}
                />
            </div> : null}
			{dailyData ?
            <div className="block-container">
                <DailyChart receivedData={dailyData} />
            </div> : null}
			{countryData ?
            <div className="block-container">
                <CountryChart
                    receivedData={countryData}
                    countries={countries}
                    updateSelectedCountry={updateSelectedCountry}
                    selectedCountry={selectedCountry}
                />
            </div> : null}
        </div>
    )
}