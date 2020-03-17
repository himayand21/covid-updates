import React from "react";

export const Error = (props) => {
    const {handleClick} = props;
	return (
		<div className="screen-loader">
			<div className="loading-section">
				<div className="loading-text">Oh, Snap !</div>
                <button className="standard-button" onClick={handleClick}>
                    Refresh
                </button>
			</div>
		</div>
	);
};
