import HomeMain from "./SitesComponents/Home/HomeMain";
import Header from "./Header";
import Footer from "./footer";
import Infocards from "./SitesComponents/Home/Instructions";
import React from 'react';

function Home() {
  return (
    
    <div>
      <Header />
      <HomeMain />
      <Infocards />
      <Footer />
    </div>)
}

export default Home;