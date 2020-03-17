import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import Select from 'react-select';

import { capitalizeFirst } from "../../utils";

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 0) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 0) * cos;
    const my = cy + (outerRadius + 60) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#d8d8d8"}>{payload.country}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-9} textAnchor={textAnchor} fill={fill}>
                {capitalizeFirst(payload.label)}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={9} textAnchor={textAnchor} fill={"#a8a8a8"}>
                {payload.value}
            </text>
        </g>
    );
};


export const CountryChart = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const {
        receivedData,
        countries,
        updateSelectedCountry,
        selectedCountry
    } = props;

    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <div className="block-header">
                <div>
                    Country-wise Status
                </div>
                <div className="select-container">
                    <Select
                        options={countries}
                        onChange={updateSelectedCountry}
                        value={selectedCountry}
                    />
                </div>
            </div>
            <div className="status-chart">
                {receivedData ?
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={receivedData}
                                cx={'50%'}
                                cy={'50%'}
                                innerRadius={window.innerWidth > 735 ? 100 : 60}
                                outerRadius={window.innerWidth > 735 ? 120 : 70}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            >
                                {receivedData.map((entry, index) =>
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                )}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer> :
                    <div className="no-data">
                        No data found.
                    </div>
                }
            </div>
        </div>
    )
}
