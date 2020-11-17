import React from "react";

const linkedInLink = "https://www.linkedin.com/in/himayan-debnath/";

export const Footer = (props) => {
    const { source } = props;
    return (
        <footer className="footer-container">
            <div className="source">
                <div>
                    <span>Source -</span>
                    <a href={source} target="blank">Muhammad Mustadi</a>
                </div>
            </div>
            <div className="copyright">
                <a href={linkedInLink} target="blank">Himayan Debnath</a>
                <span>© 2020</span>
            </div>
        </footer>
    );
};
