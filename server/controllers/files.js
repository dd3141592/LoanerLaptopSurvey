var fs = require('fs');
exports.getFile = function (req, res) {
    try {

            fs.readFile(req.params[0], function(err,data){
            if(err){
                console.log("err reading file: " + err);
                res.send({err: err, data: null});
            } else {
                console.log("File: '" +req.params[0] + " was successfully read.\n");
                res.writeHead(200, {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'inline'
                });
                res.end(data);
            }
        });
    } catch (ex) {
        console.log("Unable to read file '" + req.params.filePath + "'.");
        console.log(ex);
    }
};

