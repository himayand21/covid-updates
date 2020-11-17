import React, { useEffect, useState } from 'react';

import LineChart from './LineChart';
import { capitalizeFirst, numberWithCommas } from '../../utils';
import LeftArrow from '../../assets/leftArrow.svg';

const CHART_LENGTH = 10;

const ChartWrapper = ({
    data,
    primaryColor,
    secondaryColor,
    yKey
}) => {
    const [selectedIndex, setSelectedIndex] = useState(9);
    const [pageNo, setPageNo] = useState(0);
    const formattedData = data.slice((pageNo * CHART_LENGTH), ((pageNo + 1) * CHART_LENGTH)).reverse();
    
    useEffect(() => {
        setSelectedIndex(formattedData.length - 1);
    }, [pageNo]);

    return (
        <div className="chart-wrapper">
            <div className="chart-header">
                <div className="chart-summary-container">
                    <div className="chart-value">
                        {numberWithCommas(formattedData[selectedIndex]?.[yKey])}
                    </div>
                    <div className="chart-type">
                        {capitalizeFirst(yKey)}
                    </div>
                </div>
                <div className="chart-action-container">
                    <button
                        onClick={() => setPageNo(pageNo + 1)}
                        disabled={!data[((pageNo + 1) * CHART_LENGTH) + 1]}
                    >
                        <img src={LeftArrow} />
                    </button>
                    <button
                        onClick={() => setPageNo(pageNo - 1)}
                        disabled={!data[(pageNo * CHART_LENGTH) - 1]}
                    >
                        <img src={LeftArrow} />
                    </button>
                </div>
            </div>
            <LineChart
                width={700}
                height={300}
                data={formattedData}
                precision={0}
                yKey={yKey}
                selectedIndex={selectedIndex}
                onClick={(index) => setSelectedIndex(index)}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
            />
        </div>
    );
};

export default ChartWrapper;