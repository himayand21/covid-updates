import React, { useState } from "react";
import { scalePow } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";

import { colors, dashboardCountKeys } from "../../constants/dashboard";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export const Map = (props) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const { type, receivedData } = props;

    if (!receivedData) return null;

    let data = {};
    receivedData.forEach((currVal) => {
        if (!data[currVal.iso3]) {
            data[currVal.iso3] = {
                recovered: currVal.recovered,
                iso3: currVal.iso3,
                deaths: currVal.deaths,
                confirmed: currVal.confirmed
            }
        } else {
            data[currVal.iso3] = {
                iso3: currVal.iso3,
                recovered: currVal.recovered + data[currVal.iso3].recovered,
                deaths: currVal.deaths + data[currVal.iso3].deaths,
                confirmed: currVal.confirmed + data[currVal.iso3].confirmed
            }
        }
    });

    const formattedData = Object.values(data);

    const maxValues = formattedData.map((each) => each[type]);
    const maxValue = Math.max(...maxValues);

    const colorScale = scalePow()
        .exponent(0.1)
        .domain([0, maxValue])
        .range(colors[type].range);

    return (
        <>
            <div className="block-header">
                Worldwide Distribution
            </div>
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
                data-tip=""
            >
                <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                {formattedData.length > 0 && (
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const d = formattedData.find(s => s.iso3 === geo.properties.ISO_A3);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => {
                                            const { ISO_A3, NAME } = geo.properties;
                                            setSelectedCountry({
                                                iso3: ISO_A3,
                                                name: NAME
                                            });
                                        }}
                                        style={{
                                            default: {
                                                fill: d ? colorScale(d[type]) : "#D6D6DA",
                                                outline: "none",
                                                cursor: "default"
                                            },
                                            hover: {
                                                fill: d ? colors[type].hover : "#D6D6DA",
                                                outline: "none",
                                                cursor: d ? "pointer" : "default"
                                            },
                                            pressed: {
                                                fill: d ? colors[type].hover : "#D6D6DA",
                                                outline: "none",
                                                cursor: d ? "pointer" : "default"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                )}
            </ComposableMap>
            <div className="selected-country">
                {selectedCountry ? <>
                    <div className="selected-country-name">
                        {selectedCountry.name}
                    </div>
                    {data[selectedCountry.iso3] ?
                        <>
                            {dashboardCountKeys.map((each) => {
                                return (
                                    <div className={`selected-country-count selected-country-${each}`}>
                                        {data[selectedCountry.iso3][each]}
                                    </div>
                                )
                            })}
                        </>
                        : <div className="selected-country-no-data">No Data Available</div>}
                </> : null}
            </div>
        </>
    );
};
