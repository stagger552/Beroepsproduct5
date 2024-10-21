import Header from "./Header";
import Footer from "./footer";
import React, { useState } from 'react';
import Settings from './SitesComponents/Dashboard/Settings'
import QuickData from './SitesComponents/Dashboard/QuickData'
import DashboardData from './SitesComponents/Dashboard/DashboardData'
import Seperator from './SitesComponents/Dashboard/Seperator'
import ArduinoData from './SitesComponents/Dashboard/ArduinoData'
import { DashboardProvider } from "./SitesComponents/Dashboard/DashboardContext"
import { HeaderProvider } from "./headerContext";

function Dashboard() {
    return (
        <HeaderProvider>
            <DashboardProvider>
            <div className={`bg-beige dark:bg-zwart `}>
                    <div className="min-h-screen flex flex-col bg-beige dark:bg-gray-800">
                        {/* Header */}
                        <Header />

                        {/* Main content */}
                        <div className="flex-grow dark:bg-gray-800">
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
        </HeaderProvider>
    )
}

export default Dashboard;