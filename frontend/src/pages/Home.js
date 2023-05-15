import "./Home.scss";
import { useUserContext } from "../hooks/userContextHook";
import CardComponent from "../components/CardComponent";
import Footer from "../components/Footer";

function Home() {
  const { isLoggedIn, user } = useUserContext();

  return (
    <div className="container">
      <div className="info">
        {/* <h1>DonateLink</h1> */}
        <h1 className="saying">Great Futures are built</h1>
        <h1 className="saying">with small donations.</h1>
      </div>
      <div className="cards">
      <CardComponent
        title="Join us to make a difference"
        text="We work to connect you to the causes you care about. "
        className="midCard"
      />
      </div>
      
    <div className="Footer">
      <Footer />
    </div>

    </div>
  );
}

export default Home;
