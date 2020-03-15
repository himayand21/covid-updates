import React, { useState, useEffect } from "react";

export const Loader = () => {
	const [dotCount, setDotCount] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setDotCount(dotCount => {
				if (dotCount.length === 3) return "";
				else return dotCount + ".";
			});
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="screen-loader">
			<div className="loading-section">
				<div className="loading-text">{`Loading ${dotCount}`}</div>
			</div>
		</div>
	);
};
