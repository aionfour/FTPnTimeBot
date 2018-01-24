'use strict';

var builder = require('botbuilder');

var inMemoryStorage = new builder.MemoryBotStorage();
var connector = new builder.ConsoleConnector().listen();

// Creating a new Bot
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Hi");
        session.beginDialog('help');
    }
]).set('storage', inMemoryStorage);

bot.dialog('help', function (session) {
    session.endDialog("I'm a bot of testing . <br/>Please say 'hi' for starting a dialog");
}).triggerAction({
    matches: / *help*/i
});

bot.dialog('Hi', require('./botDialog/hi')).triggerAction({
    matches: /^hi*|^options*/i
});
bot.dialog('Time', require('./botDialog/time')).triggerAction({
    matches: / *time*/i
});
bot.dialog('File', require('./botDialog/file')).triggerAction({
    matches: / *file*/i
});