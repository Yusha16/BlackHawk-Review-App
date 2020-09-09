import React from 'react'
import { connect } from "react-redux";

export const Dashboard = () => (
    <div className="row">
        
    </div>
)

function mapStateToProps(state) {
    return {
    }
}

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard)