import React from "react";
import PropTypes from "prop-types";

import {getShortFormattedDate, abbreviateNumber} from '../../utils';

const LineChart = ({
    data,
    height,
    width,
    precision,
    primaryColor,
    secondaryColor,
    selectedIndex,
    onClick,
    yKey
}) => {
    const FONT_SIZE = width / 60;
    const maximumXFromData = Math.max(...data.map((e, index) => index));
    const maximumYFromData = Math.max(...data.map(e => e[yKey]));

    const digits =
        parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

    const padding = (FONT_SIZE + digits) * 3;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const Points = () => {
        return (
            <>
                {data.map((element, index) => {
                    const x = (index / maximumXFromData) * chartWidth + (padding / 2);
                    const y = chartHeight - ((element[yKey] / maximumYFromData) * chartHeight) + padding;
                    return (
                        <circle
                            cx={x}
                            cy={y}
                            r="5"
                            stroke={(selectedIndex === index) ? "lightgray" : secondaryColor}
                            onClick={() => onClick(index)}
                            strokeWidth="2"
                            fill={primaryColor}
                            style={{
                                cursor: "pointer"
                            }}
                        />
                    )
                })}
            </>
        )
    }

    const Lines = () => {
        return (
            <>
                {data.map((element, index) => {
                    const x = (index / maximumXFromData) * chartWidth + (padding / 2);
                    const y = chartHeight - (element[yKey] / maximumYFromData) * chartHeight + padding;
                    return (
                        <line
                            x1={x}
                            y1={y}
                            x2={x}
                            y2={chartHeight + padding}
                            stroke={(selectedIndex === index) ? primaryColor: secondaryColor}
                            strokeWidth="2"
                        />
                    )
                })}
            </>
        )
    }

    const Axis = ({ points }) => (
        <polyline stroke="rgb(121, 121, 121)" strokeWidth="2" points={points} />
    );

    const XAxis = () => {
        const y = height - padding;
        return (
            <Axis points={`${padding / 4},${y} ${width - padding + 10},${y}`} />
        );
    };

    const YAxis = () => {
        const x = width - padding + 10;
        return (
            <Axis points={`${x},${padding} ${x},${height - padding}`} />
        );
    };

    const LabelsXAxis = () => {
        const y = height - padding + FONT_SIZE * 2;
        return data.map((element, index) => {
        const x = (index / maximumXFromData) * chartWidth + (padding / 2) - FONT_SIZE;
        return (
            <text
                key={index}
                x={x}
                y={y}
                className="chart-label"
                onClick={() => onClick(index)}
                style={{
                    fill: (selectedIndex === index) ? "lightgray" : "gray",
                    fontSize: FONT_SIZE
                }}
            >
                {getShortFormattedDate(element.label)}
            </text>
        );
        });
    };

    const LabelsYAxis = () => {
        const PARTS = 3;
        return new Array(PARTS + 1).fill(0).map((_, index) => {
            const x = width - padding + 25;
            const ratio = index / PARTS;
            const yCoordinate = chartHeight - (chartHeight * ratio) + padding + (4 * FONT_SIZE / 5);
            const value = parseFloat(maximumYFromData * (index / PARTS)).toFixed(precision);
            if (value !== "0") {
                return (
                    <text
                        key={index}
                        x={x}
                        y={yCoordinate}
                        className="chart-label"
                        style={{
                            fontSize: FONT_SIZE
                        }}
                    >
                        {abbreviateNumber(value)}
                    </text>
                );
            }
        });
    };

    const MarkerYAxis = () => {
        const PARTS = 3;
        return new Array(PARTS + 1).fill(0).map((_, index) => {
            const x = width - padding + 10;
            const ratio = index / PARTS;
            const yCoordinate = chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
            const value = parseFloat(maximumYFromData * (index / PARTS)).toFixed(precision);
            if (value !== "0") {
                return (
                    <line
                        key={index}
                        x1={x}
                        x2={x + 10}
                        y1={yCoordinate}
                        y2={yCoordinate}
                        stroke="rgb(121, 121, 121)"
                        strokeWidth="2" 
                    />
                );
            }
        });
    }

    const MarkerXAxis = () => {
        return (
            <>
                {data.map((e, index) => {
                    const x = (index / maximumXFromData) * chartWidth + (padding / 2);
                    const y1 = chartHeight + padding;
                    const y2 = chartHeight + padding + 10;
                    return (
                        <line
                            x1={x}
                            y1={y1}
                            x2={x}
                            y2={y2}
                            stroke="rgb(121, 121, 121)"
                            strokeWidth="2"
                        />
                    )
                })}
            </>
        )
    }

    return (
        <svg viewBox={`0 0 ${width} ${height}`}>
            <XAxis />
            <LabelsXAxis />
            <YAxis />
            <LabelsYAxis />
            <Lines />
            <MarkerXAxis />
            <MarkerYAxis />
            <Points />
        </svg>
    );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  precision: 2
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string
    })
  ).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  precision: PropTypes.number
};

export default LineChart;