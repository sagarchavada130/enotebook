import React from "react";
import NoteContext from "../context/Notes/NoteContext";
import { useContext, useState } from "react";
import EditNote from "./EditNote";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const [showEditModal, setshowEditModal] = useState(false);
  const handleShowEditModal = (e) => {
      setshowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setshowEditModal(false);
  };

  
  const { note } = props;
  return (
    <>
      <div className="col-md-4">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  handleShowEditModal(note)
                }}
              ></i>
              <i
                className="fa-solid fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
      <EditNote
        data={note}
        show={showEditModal}
        onClose={handleCloseEditModal}
      />
    </>
  );
};

export default NoteItem;
