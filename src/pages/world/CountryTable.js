import React, { useState } from "react";
import { getCountryData } from "../../api/getCountryData";
import { getStateData } from "../../api/getStateData";

import Table from '../../components/Table';
import { CountrySummary } from "./CountrySummary";

import { numberWithCommas } from '../../utils';

export const CountryTable = ({
    data
}) => {
    const [stateData, setStateData] = useState({
        countrySummary: [],
        data: []
    });
    const [selectedCountry, setSelectedCountry] = useState(null);

    const fetchCountryDetails = async ({ iso3, country }) => {
        setSelectedCountry(country);
        const [
            countrySummary,
            stateData
        ] = await Promise.all([
            getCountryData(iso3),
            getStateData(iso3)
        ]);
        setStateData({
            countrySummary,
            data: stateData.filter((each) => each.provinceState)
        });
    }

    const resetSelectedCountry = () => {
        setSelectedCountry(null);
        setStateData({
            countrySummary: [],
            data: []
        })
    }

    const countryColumns = [
        {
            header: "Country",
            key: "country",
            accessor: (d) => d.country,
            cell: (value, row) => {
                return (
                    <div
                        className="country-cell"
                        onClick={() => fetchCountryDetails(row)}
                    >
                        {value}
                    </div>
                )
            },
            filterable: true,
            sortable: true
        },
        {
            header: "Confirmed",
            key: "confirmed",
            accessor: (d) => d.confirmed,
            cell: (value) => (Math.sign(value) === 1) ? numberWithCommas(value) : 'N/A',
            sortable: true
        },
        {
            header: "Deaths",
            key: "deaths",
            accessor: (d) => d.deaths,
            cell: (value) => (Math.sign(value) === 1) ? numberWithCommas(value) : 'N/A',
            sortable: true
        },
        {
            header: "Recovered",
            key: "recovered",
            accessor: (d) => d.recovered,
            cell: (value) => (Math.sign(value) === 1) ? numberWithCommas(value) : 'N/A',
            sortable: true
        }
    ];

    const stateColumns = [
        {
            header: "Province / State",
            key: "state",
            accessor: (row) => {
                const {admin2, provinceState} = row;
                const data = [admin2, provinceState].filter(o => o);
                return data.join(", ");
            },
            filterable: true,
            sortable: true
        },
        {
            header: "Confirmed",
            key: "confirmed",
            accessor: (d) => d.confirmed,
            cell: (value) => (Math.sign(value) === 1) ? numberWithCommas(value) : 'N/A',
            sortable: true
        },
        {
            header: "Deaths",
            key: "deaths",
            accessor: (d) => d.deaths,
            cell: (value) => (Math.sign(value) === 1) ? numberWithCommas(value) : 'N/A',
            sortable: true
        },
        {
            header: "Recovered",
            key: "recovered",
            accessor: (d) => d.recovered,
            cell: (value) => (Math.sign(value) === 1) ? numberWithCommas(value) : 'N/A',
            sortable: true
        }
    ];

    return (
        <div className="tables-wrapper">
            <div className={`state-table-container ${selectedCountry ? 'show' : 'hide'}`}>
                <CountrySummary
                    goBack={resetSelectedCountry}
                    data={stateData.countrySummary}
                    country={selectedCountry}
                />
                <Table
                    paginate
                    columns={stateColumns}
                    data={stateData.data}
                    sizePerPage={10}
                    className="state-table"
                />
            </div>
            <div className={`country-table-container ${selectedCountry ? 'hide' : 'show'}`}>
                <Table
                    paginate
                    columns={countryColumns}
                    data={data}
                    sizePerPage={13}
                    className="country-table"
                />
            </div>
        </div>
    )
}