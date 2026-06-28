import Navbar from "../components/Navbar";
import ScrollLogoHero from "../components/ScrollLogoHero";
import ScrollPictures from "../components/ScrollPictures";
import StripedPoster from "../components/StripedPoster";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <div id="hero">
        <ScrollLogoHero />
      </div>
      <div id="offer">
        <ScrollPictures />
      </div>
      <div id="menus">
        <StripedPoster />
      </div>
      <Footer />
    </main>
  );
}
