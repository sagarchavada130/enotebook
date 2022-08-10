import { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../Alert/AlertContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  let alertContextApi = useContext(AlertContext);

  let { showAlert } = alertContextApi;

  const getAllNotes = async () => {
    let url = `${host}/api/v1/enotebook/note/fetchUserNotes`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let result = await response.json();
    setNotes(result.data);
  };

  const createNote = async (noteData) => {
    let url = `${host}/api/v1/enotebook/note/createNote`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(noteData),
    });

    let result = await response.json();
    if (result.success) {
      setNotes(notes.concat(result.data));
      showAlert(result.message, result.success);
    } else {
      showAlert(result.message);
    }
  };

  const editNote = async (id, data) => {
    let url = `${host}/api/v1/enotebook/note/updateUserNote/${id}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();

    if (result.success) {
      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = data.title;
          newNotes[index].description = data.description;
          newNotes[index].tag = data.tag;
          break;
        }
      }

      setNotes(newNotes);
      showAlert(result.message, result.success);
    } else {
      showAlert(result.message, result.success);
    }
  };

  const deleteNote = async (id) => {
    let url = `${host}/api/v1/enotebook/note/deleteUserNote/${id}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let result = await response.json();

    if (result.success) {
      let newNotes = notes.filter((note) => {
        return note._id !== id;
      });

      setNotes(newNotes);
      showAlert(result.message, result.success);
    } else {
      showAlert(result.message, result.success);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, createNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
