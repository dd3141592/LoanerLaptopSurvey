var
    year_specific = require('./year_specific'),
    sql = require('./sql.js'),
    auth = require('./auth'),
    crm = require('./crm.js');


module.exports = function (config, app) {
    app.post( config.virtualDirPath +'/api/saveSurvey', sql.saveSurvey);

    app.get(config.virtualDirPath + '/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post(config.virtualDirPath + '/login', auth.authenticate);

    app.all(config.virtualDirPath + '/api/*', function (req, res) {
        console.log('in routes - api/* ');
        res.sendStatus(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            virtualDirectoryPath : config.virtualDirPath,
            currentTerm : year_specific.currentTerm,
            nextTerm : year_specific.nextTerm
        });
    });
};
