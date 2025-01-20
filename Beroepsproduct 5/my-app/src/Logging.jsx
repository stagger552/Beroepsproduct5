import Header from "./Header";
import Footer from "./footer";
import React from "react";

import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";

function Logging() {
    return (
        <HeaderProvider>
            <LanguageProvider>
                <div className={`bg-beige dark:bg-zwart`}>
                    <div className="min-h-screen flex flex-col bg-beige dark:bg-zinc-800">
                        {/* Header */}
                        <Header />

                        {/* Main Content */}
                        <div className="flex-grow mt-16">
                            <h1 className="text-2xl text-center text-gray-800 dark:text-gray-200">
                                Logging Page
                            </h1>
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                This is the logging page where you can view and manage logs.
                            </p>
                        </div>

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </LanguageProvider>
        </HeaderProvider>
    );
}

export default Logging;
