import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddCreator from "./pages/AddCreator";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/:id/:creatorName" element={<ViewCreator />} />
        <Route path="/:id/:creatorName/edit" element={<EditCreator />} />
      </Routes>
    </div>
  );
};

export default App;
