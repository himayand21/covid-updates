import React, {useState, useEffect} from 'react';

import { getBaseData } from './api/getBaseData';
import { dashboardCountKeys } from './constants/dashboard';

import {Loader} from "./pages/loader";

import './styles/App.scss';

const App = () => {
	const [data, setData] = useState(null);
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
						<div className="dashboard-count">
							<div className="dashboard-count-label">{dashboardCountKey}</div>
							<div className={`dashboard-count-value dashboard-count-${dashboardCountKey}`}>{data[dashboardCountKey].value}</div>
						</div>
					);
				})}
			</div>
		</div>
	)
};

export default App;