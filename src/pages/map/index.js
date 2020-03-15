import React, { useEffect, useState } from "react";
import { scalePow } from "d3-scale";
import { getWorldData } from "../../api/getWorldData";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";

import { colors, dashboardCountKeys } from "../../constants/dashboard";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export const MapChart = (props) => {
    const [data, setData] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const { type } = props;

    useEffect(() => {
        (async () => {
            const data = await getWorldData();
            const formattedData = {};
            data.forEach((currVal) => {
                if (!formattedData[currVal.iso3]) {
                    formattedData[currVal.iso3] = {
                        recovered: currVal.recovered,
                        iso3: currVal.iso3,
                        deaths: currVal.deaths,
                        confirmed: currVal.confirmed
                    }
                } else {
                    formattedData[currVal.iso3] = {
                        iso3: currVal.iso3,
                        recovered: currVal.recovered + formattedData[currVal.iso3].recovered,
                        deaths: currVal.deaths + formattedData[currVal.iso3].deaths,
                        confirmed: currVal.confirmed + formattedData[currVal.iso3].confirmed
                    }
                }
            });
            setData(formattedData);
        })();
    }, []);

    if (!data) return null;

    const formattedData = Object.values(data);

    const maxValues = formattedData.map((each) => each[type]);
    const maxValue = Math.max(...maxValues);

    const colorScale = scalePow()
        .exponent(0.1)
        .domain([0, maxValue])
        .range(colors[type].range);

    return (
        <>
            <div className="map-header">
                Worldwide Status
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
