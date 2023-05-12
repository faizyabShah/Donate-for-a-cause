import "./Home.scss";
import { useUserContext } from "../hooks/userContextHook";
import ExampleCard from "../components/CardComponent";

function Home() {
  const { isLoggedIn, user } = useUserContext();

  return (
    <div className="container">
      <div className="info">
        <h1>Donate for a cause</h1>
      </div>
      <div className="cards"></div>
      <ExampleCard title="manahil" body="test" footer="shoes" />
    </div>
  );
}

export default Home;
