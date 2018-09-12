module.exports = (app) => {
    const events = require('../controllers/event.controller.js');

    // Create a new Note
    app.post('/events', events.create);

    // Retrieve all Notes
    app.get('/events', events.findAll);

    // Update a Note with noteId
    //app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
   // app.delete('/notes/:noteId', notes.delete);
}