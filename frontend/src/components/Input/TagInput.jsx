import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      addNewTag();
      setInputValue("");
    }
  };
  const handleRemoveTag = (TagToRemove) => {
    setTags(tags.filter((tag) => tag !== TagToRemove));
  };
  return (
    <>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex  items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Tags"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-1 flex items-center rounded border-2 border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd
            className="text-3xl text-blue-700 hover:text-white"
            onClick={() => {
              addNewTag();
            }}
          />
        </button>
      </div>
    </>
  );
};

export default TagInput;
