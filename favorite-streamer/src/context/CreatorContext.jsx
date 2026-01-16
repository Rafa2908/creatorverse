import { useState, createContext, useEffect, useRef } from "react";
import { supabase } from "../client";
import { toast } from "react-toastify";
import "../App.css";

const CreatorContext = createContext({
  creators: [],
  setCreators: () => {},
  creator: null,
  setCreator: () => {},
  isOpen: false,
  setIsOpen: () => {},
  modal: {},
  setModal: () => {},
  openProfile: () => {},
  openEdit: () => {},
  closeModal: () => {},
  showCreatorsRef: null,
  scrollToCreators: () => {},
  message: "",
  setMessage: () => {},
});

const CreatorProvider = ({ children }) => {
  const [creators, setCreators] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [creator, setCreator] = useState(null);

  const [message, setMessage] = useState("");

  const [modal, setModal] = useState({
    type: null,
  });

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("created_at");

      if (!error) setCreators(data);
    };

    fetchCreators();
  }, [creators]);

  useEffect(() => {
    if (!message) return;

    toast(message, {
      type: "error",
      progressClassName: "progress",
    });

    const timer = setTimeout(() => {
      setMessage("");
    }, 200);

    return () => clearTimeout(timer);
  }, [message]);

  const showCreatorsRef = useRef(null);

  const scrollToCreators = () => {
    const offset = 40;
    const element = showCreatorsRef.current;

    if (!element) return;

    const top =
      element.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const openProfile = (creatorId) => {
    const selected = creators.find((c) => c.id === creatorId);
    if (!selected) return;

    setCreator(selected);
    setModal({ type: "profile" });
  };

  const openEdit = (creatorId) => {
    const selected = creators.find((c) => c.id === creatorId);
    if (!selected) return;

    setCreator(selected);
    setModal({ type: "edit" });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  const valueContext = {
    creators,
    setCreators,
    creator,
    setCreator,
    isOpen,
    setIsOpen,
    modal,
    setModal,
    openProfile,
    openEdit,
    closeModal,
    showCreatorsRef,
    scrollToCreators,
    message,
    setMessage,
  };

  return (
    <CreatorContext.Provider value={valueContext}>
      {children}
    </CreatorContext.Provider>
  );
};

export default CreatorProvider;
export { CreatorContext };
