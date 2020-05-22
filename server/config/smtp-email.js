var nodemailer = require("nodemailer"),
    fs = require('fs'),
    transporter = null,
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config.js')[env];



var mailOptions = {
    from: "cohelpdesk@ccc.edu",
    subject: "City Colleges of Chicago technology survey was Received",
    html: '<h4>We have successfully received your technology survey.</h4>' +
     '<p>Thank you for abiding by your contract to ensure other students also have the opportunity to benefit from this opportunity, If you are returning your equipment, ' + 'please click <a href="https://www.signupgenius.com/index.cfm?go=c.SignUpSearch&eid=00C4CCD7F8CCFD66&cs=09C3BADB8FBE8B627B0764745BB29BC8&sortby=&view=i"> here</a> to sign up for a date/time/location to return your device(s).</p>' +
    '<br/>If you have any questions, please contact the City Colleges IT Department at cohelpdesk@ccc.edu.</p>'
};






function transport(cfg) {
    var transp = nodemailer.createTransport({
        host: cfg.emailConfig.host,
        port: cfg.emailConfig.port,
        secure: false,
        tls:{rejectUnauthorized: false}
    });
    return transp;
}

function checkTransporter(){
    if (transporter == null) {
        transporter = transport(config);
    }
}


exports.sendEmail = function (toEmailAddress) {
    if(!!toEmailAddress)
    {
        mailOptions.to = toEmailAddress;

    }

    checkTransporter();
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error in email: " + error);
            return error;
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return info;
    });
};
