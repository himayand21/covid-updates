import React, { useState, useEffect } from 'react';

import { getBaseData } from './api/getBaseData';
import { getWorldData } from './api/getWorldData';
import { getDailyData } from './api/getDailyData';
import { getCountries } from './api/getCountries';
import { getCountryData } from './api/getCountryData';

import { Loader } from "./pages/loader";
import { Map } from "./pages/status/Map";
import { Dashboard } from './pages/dashboard';
import { Footer } from './pages/footer';
import { NavBar } from './pages/navbar';
import { Error } from './pages/error';
import { CountryStatus } from './pages/status/CountryStatus';
import { Header } from './pages/status/Header';

import './styles/App.scss';

const App = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [worldData, setWorldData] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [type, setType] = useState("confirmed");

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setLoading(true);
		try {
			const [
				dashboardData,
				worldData
			] = await Promise.all([
				getBaseData(),
				getWorldData()
			]);
			setSelectedCountry({
				iso3: "IND",
				name: "India"
			});
			setWorldData(worldData);
			setDashboardData(dashboardData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}

	if (error) return <Error handleClick={getData} />
	if (loading) return <Loader />

	if (!worldData) return null;

    let data = {};
    worldData.forEach((currVal) => {
        if (!data[currVal.iso3]) {
            data[currVal.iso3] = {
                recovered: currVal.recovered,
                iso3: currVal.iso3,
                deaths: currVal.deaths,
				confirmed: currVal.confirmed,
				country: currVal.countryRegion,
            }
        } else {
            data[currVal.iso3] = {
                iso3: currVal.iso3,
                recovered: currVal.recovered + data[currVal.iso3].recovered,
                deaths: currVal.deaths + data[currVal.iso3].deaths,
				confirmed: currVal.confirmed + data[currVal.iso3].confirmed,
				country: data[currVal.iso3].country
            }
        }
	});

	return (
		<div className="app-block">
			<div className="app-container">
				{dashboardData &&
					<Dashboard
						type={type}
						setType={setType}
						data={dashboardData}
					/>
				}
				<div className="map-container">
					<NavBar handleClick={getData} />
					<header className="header-container">
						<CountryStatus
							data={data}
							type={type}
							country={selectedCountry}
						/>
						<Header lastUpdate={dashboardData.lastUpdate} />
					</header>
					<Map
						data={data}
						type={type}
						selectedCountry={selectedCountry}
						setSelectedCountry={setSelectedCountry}
					/>
				</div>
			</div>
			<Footer {...dashboardData} /> 
		</div>
	)
};

export default App;