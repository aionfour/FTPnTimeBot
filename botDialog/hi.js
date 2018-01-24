'use strict';
var builder = require('botbuilder');


var DialogLabels = {
    Time: 'Get the time',
    File: 'Get a file',
    Nothing: 'Nothing'
};

module.exports = [
    function (session) {
        session.send("Hi");

        builder.Prompts.choice(
            session,
            "What do you want to do?",
            [DialogLabels.Time, DialogLabels.File, DialogLabels.Nothing],
            {
                maxRetries: 2,
                retryPrompt: 'Not a valid option'
            });
    },
    function (session, results) {
        if (!results.response) {
            session.send('Sorry! Too many attemps :( But don\'t worry, I\'ll be here, please talk to me if you need something!');
            return session.endDialog();
        }

        // continue on proper dialog
        var selection = results.response.entity;
        switch (selection) {
            case DialogLabels.Time:
                return session.beginDialog('Time');
            case DialogLabels.File:
                return session.beginDialog('File');
            case DialogLabels.Nothing:
                session.send("Ok thanks, please talk to me if you need something");
                session.endDialog();
        }
    }
];