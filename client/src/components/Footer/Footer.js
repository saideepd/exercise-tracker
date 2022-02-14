import React from 'react'
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="creator">
                 By <a href="https://github.com/saideepd" title="View Saideep's GitHub projects" target="_blank" rel="noreferrer">Saideep Dicholkar </a> <img alt="GitHub Logo" src="https://i.ibb.co/W0Jhcgj/github-icon-grey.png" />
            </div>
            <div className="icon-attribution">
                <a href="https://www.flaticon.com/free-icons/exercise" title="Exercise Icons" target="_blank" rel="noreferrer">Icons by Freepik - Flaticon</a>
            </div>
        </div>
    )
}

export default Footer
