import React from 'react';
import './Information.css';

const Information = () => {
    return (
        <div className="information">
            <p>
                <b>GET user's exercise log:</b>&nbsp;&nbsp;&nbsp;<span className="endpoint">GET /api/users/:_id/logs?[from][&to][&limit]</span>
            </p>
            <p>
                <b>[ ]</b> = <span>optional</span>
            </p>
            <p>
                <b>from, to</b> = <span>dates (yyyy-mm-dd); </span><b>limit</b> = <span>number</span>
            </p>
        </div>
    )
}

export default Information
