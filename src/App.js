import React, { useState, useEffect } from 'react';

import { getBaseData } from './api/getBaseData';
import { dashboardCountKeys } from './constants/dashboard';

import { Loader } from "./pages/loader";
import { MapChart } from "./pages/map";
import { StatusTable } from "./pages/statusTable";

import {capitalizeFirst} from "./utils";

import './styles/App.scss';

const App = () => {
	const [data, setData] = useState(null);
	const [type, setType] = useState("confirmed");

	useEffect(() => {
		(async () => {
			const data = await getBaseData();
			setData(data);
		})();
	}, []);

	if (!data) return <Loader />
	return (
		<div className="app-block">
			<div className="dashboard-counts">
				{dashboardCountKeys.map((dashboardCountKey) => {
					return (
						<div
							className={`dashboard-count dashboard-count-${dashboardCountKey} ${type===dashboardCountKey ? "dashboard-count-active" : ""}`}
							onClick={() => setType(dashboardCountKey)}
						>
							<div className="dashboard-count-label">{capitalizeFirst(dashboardCountKey)}</div>
							<div className="dashboard-count-value">{data[dashboardCountKey].value}</div>
						</div>
					);
				})}
			</div>
			<div className="map-block">
				<div className="map-container">
					<MapChart type={type} />
				</div>
				<div className="country-table">
					<StatusTable type={type} />
				</div>
			</div>
		</div>
	)
};

export default App;