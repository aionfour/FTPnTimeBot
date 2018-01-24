'use strict';
var builder = require('botbuilder');

var CountryCoo = require('./../util/countrycode-latlong.json');
var countrynames = require("countrynames");
var tz = require("tz-lookup");
var moment = require('moment-timezone');

function getTimeForCountry(country){
    var countryCoo = CountryCoo[country.toLowerCase()];
    var tzwhere =  tz(countryCoo.lat,countryCoo.long);

    var m1 = moment();
    return moment.tz(tzwhere).format("hh:mm:ss a");
}


module.exports = [
    function (session) {
        builder.Prompts.text(session, "In which country are you located?");
    },
    function (session, results) {
        session.dialogData.country = results.response;
        try {
            var countryCode = countrynames.getCode(session.dialogData.country);
            session.send("the time is %s", getTimeForCountry(countryCode));
            session.endDialog();
        } catch(e){
            session.send("Sorry, I couldn't find this country, please give me the name in English");
            builder.Prompts.text(session, "In which country are you located?");
        }
    },
    function (session, results) {
        session.dialogData.country = results.response;
        try {
            var countryCode = countrynames.getCode(session.dialogData.country);
            session.send("the time is %s", getTimeForCountry(countryCode));
            session.endDialog();
        } catch(e){
            session.send("Sorry, the name of this country is wrong, please check and talk to me if you need something else");
        }
    }
];