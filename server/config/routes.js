'use strict';

var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', auth.isAuthenticated, controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    // todo - this targetID
    app.post('/api/users-scan/:owner', auth.isAuthenticated, controllers.users.scanUser);

    app.get('/api/game-objects/:owner', auth.isAuthenticated, controllers.gameObjects.getGameObjectsForUserId);

    // todo - this taskType, taskIndexToAddTo
    app.post('/api/game-tasks/:owner', auth.isAuthenticated, controllers.gameTasks.createTask);

    // todo - this targetID, ships[], turns;
    app.post('/api/game-attack/:owner', auth.isAuthenticated, controllers.gameAttacks.createAttack);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea+ '/' + req.params.partialName);
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // any other api request is forbidden
    app.get('/api/*', function(req, res) {
        res.render('index');
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};