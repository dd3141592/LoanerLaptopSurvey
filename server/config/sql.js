   var  sql = require("mssql"),
        env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        config = require('./config.js')[env],
        mailService = require('./smtp-email.js');

exports.getApplication = function(req,res){

        var studentId = req.params['studentId'];
        console.log('in get  application: ' + studentId);

        new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
            return pool.request()
                .input('studentid', sql.NVarChar(9),  studentId)
                .execute('getStudentApplication')
        }).then(function (result) {
            sql.close();

            if(result.hasOwnProperty('recordsets') && result.recordset.length > 0) {
            //var rec = result.recordsets[0];
                var rec = result.recordset[0];
                res.send(rec);
            } else {

                res.send({});
            }

        }).catch(function (err) {
            sql.close();
            res.sendStatus(400);
            res.send(err.message);
        });
        sql.on('error', function (err) {
            sql.close();
            res.sendStatus(400);
            res.send(err.message);
        });




};


exports.getTechLoanDetails = function(req,res){

       var studentId = req.params['studentId'];
       console.log('in gettechloandetails: ' + studentId);

       new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
           return pool.request()
               .input('studentid', sql.NVarChar(9),  studentId)
               .execute('getTechLoanDetails')
       }).then(function (result) {
           sql.close();

           if(result.hasOwnProperty('recordset') && result.recordset.length > 0) {
               console.log("number of loan detail records" + result.recordset.length);
               var rec = result.recordset;
               res.send(rec);
           } else {

               res.send([]);
           }
       }).catch(function (err) {
           sql.close();
           res.sendStatus(400);
           res.send(err.message);
       });
       sql.on('error', function (err) {
           sql.close();
           res.sendStatus(400);
           res.send(err.message);
       });




   };


exports.getLaptopApplications = function(req,res){
    new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
        return pool.request()
            .execute('getLaptopApplications')
    }).then(function (result) {
        sql.close();

        if(result.hasOwnProperty('recordset') && result.recordset.length > 0) {
            //var rec = result.recordsets[0];
            var rec = result.recordset;
            res.send(rec);
        } else {

            res.send([]);
        }
    }).catch(function (err) {
        sql.close();
        res.sendStatus(400);
        res.send(err.message);
    });
    sql.on('error', function (err) {
        sql.close();
        res.sendStatus(400);
        res.send(err.message);
    });
};

exports.getHotSpotApplications = function(req,res){
       new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
           return pool.request()
               .execute('getHotSpotApplications')
       }).then(function (result) {
           sql.close();

           if(result.hasOwnProperty('recordset') && result.recordset.length > 0) {
               //var rec = result.recordsets[0];
               var rec = result.recordset;
               res.send(rec);
           } else {

               res.send([]);
           }
       }).catch(function (err) {
           sql.close();
           res.sendStatus(400);
           res.send(err.message);
       });
       sql.on('error', function (err) {
           sql.close();
           res.sendStatus(400);
           res.send(err.message);
       });
   };


exports.saveApplication = function(req, res) {
    var applicationData =  req.body.student;
    saveData(applicationData,res);
};
   var saveData = function(applicationData,  res) {
       applicationData.laptop = applicationData.laptop ===true? 1 :  applicationData.laptop;
       applicationData.hotspot = applicationData.hotspot ===true? 1 :  applicationData.hotspot;

       console.log(applicationData.username);
       new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
           return pool.request()
               .input('username', sql.NVarChar(50), applicationData.username)
               .input('studentid', sql.NVarChar(9), applicationData.EmployeeNumber)
               .input('studname', sql.NVarChar(250), applicationData.DisplayName)
               .input('studentemail', sql.NVarChar(75), applicationData.EmailAddress)
               .input('address', sql.NVarChar(100), applicationData.address)
               .input('address2', sql.NVarChar(100), applicationData.address2)
               .input('city', sql.NVarChar(50), applicationData.city)
               .input('state', sql.NVarChar(10), applicationData.state)
               .input('postal', sql.NVarChar(10), applicationData.postal)
               .input('mobilephone', sql.NVarChar(15), applicationData.mobilephone)
               .input('privacyconsent', sql.Bit, applicationData.privacyconsent)
               .input('laptop', sql.Bit, applicationData.laptop)
               .input('hotspot', sql.Bit, applicationData.hotspot)

               .execute('saveApplication')
       }).then(function (result) {
           sql.close();
           console.log('lang: 2' + applicationData.lang);
           if(applicationData.lang != 'ENG' ){
               new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
                   return pool.request()
                       .input('username', sql.NVarChar(50), applicationData.username)
                       .input('studentid', sql.NVarChar(9), applicationData.EmployeeNumber)
                       .input('studname', sql.NVarChar(250), applicationData.DisplayName)
                       .input('studentemail', sql.NVarChar(75), applicationData.EmailAddress)
                       .execute('saveApplicationES')
               }).then(function (result) {
                   sql.close();

                   mailService.sendEmail(applicationData.EmailAddress, applicationData.lang);
                   res.send(result);
               });
           } else
               {
               mailService.sendEmail(applicationData.EmailAddress, 'ENG');
               res.send(result);

           }
       }).catch(function (err) {
           console.log("catch");
           res.status(400);
           console.log("error saving applicant data: " + err.toString());
           sql.close();
           return res.send({reason: err.toString()});
       });
       sql.on('error', function (err) {
           console.log("error");
           sql.close();
           res.status(400);
           console.log("error saving applicant data: " + err.toString());
           return res.send({reason: err.toString()});
       });
   };


   exports.saveSurvey = function(req, res) {
       var surveyData =  req.body.survey;
       saveSurveyData(surveyData,res);
   };
   var saveSurveyData = function(surveyData,  res) {

       new sql.ConnectionPool(config.sqlConfig).connect().then(function (pool) {
           return pool.request()
                .input('studentid', sql.VarChar(9), surveyData.studentid)
                .input('enrollFall', sql.VarChar(3), surveyData.enrollFall)
                .input('enrollSummer', sql.VarChar(3), surveyData.enrollSummer)
                .input('intendReturn', sql.VarChar(3), surveyData.intendReturn)
                .input('purchase', sql.VarChar(3), surveyData.purchase)

               .execute('saveSurvey')
       }).then(function () {
           sql.close();
           res.sendStatus(200);

       }).catch(function (err) {
           console.log("catch");
           res.status(400);
           console.log("error saving applicant data: " + err.toString());
           sql.close();
           return res.send({reason: err.toString()});
       });
       sql.on('error', function (err) {
           console.log("error");
           sql.close();
           res.status(400);
           console.log("error saving applicant data: " + err.toString());
           return res.send({reason: err.toString()});
       });
   };