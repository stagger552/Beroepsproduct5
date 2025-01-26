import Header from "./Header";
import Footer from "./footer";
import React from "react";

import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";

function Geschiedenis() {
    return (
        <HeaderProvider>
            <LanguageProvider>
                <div className={`bg-beige dark:bg-zwart`}>
                    <div className="min-h-screen flex flex-col bg-beige dark:bg-zinc-800">
                        {/* Header */}
                        <Header />

                        {/* Main Content */}
                  

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </LanguageProvider>
        </HeaderProvider>
    );
}

export default Geschiedenis