import React, {useState} from 'react';
import Moment from 'moment';
import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart
} from 'recharts';

import {chunk} from "../../utils";

export const DailyChart = (props) => {
    const [weekNo, setWeekNo] = useState(0);
    const { receivedData } = props;
    const chunkedArray = chunk(receivedData, 7);
    const data = chunkedArray[weekNo].reverse();

    const formattedData = data.map((each) => ({
        ...each,
        reportDate: Moment(each.reportDate).format('DD-MMM')
    }));

    const yAxisFormatter = (value) => {
        if (value > 1000) {
            return `${Math.round((value / 1000), 2)}k`
        }
        return value
    }

    const handleNext = () => setWeekNo(weekNo - 1);
    const handlePrevious = () => setWeekNo(weekNo + 1);

    return (
        <div>
            <div className="block-header">
                <div>
                    Daily Growth Rate
                </div>
                <div className="button-container">
                    <button
                        className="standard-button"
                        disabled={ weekNo === data.length }
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>
                    <button
                        className="standard-button"
                        disabled={ weekNo === 0 }
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="status-daily-chart">
                <ResponsiveContainer>
                    <AreaChart
                        data={formattedData}
                    >
                        <defs>
                            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#74abec" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#74abec" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#17bd51" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#17bd51" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="reportDate" />
                        <YAxis tickFormatter={yAxisFormatter}/>
                        <Tooltip />
                        <Area type="monotone" name="Confirmed" dataKey="totalConfirmed" stroke="#74abec" fillOpacity={1} fill="url(#colorConfirmed)" />
                        <Area type="monotone" name="Recovered" dataKey="totalRecovered" stroke="#17bd51" fillOpacity={1} fill="url(#colorRecovered)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
