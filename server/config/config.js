var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
console.log("rootPath" + rootPath);

module.exports  = {
		development: {
            sqlConfig: {
                user: 'sa',
                password: 'IamSQLadmin',
                server: '10.27.251.46',
                database: 'LoanerLaptop'
            },
			port: process.env.PORT || 5000,
            virtualDirPath: process.env.virtualDirPath || '',
			rootPath: rootPath,
			emailConfig: {
                host: "psm.ccc.edu",
				port: "25"
            },
            loggingLevel: 'DEBUG'
		},
		production: {
            sqlConfig: {
                user: 'sa',
                password: 'Spikeis#1cat',
                server: 'DOSQL07.ccc.edu', //doSQL07.ccc.edu...added 03/09/2020...
                database: 'LoanerLaptop'
            },
            port: process.env.PORT || 5000,
            virtualDirPath: process.env.virtualDirPath || '',
			rootPath: rootPath,
            emailConfig: {
                host: "psm.ccc.edu",
                port: "25"
            },
            loggingLevel: 'DEBUG'
		}
};