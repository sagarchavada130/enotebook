const Note = require("./noteModel");
const NoteConstant = require("./noteConstant");

const createNote = async (req) => {
  return new Promise(async (resolve, reject) => {
    let responceData = {};
    try {
      let { title, tag, description } = req.body;
      let saveObj = {
        title: title,
        userId: req.user._id,
        tag: tag,
        description: description,
      };

      let newNote = new Note(saveObj);

      let addNote = await newNote.save();
      responceData = {
        code: 200,
        success: true,
        message: NoteConstant.MESSAGES.create_note,
        data: addNote,
      };

      resolve(responceData);
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: NoteConstant.MESSAGES.create_note_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

const fetchUserNotes = async (req) => {
  return new Promise(async (resolve, reject) => {
    let responceData = {};
    try {
      let userId = req.user._id;
      let result = await Note.find({ userId: userId }).exec();

      responceData = {
        code: 200,
        success: true,
        message: NoteConstant.MESSAGES.notes_list,
        data: result,
      };
      resolve(responceData);
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: NoteConstant.MESSAGES.get_notes_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

const updateNotes = async (req) => {
  return new Promise(async (resolve, reject) => {
    let responceData = {};
    try {
      let userId = req.user._id;
      let noteId = req.params.noteId;
      let { title, tag, description } = req.body;

      let isNoteExist = await Note.findOne({ _id: noteId });

      if (isNoteExist && isNoteExist.userId.toString() !== userId.toString()) {
        responceData = {
          code: 401,
          success: false,
          message: NoteConstant.MESSAGES.user_not_allowed_edit,
          data: "",
        };

        resolve(responceData);
      }

      if (isNoteExist) {
        let data = {};

        if (title) {
          data.title = title;
        }

        if (tag) {
          data.tag = tag;
        }

        if (description) {
          data.description = description;
        }

        let result = await Note.findOneAndUpdate(
          { userId: userId, _id: noteId },
          { $set: data },
          { new: true }
        );

        responceData = {
          code: 200,
          success: true,
          message: NoteConstant.MESSAGES.update_note_successfully,
          data: result,
        };
        resolve(responceData);
      } else {
        responceData = {
          code: 404,
          success: false,
          message: NoteConstant.MESSAGES.note_not_found,
          data: "",
        };
        resolve(responceData);
      }
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: NoteConstant.MESSAGES.update_note_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

const deleteNotes = async (req) => {
  return new Promise(async (resolve, reject) => {
    let responceData = {};
    try {
      let userId = req.user._id;
      let noteId = req.params.noteId;
      let isNoteExist = await Note.findOne({ _id: noteId });

      if (isNoteExist && isNoteExist.userId.toString() !== userId.toString()) {
        responceData = {
          code: 401,
          success: false,
          message: NoteConstant.MESSAGES.user_not_allowed_delete,
          data: "",
        };

        resolve(responceData);
      }

      if (isNoteExist) {
        let deleteNote = await Note.findByIdAndDelete({ _id: noteId });
        responceData = {
          code: 200,
          success: true,
          message: NoteConstant.MESSAGES.delete_note_successfully,
          data: deleteNote,
        };

        resolve(responceData);
      } else {
        responceData = {
          code: 404,
          success: false,
          message: NoteConstant.MESSAGES.note_not_found,
          data: "",
        };
        resolve(responceData);
      }
    } catch (error) {
      console.log(error);
      responceData = {
        code: 501,
        success: false,
        message: NoteConstant.MESSAGES.get_notes_error,
        data: "",
      };
      resolve(responceData);
    }
  });
};

module.exports = { fetchUserNotes, createNote, updateNotes, deleteNotes };
