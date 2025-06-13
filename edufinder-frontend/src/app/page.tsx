import Navbar from "./components/Navbar";
import LandingPage from "./sections/LandingPage";


export default function Home() {
  return (
    <div>
      <div className="pb-16">
        <Navbar/>
      </div>
       <h1>
      <LandingPage/>
    </h1>
    </div>
  );
}
