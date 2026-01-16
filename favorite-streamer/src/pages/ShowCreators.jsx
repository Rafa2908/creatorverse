import { useContext } from "react";
import "../App.css";
import ViewCreator from "./ViewCreator";
import EditCreator from "./EditCreator";
import { CreatorContext } from "../context/CreatorContext";

const ShowCreators = () => {
  const creatorContext = useContext(CreatorContext);

  const { creators, openProfile, openEdit, modal } = creatorContext;

  return (
    <>
      {modal.type == "profile" && <ViewCreator />}
      {modal.type == "edit" && <EditCreator />}
      <div className="view--creators--container">
        {creators.map((creator) => {
          return (
            <div className="view--creator--card" key={creator.id}>
              <img
                src={`${creator.imageUrl}`}
                alt=""
                className="view--creator--image"
              />
              <section className="view--creator--card--title">
                <h2>{creator.name}</h2>
                <article className="view--creator--icons">
                  <i
                    className="fa-solid fa-circle-info"
                    onClick={() => openProfile(creator.id)}
                  ></i>
                  <i
                    className="fa-solid fa-pencil"
                    onClick={() => openEdit(creator.id)}
                  ></i>
                </article>
              </section>
              <div className="view--creators--socials">
                {creator.socials.map((social, index) => {
                  return (
                    <a
                      href={`http://www.${social.platform}.com/${social.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <i className={`fa-brands fa-${social.platform}`}></i>
                    </a>
                  );
                })}
              </div>
              <div className="view--creators--description">
                <p className="view--creators--truncate">
                  {creator.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowCreators;
