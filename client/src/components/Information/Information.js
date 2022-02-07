import React from 'react';
import './Information.css';

const Information = () => {
    return (
        <div className="information">
            <p>
                <b>GET user's exercise log:</b>&nbsp;&nbsp;&nbsp;<span className="endpoint">GET /api/users/:_id/logs?[from][&to][&limit]</span>
            </p>
        </div>
    )
}

export default Information
