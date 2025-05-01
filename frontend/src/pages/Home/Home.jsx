import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal"; // 🔥 Correct: Modal (not Model)
import { useNavigate } from "react-router-dom";
import axiosInstace from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstace.get("/get-user");
      //console.log(response);
      if (response.data) {
        //console.log(response.data);
        setUserInfo(response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);
  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title={"meeting on 7th  April"}
            date={"3rd April 2024"}
            content={"will be held "}
            tags={"#meeting #conferencing"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"meeting on 7th  April"}
            date={"3rd April 2024"}
            content={"will be held "}
            tags={"#meeting #conferencing"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"meeting on 7th  April"}
            date={"3rd April 2024"}
            content={"will be held "}
            tags={"#meeting #conferencing"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"meeting on 7th  April"}
            date={"3rd April 2024"}
            content={"will be held "}
            tags={"#meeting #conferencing"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModel({ isShown: true, type: "Add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() =>
          setOpenAddEditModel({ isShown: false, type: "", data: null })
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel="Add/Edit Note"
        className={
          "w-[40%] max-h-3/4 rounded mx-auto mt-14 p-5 overflow-scroll"
        }
      >
        <AddEditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
