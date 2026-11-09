import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Steps from "./components/Steps.jsx";
import Features from "./components/Features.jsx";
import Memories from "./components/Memories.jsx";
import Games from "./components/Games.jsx";
import Pricing from "./components/Pricing.jsx";
import Faq from "./components/Faq.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";
import { BackToTop, ScrollProgress } from "./components/ScrollUi.jsx";
import { useWheelSlides } from "./components/Slide.jsx";

export default function App() {
  useWheelSlides();
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* Inicio y «Cómo funciona» forman una pila: la segunda sube y tapa a la primera. */}
        <div className="deck">
          <Hero />
          <Steps />
        </div>
        <Features />
        <Memories />
        <Games />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
