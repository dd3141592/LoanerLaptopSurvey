var
        edge = require('edge'),
        path = require('path'),
        sql = require('./sql');

var authenticateUser = edge.func({
    assemblyFile: path.normalize(__dirname + '/../../') +  'Bin/LdapAuthenticate.dll'
});


exports.authenticate = function (req, res) {
    var user = req.body.user;
    console.log("user ID: " + user.username);
    authenticateUser(user, function(error, result){
        if (!!result ) {
            var id = result.EmployeeNumber;

            if(id == null){
                console.log('couldnt authenticate ' + result.EmployeeNumber);
                res.send({success: false, error:  'unable to authenticate this user'});
            } else {
                result.username = user.username;
                return res.send({success: true, result: result });

            }

        }
        else
            {
            console.log('couldnt authenticate ');
            console.log('authenticate result : ' + error);
            //console.log("result return message: " +  result.returnMessage);
            res.send({success: false, error: error || 'unable to authenticate this user'});
        }
    });
};


