import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <div className="flex  items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Tags"
        />
        <button className="p-1 flex items-center rounded border-2 border-blue-700 hover:bg-blue-700">
          <MdAdd className="text-3xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </>
  );
};

export default TagInput;
