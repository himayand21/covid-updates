import React, { useState, useEffect } from 'react';

import { getBaseData } from './api/getBaseData';
import { getWorldData } from './api/getWorldData';
import { getDailyData } from './api/getDailyData';

import { Loader } from "./pages/loader";
import { Map } from "./pages/status/Map";
import { Dashboard } from './pages/dashboard';
import { Footer } from './pages/footer';
import { NavBar } from './pages/navbar';
import { Error } from './pages/error';
import { Header } from './pages/header';
import { DailyChart } from './pages/charts/DailyChart';

import { CountryStatus } from './pages/status/CountryStatus';
import { CountryTable } from './pages/world/CountryTable';

import './styles/App.scss';

const App = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [worldData, setWorldData] = useState(null);
	const [dailyData, setDailyData] = useState(null);

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
				worldData,
				dailyData
			] = await Promise.all([
				getBaseData(),
				getWorldData(),
				getDailyData()
			]);
			setSelectedCountry({
				iso3: "IND",
				name: "India"
			});
			setWorldData(worldData);
			setDashboardData(dashboardData);
			setDailyData(dailyData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}

	if (error) return <Error handleClick={getData} />
	if (loading) return <Loader />

	if (!worldData || !dashboardData || !dailyData) return null;

    let data = {};
    worldData.forEach((currVal) => {
        if (!data[currVal.iso3]) {
            data[currVal.iso3] = {
                recovered: currVal.recovered,
                iso3: currVal.iso3,
				deaths: currVal.deaths,
				active: currVal.active,
				confirmed: currVal.confirmed,
				country: currVal.countryRegion,
            }
        } else {
            data[currVal.iso3] = {
                iso3: currVal.iso3,
                recovered: currVal.recovered + data[currVal.iso3].recovered,
				deaths: currVal.deaths + data[currVal.iso3].deaths,
				active: currVal.active + data[currVal.iso3].active,
				confirmed: currVal.confirmed + data[currVal.iso3].confirmed,
				country: data[currVal.iso3].country
            }
        }
	});

	return (
		<div className="app-block">
			<div className="app-container">
				<div className="dashboard-container">
					<div className="left-container">
						<CountryTable data={Object.values(data)} />
					</div>
					<div className="right-container">
						<NavBar handleClick={getData} />
						<Dashboard
							type={type}
							setType={setType}
							data={dashboardData}
						/>
						<header className="header-container">
							<CountryStatus
								data={data}
								type={type}
								country={selectedCountry}
							/>
							<Header
								lastUpdate={dashboardData.lastUpdate}
								countries={Object.values(data)}
								selectedCountry={selectedCountry}
								setSelectedCountry={setSelectedCountry}
							/>
						</header>
						<Map
							data={data}
							type={type}
							selectedCountry={selectedCountry}
							setSelectedCountry={setSelectedCountry}
						/>
					</div>
				</div>
				<DailyChart data={dailyData} />
			</div>
			<Footer {...dashboardData} /> 
		</div>
	)
};

export default App;