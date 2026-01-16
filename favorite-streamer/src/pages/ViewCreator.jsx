import { useContext, useState } from "react";
import { CreatorContext } from "../context/CreatorContext";
import EditCreator from "./EditCreator";
import DeleteCreator from "./DeleteCreator";

const ViewCreator = () => {
  const createContext = useContext(CreatorContext);

  const { creator, modal, openEdit, closeModal } = createContext;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      {modal.type == "edit" && <EditCreator />}
      {isDeleteOpen && (
        <DeleteCreator
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteOpen={isDeleteOpen}
        />
      )}
      <div className="creator--main--container">
        <div className="creator--body--overlay">
          <span>
            <i className="fa-regular fa-circle-xmark" onClick={closeModal}></i>
          </span>
          <div className="creator--body--container">
            <div className="creator--body--image">
              <img src={creator?.imageUrl} alt="" />
            </div>
            <div className="creator--body--text">
              <h2>{creator?.name}</h2>
              <p className="creator--description">{creator?.description}</p>
              <div className="creator--body--socials">
                {creator?.socials.map((social, index) => {
                  return (
                    <span key={index}>
                      <i className={`fa-brands fa-${social.platform}`}></i>{" "}
                      <a
                        href={`http://www.${social.platform}.com/${social.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{social.url}
                      </a>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="creator--action--buttons">
            <button
              className="creator--action--button--primary"
              onClick={() => openEdit(creator.id)}
            >
              Edit
            </button>
            <button
              className="creator--action--button--secondary"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCreator;
