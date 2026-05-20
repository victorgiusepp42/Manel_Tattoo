import { Route, Routes } from "react-router-dom";
import { Artist } from "./components/Artist";
import { BrandBackground } from "./components/BrandBackground";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { Ticker } from "./components/Ticker";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { NotFound } from "./pages/NotFound";

function HomePage() {
  return (
    <>
      <main className="relative z-[1]">
        <Hero />
        <Portfolio />
        <Artist />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <BrandBackground />
      <CustomCursor />
      <Ticker />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppFloat />
    </>
  );
}
