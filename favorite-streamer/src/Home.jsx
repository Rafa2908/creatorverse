import "./App.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import { CreatorContext } from "./context/CreatorContext";

const Home = () => {
  const creatorContext = useContext(CreatorContext);

  const { showCreatorsRef, scrollToCreators } = creatorContext;

  return (
    <>
      <div className="home--container">
        <h1>Creatorverse</h1>
        <div className="home--buttons--container">
          <Link className="home--buttons" onClick={scrollToCreators}>
            View All Creators
          </Link>
          <Link className="home--buttons" to={"/add"}>
            Add a Creator
          </Link>
        </div>
      </div>
      <div ref={showCreatorsRef}>
        <ShowCreators />
      </div>
    </>
  );
};

export default Home;
