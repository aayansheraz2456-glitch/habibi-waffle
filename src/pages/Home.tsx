import Navbar from "../components/Navbar";
import ScrollStory from "../components/ScrollStory";
import StripedPoster from "../components/StripedPoster";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <div id="story">
        <ScrollStory />
      </div>
      <div id="menus">
        <StripedPoster />
      </div>
      <Footer />
    </main>
  );
}
