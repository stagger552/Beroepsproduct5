import HomeMain from "./SitesComponents/Home/HomeMain";
import Header from "./Header";
import Footer from "./footer";
import Infocards from "./SitesComponents/Home/Instructions";
import HeaderMain from "./SitesComponents/Home/HeaderMain";
import LoadingScreen from "./LoadingScreen";
import React from 'react';
import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";
function Home() {
    const [loading, setLoading] = React.useState(true);

    // Simulate loading time for demonstration
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Duration of loading

        return () => clearTimeout(timer);
    }, []);


    return (
        <div>
            <HeaderProvider>
                <LanguageProvider>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <div className="min-h-screen flex flex-col bg-beige dark:bg-zinc-800">
                            {/* Header */}
                            <Header />

                            {/* Main content */}
                            <div className="flex-grow">
                                <HeaderMain />
                                <HomeMain />
                                <Infocards />
                            </div>
                            {/* Footer */}
                            <Footer />
                        </div>
                    )}
                </LanguageProvider>
            </HeaderProvider>

        </div>

    );
}

export default Home;