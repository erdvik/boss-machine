const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minonId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

// get all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// create new minion and save to database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});


// update minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// delete minion by id
minionsRouter.delete('/:minonId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minion);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});