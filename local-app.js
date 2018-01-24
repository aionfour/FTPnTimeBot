'use strict';

var restify = require('restify');
var builder = require('botbuilder');

var inMemoryStorage = new builder.MemoryBotStorage();

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Creating a new Bot
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Hi");
        session.beginDialog('help');
    }
]).set('storage', inMemoryStorage);

// Bot dialog rules
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
