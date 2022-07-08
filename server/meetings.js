const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    deleteAllFromDatabase,
    createMeeting
} = require('./db');

// get all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// create new meeting and save to database
meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

// delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});