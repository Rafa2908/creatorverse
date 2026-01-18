import { useContext } from "react";
import "../App.css";
import { CreatorContext } from "../context/CreatorContext";
import { Link } from "react-router-dom";

const ShowCreators = () => {
  const creatorContext = useContext(CreatorContext);

  const { creators } = creatorContext;

  return (
    <>
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
                  <Link
                    to={`/${creator.id}/${creator.name.replaceAll(" ", "")}`}
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </Link>
                  <Link
                    to={`/${creator.id}/${creator.name.replaceAll(" ", "")}/edit`}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Link>
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
