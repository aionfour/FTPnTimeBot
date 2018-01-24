# FTP and Time Bot multi-dialog 

This is a sample of a Bot multi-dialog with 2 basic option of conversation:

1. For getting the time of any country requested
2. For downloading a file as attachment from a FTP server

For more information please check the documentation on:

 1. [Bot on NodeJs](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart)
 2. [Node-FTP](https://github.com/mscdex/node-ftp)
 3. [Moment TimeZone](https://momentjs.com/timezone/)
 4. [Country Names](https://www.npmjs.com/package/countrynames)
 

## Getting Started

These instructions will get you a copy of the project up and run on your local machine for development and testing purposes.

1. Download a GIT client as [TortoiseGIT](https://tortoisegit.org/)
2. Clone the repository from [SSH](git@gitlab.com:jasabino/FTPnTimeBotSample.git) or [HTTPS](https://gitlab.com/jasabino/FTPnTimeBotSample.git)
3. Run `npm install`

### Prerequisites

You need these programs in order to run this project:

1. Node.js [(Download)](https://nodejs.org/en/)

### Installing on CentOS

1. Install Node.js and npm

```
Installation guide (How To Install Node.js From The EPEL Repository): https://www.unixmen.com/install-node-js-centos-7/

sudo yum install epel-release
sudo yum install nodejs
sudo yum install npm
```

2. Download project

```
guide: https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone?utm_source=stash&utm_medium=in-app-help&utm_campaign=learn-git-clone

git clone git@gitlab.com:jasabino/APISuiteSample.git
```

3. Run `npm install`

## Starting up the Server

For starting up the server, please execute this command on the root path of the project

* For local testing on the console
```
node test
```

* For testing on the Bot Emulator of Microsoft
```
node local-app.js
```

Please notice that service is up on 3978 port, so you have to put this URL in the Bot Emulator:
```
http://localhost:3978/api/messages
```

**Important:** the FTP is set for an sample account, please change the parameters of configuration of  the FTP for pointing to your own FTP

If you want to run in your own FTP, please follow the next instructions:

1. Go to botDialog/file
2. Change the var config
```
var config = {
        host: 'ftp.****.5gbfree.com',
        port: 21,
        user: '****@****.5gbfree.com',
        password: '*****'
    };
```

## Explaining the example

Bot follow the next instructions for starting a dialog:

1. Hi or Options
> it Starts the main dialog and it presents 3 options for choosing: 1. Get the time, 2. Get a File from the FTP and 3. Noting
2. Time
> The Bot ask for the country where are you located and then give you the time 
3. File
> The Bot ask for the name of the file requested, download the file and returns it inline in the chat (only images)
> The files available in this FTP Server now are:
> 1. vader.jpg
> 2. yoda.jpg
> 3. bb8.jpg
> 4. rey.jpg
4. Help
> If the user ask for help, the bot respond with the follow message:
"I'm a bot of testing . <br/>Please say 'hi' for starting a dialog"

## Project Structure

It contains two main files:

1. local-app.js
> For testing in the Emulator

2. test.js
> For local testing in the console

And also it contains the follow folders:

1. util
> it contains the json with the codes of countries for get the time

2. files
> dir for downloading the files from the FTP for sending them attached in the chat

3. bootDialog
> dir with the function for each dialog

4. folder `PostDeployScripts` and the others files are used by azure for the deployment

## Built With

* [Node.js](https://nodejs.org/en) - The runtime environment
* [Express](https://www.npmjs.com/package/express) - Web application framework for Node.js
* [Bot Builder](https://www.npmjs.com/package/botbuilder) - For Build the Bot
* [Node-FTP](https://github.com/mscdex/node-ftp) -  The FTP Client