const api = require('express').Router();
// const notes = require('../db/db.json');
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');


// Get route for retrieving all notes in the api
api.get('/', (req, res) => {
    console.log(`${req.method} request received for api`);
    // res.json(notes);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// post route for adding a note
api.post('/', (req, res) => {
    console.log(`${req.method} request received for api`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        // notes.push(newNote);
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.status(500).json('Error in posting note');
    }
});

// get route for retreiving a specific note in the api
api.get('/:note_id', (req, res) => {
    if (req.params.note_id) {
        console.info(`${req.method} request received to get a single a note`);
        const noteId = req.params.note_id;
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let notes = JSON.parse(data);
                for (let i = 0; i < notes.length; i++) {
                    const currentNote = notes[i];
                    if (currentNote.id === noteId) {
                        res.json(currentNote);
                        console.log(`Note id ${noteId} located`)
                        return;
                    }
                };
                res.status(404).send('Note not found');
                console.log('Note not found');
            };
        });
    } else {
        res.status(400).send('Note ID not provided');
    }
})

module.exports = api;