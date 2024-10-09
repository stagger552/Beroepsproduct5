import Header from "./Header";
import Footer from "./footer";
import React, { useState } from 'react';
import Settings from './SitesComponents/Dashboard/Settings'
import QuickData from './SitesComponents/Dashboard/QuickData'
import DashboardData from './SitesComponents/Dashboard/DashboardData'
import Seperator from './SitesComponents/Dashboard/Seperator'
import ArduinoData from './SitesComponents/Dashboard/ArduinoData'
import { DashboardProvider  } from "./SitesComponents/Dashboard/DashboardContext"


function Dashboard() {

    return (
        <DashboardProvider>
            <div>
                <div className="min-h-screen flex flex-col">
                    {/* Header */}
                    <Header />

                    {/* Main content */}
                    <div className="flex-grow">
                        <Settings />
                        <QuickData />
                        <DashboardData />
                        <Seperator />
                        <ArduinoData />
                    </div>


                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </DashboardProvider>
    )
}

export default Dashboard;