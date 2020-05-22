   var  sql = require("mssql"),
        env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        config = require('./config.js')[env],
        //https = require('https');
        //http = require('http');
        request = require('request');
       Q = require('q');


exports.getCS9Credentials = function(req,res1){

        console.log('in check cs9 credentials: ');


        // console.log( req.params['studentId']);
        var studentId = req.params['studentId'];

        callCS9(studentId)
            .then(function (result) {

            // console.log("finished with callcs9: " + Object.getOwnPropertyNames(result));
            console.log("finished with callcs9: " + result);

            res1.send(result);
            return;
        }).catch(function (err) {
            res1.send(err.message);});

        return;
};

function  callCS9(studentId) {

    var deferred = Q.defer();
    var options = {
        //url: 'http://google.com/img.png',
        // url: 'http://dummy.restapiexample.com/api/v1/employees',

        url:  'https://cccprdmsg.ccc.edu/PSIGW/RESTListeningConnector/PSFT_CCCCSPRD/ExecuteQuery.v1/PUBLIC/' +
            'Z_CS_CRM_CHECK_ENROLLED/JSON/NONFILE?isconnectedquery=n&maxrows=10' +
            '&prompt_uniquepromptname=ID&prompt_fieldvalue=' + studentId + '&json_resp=true',
        method: 'GET',
        auth: {
            username: 'CCCCRM',
            password: 'CCCCRM_APIUSER#2020!'
        }
    };
    console.log("in callCS9 before https request and after assign config");

    request.get(options,function(err,res,body){

        if (err) {
            console.log(err);
            deferred.reject(false);

        }
        console.log(body);
        deferred.resolve(body);
    });

    return deferred.promise;
}

function checkStudentStatus(id){

}
