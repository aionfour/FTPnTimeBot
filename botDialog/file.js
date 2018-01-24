'use strict';
var builder = require('botbuilder');
var ftp = require('ftp');
var fs = require('fs');
var util = require('util');

var config = {
        host: 'ftp.jasabino.5gbfree.com',
        port: 21,
        user: 'testing@jasabino.5gbfree.com',
        password: 'testing'
    };

function sendFile(filename, session){
    fs.readFile('./files/'+filename, function (err, data) {
        var contentType = 'image/jpg';
        var base64 = Buffer.from(data).toString('base64');

        var msg = new builder.Message(session)
            .addAttachment({
                contentUrl: util.format('data:%s;base64,%s', contentType, base64),
                contentType: contentType,
                name: filename
            });

        session.send(msg);
    });
}

module.exports = [
    function (session) {
        builder.Prompts.text(session, "What is the name of the file?");
    },
    function (session, results) {
        session.dialogData.filename = results.response;

        try {
            var client = new ftp();
            client.connect(config);
            client.get(session.dialogData.filename, function(err, stream) {
                if (err){
                    session.send("Sorry, I couldn't find this file in your ftp, please check and talk to me if you need something else");
                    session.endDialog();
                }else{
                    stream.once('close', function() { client.end(); });
                    stream.pipe(fs.createWriteStream('files/'+session.dialogData.filename));
                    sendFile(session.dialogData.filename, session);
                    session.send("file downloaded");
                    session.endDialog();
                }
            });
        } catch(e){
            session.send("Sorry, I couldn't find this file in your ftp, please check and talk to me if you need something else");
            session.endDialog();
        }

    }
];