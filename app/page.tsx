import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StatStrip from "./components/StatStrip";
import CarBrands from "./components/CarBrands";
import Features from "./components/Features";
import Customize from "./components/Customize";
import EventsSpotlight from "./components/EventsSpotlight";
import Achievements from "./components/Achievements";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import RevealRoot from "./components/RevealRoot";

export default function Home() {
  return (
    <RevealRoot>
      <Nav />
      <main>
        <Hero />
        <StatStrip />
        <CarBrands />
        <Features />
        <Customize />
        <EventsSpotlight />
        <Achievements />
        <Pricing />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </RevealRoot>
  );
}
