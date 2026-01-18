import { useContext } from "react";
import "../App.css";
import { CreatorContext } from "../context/CreatorContext";
import { supabase } from "../client";

const DeleteCreator = ({ isDeleteOpen, setIsDeleteOpen }) => {
  const creatorContext = useContext(CreatorContext);

  const { creator, setCreators, setMessage, navigate } = creatorContext;

  const deleteCreator = async (creatorId) => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", creatorId);

    if (error) console.log(error);

    try {
      setMessage("Creator deleted.");
      setCreators((prev) => prev.filter((creator) => creator.id != creatorId));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="warning--popup--container">
      <div className="warning--popup--overlay">
        <div className="warning--popup--text">
          <div className="warning--popup--title">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <h1>WARNING</h1>
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <p>Are you sure you want to delete Creator???</p>
        </div>
        <div className="warning--popup--buttons">
          <button
            className="warning--button--primary"
            onClick={() => setIsDeleteOpen(!isDeleteOpen)}
          >
            Let them stay
          </button>
          <button
            className="warning--button--secondary"
            onClick={() => deleteCreator(creator.id)}
          >
            Trash it forever
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCreator;
