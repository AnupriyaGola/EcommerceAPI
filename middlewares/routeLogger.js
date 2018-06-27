const appConfig = require('./../config/appConfig');

let requestIpLogger = (req, res, next) =>{

    let remoteIp = req.connection.remoteAddress + '://' + req.connection.remotePort;
    let realIp = req.header['X-REAL-IP'];
    console.log(req.method+ "Request Mode from" +remoteIp + 'for route' + req.originalUrl);

    if(req.method === 'OPTIONS'){
        console.log('!OPTIONS');
        var header = {};
        //IE8 does not allow domains to be specicfied, just the *
        //headers["Acces-Control-Allow-Origin"] = req.header.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Allow-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type,Accept";
        res.writeHead(200, headers);
        res.end();
    
    } else{
        //enable or disable cors here
        res.header("Access-Control-Allow-Origin", appConfig.allowedCorsOrigin);
        res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE, OPTION');
        res.header("Access-Control-Allow-Headers", "Origin, X-Reuested-With, Content-Type, Accept");
        //console.log(res.header)
        //end cors config

        next();
    }
}//end request ip logger function

module.exports = {
    logIp: requestIpLogger
}