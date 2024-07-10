import { MdAdd, MdClose } from "react-icons/md";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import AddEditNote from "./AddEditNote";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const [openAddEditModal, setOpenEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShow: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = async (noteDetails) => {
    setOpenEditModal({ isShow: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShow: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShow: false,
      message: "",
    });
  };

  // user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All note

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again");
      }
    }
  };

  // Search
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false), getAllNotes();
  };

  // Pin update
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", "success");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToastMessage(error.response.data.message, "error");
      } else {
        showToastMessage(
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <div className="fixed w-full bg-white mt-0">
        <Navbar
          userInfo={userInfo}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      </div>
      <div className="container mx-auto pt-[28%] md:pt-[5%] lg:pt-[4%]">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
                ? "https://res.cloudinary.com/drdl4pdnx/image/upload/v1718958096/no-data_rwughl.svg"
                : "https://res.cloudinary.com/drdl4pdnx/image/upload/v1718951733/empty-notes_dcu5z7.svg"
            }
            message={
              isSearch
                ? `Oops! No notes found matching your search`
                : `Start creating your first note! Click the 'Add' button to jot down your
        thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}

        <button
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-sky-500 hover:bg-sky-600 fixed right-10 bottom-10"
          onClick={() => {
            setOpenEditModal({ isShow: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[28px] text-white" />
        </button>

        <Modal
          isOpen={openAddEditModal.isShow}
          onRequestClose={() =>
            setOpenEditModal({ isShow: false, type: "add", data: null })
          }
          style={{
            overlay: {
              background: "rgba(0,0,0,0.2)",
            },
          }}
          className="md:w-[40%] mx-auto rounded-md bg-white m-5 p-5 overflow-auto"
        >
          <AddEditNote
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenEditModal({ isShow: false, type: "add", data: null });
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
          />
        </Modal>

        <Toast
          isShow={showToastMsg.isShow}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      </div>
    </>
  );
};

export default Home;
