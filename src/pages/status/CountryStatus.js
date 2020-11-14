import React from 'react';
import { capitalizeFirst, numberWithCommas } from "../../utils";

export const CountryStatus = ({
    country,
    type,
    data
}) => {
    return (
        <div className={`selected-country selected-country-${type}`}>
            {country ?
            <>
                <div className="selected-country-name">
                    {country.name}
                </div>
                <div className="selected-country-count">
                    {(data[country.iso3] && data[country.iso3][type])
                        ? numberWithCommas(data[country.iso3][type])
                        : 'Not available'}
                </div>
                <div className="selected-country-type">
                    {capitalizeFirst(type)}
                </div>
            </> : null}
        </div>
    )
}