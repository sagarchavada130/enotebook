import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";
import AlertContext from "../context/Alert/AlertContext";

const AddNote = () => {
  let noteContextApi = useContext(NoteContext);
  let alertContextApi = useContext(AlertContext);

  let { createNote } = noteContextApi;
  let { showAlert } = alertContextApi;

  let [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  let addNoteData = async (e) => {
    e.preventDefault();
    createNote({
      title: note.title,
      description: note.description,
      tag: note.tag,
    });

    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  let onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3> Add Note</h3>
      <div className="contaner my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              maxLength={30}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={3}
              maxLength={150}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={3}
              maxLength={30}
              required
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={addNoteData}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
