const transport = require("../mail/config");

const sendMail = async (req,res) => {
    try {
        const mail = await transport.sendMail({
            from: '"LoopitShare" <loopitshare@gmail.com>',
            to: 'alvesgibbsflorencia@gmail.com',
            subject: 'Hello',
            text: 'Hello world',
            html: '<b>Hello world</b>'
        });
        if (mail) {
            return res.status(200).json({
                status: "OK",
                mail: mail
            });
        }
    }  catch (error) {
        res.status(500).json({
            status: "Error",
            error: error
        });
    }
}

module.exports = {
    sendMail: sendMail
}