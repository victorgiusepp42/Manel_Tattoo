import { Route, Routes } from "react-router-dom";
import { Artist } from "./components/Artist";
import { BrandBackground } from "./components/BrandBackground";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { NextTrips } from "./components/NextTrips";
import { Portfolio } from "./components/Portfolio";
import { Ticker } from "./components/Ticker";
import { SocialFloats } from "./components/SocialFloats";
import { NotFound } from "./pages/NotFound";

function HomePage() {
  return (
    <>
      <main className="relative z-[1]">
        <Hero />
        <Portfolio />
        <Artist />
        <NextTrips />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <BrandBackground />
      <Ticker />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SocialFloats />
    </>
  );
}
