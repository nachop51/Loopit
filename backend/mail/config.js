const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'loopitshare@gmail.com',
        pass: 'asnqcnorrjcjnnxh'
    }   
});

module.exports = transport;