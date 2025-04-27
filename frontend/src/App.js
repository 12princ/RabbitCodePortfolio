import React, { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Marketing from "./components/Marketing";
import ProjectProcess from "./components/ProjectProcess";

function App() {
  useEffect(() => {
    // Push a new entry onto the history stack
    window.history.pushState(null, null, window.location.href);

    // Handle the popstate event (back/forward button clicks)
    const handlePopstate = () => {
      // Push another entry to prevent going back
      window.history.pushState(null, null, window.location.href);
    };

    // Add event listener for back/forward button clicks
    window.addEventListener('popstate', handlePopstate);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <ProjectProcess/>
      <Marketing />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;