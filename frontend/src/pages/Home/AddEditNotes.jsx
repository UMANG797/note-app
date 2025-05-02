import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstace from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData = {}, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData.title || "");
  const [content, setContent] = useState(noteData.content || "");
  const [tags, setTags] = useState(noteData.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstace.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data?.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    try {
      const response = await axiosInstace.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data?.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please enter the title");
      return;
    }
    if (!content.trim()) {
      setError("Please enter the content");
      return;
    }
    setError("");
    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="bg-white p-9 relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-1 -right-1 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-red-600" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          className="text-slate-950 outline-none"
          type="text"
          placeholder="Go to Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          className="text-xs text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {error && <div className="text-red-600 text-xs pt-4">{error}</div>}

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleSubmit}
      >
        {type === "edit" ? "Edit" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNotes;
