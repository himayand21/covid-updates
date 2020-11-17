import React, { useState } from "react";
import { scalePow } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

import { colors } from "../../constants/dashboard";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export const Map = (props) => {
    const { type, data, setSelectedCountry, selectedCountry } = props;

    if (!data || data === {}) return null;

    const formattedData = Object.values(data);

    const maxValues = formattedData.map((each) => each[type]);
    const maxValue = Math.max(...maxValues);
    const defaultColor = '#eaeaea0a';

    const colorScale = scalePow()
        .exponent(0.1)
        .domain([0, maxValue])
        .range(colors[type].range);

    return (
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 170
            }}
            style={{
                marginLeft: "-2.7vw"
            }}
            data-tip=""
        >
            {formattedData.length > 0 && (
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const d = formattedData.find(s => s.iso3 === geo.properties.ISO_A3);
                            const selectedGeo = selectedCountry.iso3 === geo.properties.ISO_A3;

                            const baseColor = colors[type].default;
                            const hoverColor = colors[type].hover;

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    stroke={selectedGeo ? baseColor : defaultColor}
                                    strokeWidth={selectedGeo ? '1px' : '0px'}
                                    onClick={() => {
                                        const { ISO_A3, NAME } = geo.properties;
                                        setSelectedCountry({
                                            iso3: ISO_A3,
                                            name: NAME
                                        });
                                    }}
                                    style={{
                                        default: {
                                            fill: (d && d[type]) ? colorScale(d[type]) : defaultColor,
                                            outline: "none",
                                            cursor: "default"
                                        },
                                        hover: {
                                            fill: d ? hoverColor : defaultColor,
                                            outline: "none",
                                            cursor: d ? "pointer" : "default"
                                        },
                                        pressed: {
                                            fill: d ? hoverColor : defaultColor,
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
    );
};
