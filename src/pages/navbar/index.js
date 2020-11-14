import React from "react";

export const NavBar = (props) => {
    const { handleClick } = props;
    return (
        <nav className="nav-container">
            <div className="button-container">
                <button className="standard-button" onClick={handleClick}>
                    Refresh
                </button>
            </div>
        </nav>
    );
};
