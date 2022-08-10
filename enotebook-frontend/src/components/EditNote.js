import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import NoteContext from "../context/Notes/NoteContext";

const EditNote = (props) => {
  const context = useContext(NoteContext);
  const { editNote } = context;
  const { data, show, onClose } = props;

  const [editNoteState, setEditNoteState] = useState(data);

  let onChange = (e) => {
    setEditNoteState({ ...editNoteState, [e.target.name]: e.target.value });
  };

  let updateNoteData = async (e) => {
    onClose();
    let editObj = {
      title: editNoteState.title,
      description: editNoteState.description,
      tag: editNoteState.tag,
    };
    await editNote(data._id, editObj);
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={data.title}
                autoFocus
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={data.description}
                rows={3}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="tag"
                defaultValue={data.tag}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateNoteData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditNote;
