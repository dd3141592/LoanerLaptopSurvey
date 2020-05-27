   var  sql = require("mssql"),
        env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        config = require('./config.js')[env],
        mailService = require('./smtp-email.js');

   exports.saveSurvey = function(req, res) {
       var surveyData =  req.body.survey;
       saveSurveyData(surveyData,res);
   };
   var saveSurveyData = function(surveyData,  res) {

       console.log(Object.getOwnPropertyNames(surveyData));
       new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
           return pool.request()
                .input('studentid', sql.VarChar(9), surveyData.studentid)
                .input('enrollFall', sql.VarChar(3), surveyData.enrollFall)
                .input('enrollSummer', sql.VarChar(3), surveyData.enrollSummer)
                .input('email', sql.VarChar(3), surveyData.email)
                .input('purchase', sql.VarChar(3), surveyData.purchase)
               .execute('saveSurvey')
       }).then(function () {
           sql.close();
           mailService.sendEmail(surveyData.email);
           res.send(true);
       }).catch(function (err) {
           console.log("catch");
           res.send(err);
           console.log("error saving applicant data: " + err.toString());
           sql.close();
           return;
           //res.send({reason: err.toString()});
       });
       sql.on('error', function (err) {
           console.log("error");
           sql.close();
           res.send(err);
           console.log("error saving applicant data: " + err.toString());
           //return res.send({reason: err.toString()});
           return;
       });
   };