import React from "react";

export const NavBar = (props) => {
    const { handleClick } = props;
    return (
        <nav className="nav-container">
            <header className="nav-header">
                Covid-19 Statistics
			</header>
            <div className="button-container">
                <button className="standard-button" onClick={handleClick}>
                    Refresh
                </button>
            </div>
        </nav>
    );
};
