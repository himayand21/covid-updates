import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { scalePow } from "d3-scale";

import { colors } from "../../constants/dashboard";

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
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#d8d8d8"}>{payload.provinceState || payload.countryRegion}</text>
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-27} textAnchor={textAnchor} fill="#a8a8a8">
                {payload.countryRegion}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-9} textAnchor={textAnchor} fill={colors.confirmed.hover}>
                {payload.confirmed}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={9} textAnchor={textAnchor} fill={colors.deaths.hover}>
                {payload.deaths}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={27} textAnchor={textAnchor} fill={colors.recovered.hover}>
                {payload.recovered}
            </text>
        </g>
    );
};


export const WorldChart = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { type, receivedData } = props;

    if (!receivedData) return null;

    const maxValues = receivedData.map((each) => each[type]);
    const maxValue = Math.max(...maxValues);

    const colorScale = scalePow()
        .exponent(0.1)
        .domain([0, maxValue])
        .range(colors[type].range);

    const percentScale = scalePow()
        .exponent(0.5)
        .domain([0, maxValue])
        .range([0, 100]);

    const formattedData = receivedData.map((each) => {
        return ({
            ...each,
            fill: colorScale(each[type]),
            rate: percentScale(each[type])
        })
    })

    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <div className="block-header">
                Overall Status
            </div>
            <div className="status-chart">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={formattedData}
                            cx={'50%'}
                            cy={'50%'}
                            innerRadius={window.innerWidth > 735 ? 100 : 60}
                            outerRadius={window.innerWidth > 735 ? 120 : 70}
                            fill="#8884d8"
                            dataKey="rate"
                            onMouseEnter={onPieEnter}
                        >
                            {formattedData.map((entry, index) =>
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            )}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
