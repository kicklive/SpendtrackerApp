var path=require('path');
var rootPath=path.normalize(__dirname+'/../../');
module.exports={
    development:{
        db:'mongodb://localhost/Spendtracker2018',
        rootPath:rootPath,
        port: process.env.PORT||3333

    },
    production:{
        db:'mongodb://kicklive:spendtracker@ds117858.mlab.com:17858/spendtracker2018',
        rootPath:rootPath,
         port: process.env.PORT||80

    }
};