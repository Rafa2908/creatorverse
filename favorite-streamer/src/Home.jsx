import "./App.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import { CreatorContext } from "./context/CreatorContext";

const Home = () => {
  const creatorContext = useContext(CreatorContext);

  const { modal, setModal, showCreatorsRef, scrollToCreators } = creatorContext;

  const openAddCreatorForm = () => {
    setModal({ type: "add" });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="dark"
      />
      {modal.type === "add" && <AddCreator />}
      <div className="home--container">
        <h1>Creatorverse</h1>
        <div className="home--buttons--container">
          <Link className="home--buttons" onClick={scrollToCreators}>
            View All Creators
          </Link>
          <button className="home--buttons" onClick={openAddCreatorForm}>
            Add a Creator
          </button>
        </div>
      </div>
      <div ref={showCreatorsRef}>
        <ShowCreators />
      </div>
    </>
  );
};

export default Home;
