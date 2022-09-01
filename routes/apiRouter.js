const api = require('express').Router();
const notes = require('../db/db.json');
const uuid = require('../helpers/uuid');

// Get route for retrieving all notes in the api
api.get('/', (req, res) => {
    console.log(`${req.method} request received for api`);
    res.json(notes);
});

// post route for adding a note
api.post('/', (req, res) => {
    console.log(`${req.method} request received for api`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
        notes.push(newNote);
    } else {
        res.status(500).json('Error in posting note');
    }
});

// get route for retreiving a specific note in the api
api.get('/:note_id', (req, res) => {
    if (req.params.note_id) {
        console.info(`${req.method} request received to get a single a note`);
        const noteId = req.params.note_id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.note_id === noteId) {
                res.json(currentNote);
                return;
            }
        }
        res.status(404).send('Note not found');
    } else {
        res.status(400).send('Note ID not provided');
    }
})

module.exports = api;