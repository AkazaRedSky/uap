import React from 'react';
import Offer from './offers';
import Recommended from './recommended';
import Navigation from './navigation';
import Popular from './popular/popular';

function Dashboard() {
    return(
        <>
        <Navigation/>
        <Recommended />
        <Offer />
        <Popular />
        </>
    )
}

export default Dashboard;