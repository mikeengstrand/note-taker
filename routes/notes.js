const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// get all notes
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});


// still not working, double chewcck on this///////////////////
// GET Route for specific note by ID
notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.find((note) => note.note_id === noteId);
      return result
        ? res.json(result)
        : res.json('No note with that ID');
    })
    .catch((error) => res.status(500).json({ error: 'Internal server error' }));
});
// still not working, double chewcck on this///////////////////


// GET Route for specific note

// notes.get('/notes', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((note) => note.note_id === noteId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json('No note with that ID');
//     });
// });




// DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // make array of all notes except the one were getting rid of
      const result = json.filter((note) => note.note_id !== noteId);

      // Save array
      writeToFile('./db/notes.json', result);

      // Respond to delete req
      res.json(`Item ${noteId} has been deleted`);
    });
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    console.log(newNote.noteTitle)
    console.log(newNote.noteText)

    readAndAppend(newNote, './db/notes.json');
    res.json(`New note added successfully`);
  } else {
    res.error('Error in adding new note');
  }
  console.log(error)
});

module.exports = notes;

