import { useState, useContext } from "react";
import { supabase } from "../client";
import "../App.css";
import { CreatorContext } from "../context/CreatorContext";

const AddCreator = () => {
  const creatorContext = useContext(CreatorContext);

  // eslint-disable-next-line no-unused-vars
  const { creators, setCreators, setModal, setMessage } = creatorContext;

  const [creatorData, setCreatorData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    socials: [],
  });

  const isFormEmpty =
    !creatorData.name ||
    !creatorData.description ||
    !creatorData.imageUrl ||
    creatorData.socials.length !== 3 ||
    creatorData.socials.some((s) => !s.url);

  const updateData = (e) => {
    const { name, value } = e.target;
    setCreatorData((prev) => ({ ...prev, [name]: value }));
  };

  const updateSocials = (platform, value) => {
    setCreatorData((prev) => {
      const existing = prev.socials.find(
        (social) => social.platform == platform
      );

      if (existing) {
        return {
          ...prev,
          socials: prev.socials.map((social) =>
            social.platform == platform ? { ...social, url: value } : social
          ),
        };
      }

      return {
        ...prev,
        socials: [...prev.socials, { platform, url: value }],
      };
    });
  };

  const addCreator = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("creators")
      .insert([creatorData])
      .select("*")
      .single();

    if (error) console.log(error);

    try {
      setMessage("Creator added.");
      setCreators((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }

    setCreatorData({
      name: "",
      imageUrl: "",
      description: "",
      socials: [{ platform: "", url: "" }],
    });
    setModal({ type: null });
  };

  return (
    <div className="add--creator--container">
      <form className="add--creator--form" onSubmit={addCreator}>
        <h2>Add Your Favorite Content Creator</h2>
        <div className="creator--form--content">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Content Creator's Name"
            autoComplete="off"
            onChange={updateData}
            value={creatorData.name}
          />
        </div>
        <div className="creator--form--content">
          <label>Image</label>
          <p>
            Provide a link to an image of your creator. Be sure to include the
            http://
          </p>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image of your Content Creator"
            onChange={updateData}
            value={creatorData.imageUrl}
          />
        </div>
        <div className="creator--form--content">
          <label>Description</label>
          <p>Provide a description of the creator</p>
          <textarea
            name="description"
            placeholder="Description"
            onChange={updateData}
            value={creatorData.description}
          ></textarea>
        </div>
        <div className="creator--form--content">
          <h3>Social Media Links</h3>
          <p className="creator--form--content--text">
            Provide at least one of the creator's social media accounts
          </p>
          <div className="creator--social--accounts">
            <div className="creator--social--accounts--title">
              <i className="fa-brands fa-youtube"></i>
              <p>Youtube</p>
            </div>
            <p>The creator's Youtube account (without the @)</p>
            <input
              type="text"
              placeholder="Youtube account..."
              onChange={(e) => updateSocials("youtube", e.target.value)}
              value={
                creatorData.socials.find(
                  (social) => social.platform === "youtube"
                )?.url || ""
              }
            />
          </div>
          <div className="creator--social--accounts">
            <div className="creator--social--accounts--title">
              <i className="fa-brands fa-twitter"></i>
              <p>Twitter</p>
            </div>
            <p>The creator's Twitter account (without the @)</p>
            <input
              type="text"
              placeholder="Twitter account..."
              onChange={(e) => updateSocials("twitter", e.target.value)}
              value={
                creatorData.socials.find(
                  (social) => social.platform === "twitter"
                )?.url || ""
              }
            />
          </div>
          <div className="creator--social--accounts">
            <div className="creator--social--accounts--title">
              <i className="fa-brands fa-instagram"></i>
              <p>Instagram</p>
            </div>
            <p>The creator's Instagram account (without the @)</p>
            <input
              type="text"
              placeholder="Instagram account..."
              onChange={(e) => updateSocials("instagram", e.target.value)}
              value={
                creatorData.socials.find(
                  (social) => social.platform === "instagram"
                )?.url || ""
              }
            />
          </div>
        </div>
        <div className="creator--buttons--container">
          <button
            type="submit"
            className="creator--form--button"
            disabled={isFormEmpty}
          >
            Add Creator
          </button>
          <button
            type="button"
            className="creator--form--button--secondary"
            onClick={() => setModal({ type: null })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
