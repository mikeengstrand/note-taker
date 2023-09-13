
// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { note_id } = req.body; // Change this line to use 'note_id' instead of 'noteTitle' and 'noteText'

  if (note_id) {
    const newNote = {
      note_id,
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`New note added successfully`);
  } else {
    res.status(400).json('Error in adding new note'); // Use res.status() instead of res.error() to set the response status
  }
});