import React, { useState, useEffect } from 'react';

import { getBaseData } from './api/getBaseData';
import { getWorldData } from './api/getWorldData';
import { getDailyData } from './api/getDailyData';
import { getCountries } from './api/getCountries';
import { getCountryData } from './api/getCountryData';

import { Loader } from "./pages/loader";
import { Status } from "./pages/status";
import { Dashboard } from './pages/dashboard';
import { Footer } from './pages/footer';
import { NavBar } from './pages/navbar';
import { Error } from './pages/error';

import './styles/App.scss';

const App = () => {
	const [data, setData] = useState(null);
	const [worldData, setWorldData] = useState(null);
	const [dailyData, setDailyData] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [type, setType] = useState("confirmed");

	useEffect(() => {
		getData();
	}, []);

	const updateSelectedCountry = async (obj) => {
		setSelectedCountry(obj);
		try {
			const countryData = await getCountryData(obj.value);
			setCountryData(countryData);
		} catch (error) {
			setCountryData(null);
		}
	}

	const getData = async () => {
		setLoading(true);
		try {
			const [
				data,
				worldData,
				dailyData,
				countries,
				countryData
			] = await Promise.all([
				getBaseData(),
				getWorldData(),
				getDailyData(),
				getCountries(),
				getCountryData("IND")
			]);

			setSelectedCountry({
				label: "India",
				value: "IND"
			});
			setCountryData(countryData);
			setCountries(countries);
			setDailyData(dailyData);
			setWorldData(worldData);
			setData(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}

	if (error) return <Error handleClick={getData} />

	if (loading) return <Loader />
	return (
		<div className="app-block">
			<NavBar
				handleClick={getData}
			/>
			{data ?
			<Dashboard
				type={type}
				setType={setType}
				data={data}
			/> : null}
			<Status
				worldData={worldData}
				dailyData={dailyData}
				countryData={countryData}
				type={type}
				countries={countries}
				selectedCountry={selectedCountry}
				updateSelectedCountry={updateSelectedCountry}
			/>
			<Footer {...data} /> 
		</div>
	)
};

export default App;