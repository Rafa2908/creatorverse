import { useContext, useEffect, useState } from "react";
import { CreatorContext } from "../context/CreatorContext";
import DeleteCreator from "./DeleteCreator";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";

const ViewCreator = () => {
  const createContext = useContext(CreatorContext);

  const { creator, setCreator } = createContext;

  const creatorID = useParams();

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", creatorID.id)
        .single();

      if (error) console.log(error);

      try {
        setCreator(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCreator();
  }, [setCreator, creatorID.id]);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      {isDeleteOpen && (
        <DeleteCreator
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteOpen={isDeleteOpen}
        />
      )}
      <div className="creator--main--container">
        <div className="creator--body--overlay">
          <span>
            <Link to={"/"}>
              <i className="fa-regular fa-circle-xmark"></i>
            </Link>
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
            <Link
              className="creator--action--button--primary"
              to={`/${creator?.id}/${creator?.name.replaceAll(" ", "")}/edit`}
            >
              Edit
            </Link>
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
