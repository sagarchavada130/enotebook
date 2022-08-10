import React, { useEffect, useContext } from "react";
import NoteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Note = (props) => {
  const context = useContext(NoteContext);

  const { notes, getAllNotes } = context;
  const { showAlert } = props;

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />

      <div className="row my-3">
        <h3>Your Notes</h3>
        <div className="container row my-3">
          {notes.length > 0
            ? notes.map((note) => {
                return <NoteItem key={note._id} note={note} />;
              })
            : "No Notes Found"}
        </div>
      </div>
    </>
  );
};

export default Note;
