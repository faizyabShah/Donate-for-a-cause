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
      <div className="cards"></div>
      <CardComponent
    imageUrl="https://example.com/image.jpg"
    title="Example Card"
    text="This is an example of a React Bootstrap Card with an image."
    />
    <div>
      <Footer />
    </div>

    </div>
  );
}

export default Home;
