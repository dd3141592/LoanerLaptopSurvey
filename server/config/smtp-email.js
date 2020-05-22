var nodemailer = require("nodemailer"),
    fs = require('fs'),
    transporter = null,
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config.js')[env];

var mailOptionsES = {
    from: "cohelpdesk@ccc.edu",
    subject: "Recibida Solicitud de Tecnología Prestada",
    html: '<h4>Ha sido exitosa su petición de recibir tecnología prestada</h4>' +
        '' + '<p>Favor de seguir recibiendo sus correos de City Colleges of Chicago para enterarse de los pormenores relacionados con las existencias y los plazos para el envío.</p>' +
        '<br/>'
};

var mailOptions = {
    from: "cohelpdesk@ccc.edu",
    subject: "Request for City Colleges of Chicago technology loan was Received",
    html: '<h4>We have successfully received your technology request.</h4>' +
    '' + '<p>Please continue to check your CCC email for notifications about availability and shipping.</p>' +
    '<br/>'
};

var mailOptionsPOL = {
    from: "cohelpdesk@ccc.edu",
    subject: "Request for City Colleges of Chicago technology loan was Received",
    html: '<h4>We have successfully received your request for a technology loan.</h4>' +
        '' + '<p>Please continue to check your CCC email for notifications about availability and shipping.</p>' +
        '<br/>'
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


exports.sendEmail = function (toEmailAddress, lang) {
    if(!!toEmailAddress)
    {
        mailOptions.to = toEmailAddress;
        mailOptionsES.to = toEmailAddress;
        mailOptionsPOL.to = toEmailAddress;

    }
    var mOptions = lang === 'ES' ? mailOptionsES :  (lang === 'POL' ?  mailOptionsPOL : mailOptions);

    checkTransporter();
    transporter.sendMail(mOptions, function (error, info) {
        if (error) {
            console.log("error in email: " + error);
            return error;
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return info;
    });
};
