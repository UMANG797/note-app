import React from "react";
import TagInput from "../../components/Input/TagInput";
const AddEditNotes = () => {
  return (
    <div className="bg-white p-3">
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          className="text-slate-950 outline-none"
          type="text"
          placeholder="Go to Gym At 5"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-xs text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Content"
          rows={10}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput />
      </div>
      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
