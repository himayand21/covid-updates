import React from "react";
import Select from 'react-select';

import { getFormattedDate } from "../../utils";

export const Header = ({
    lastUpdate,
    countries,
    setSelectedCountry,
    selectedCountry
}) => {
    const options = countries.map((each) => ({
        label: each.country,
        value: each.iso3
    }));

    const handleChange = (option) => {
        setSelectedCountry({
            name: option.label,
            iso3: option.value
        });
    };

    return (
        <div className="header-wrapper">
            <div className="header">
                World's Covid Statistics
            </div>
            <div className="header-subtitle">
                {`As of ${getFormattedDate(lastUpdate)}`}
            </div>
            <div className="country-selector">
                <Select
                    options={options}
                    onChange={handleChange}
                    value={{
                        value: selectedCountry.iso3,
                        label: selectedCountry.name
                    }}
                    classNamePrefix="country-select"
                />
            </div>
        </div>
    )
}