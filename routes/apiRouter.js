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

module.exports = api;