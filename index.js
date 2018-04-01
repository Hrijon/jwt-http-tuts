const app = require("jwt-http");
const formidable  = require("formidable");
const path  = require("path");

app.setPort(9000);

app.renderHTML("/", path.join(__dirname, "/index.html"));

app.postMethod("/upload" , true, function(req, res, previous){
    var form = new formidable.IncomingForm();
    form.parse(req);
    var uploads = [];
    form.uploadDir = path.join(__dirname, "/temp");
    form.maxFileSize = 1500 * 1024 *1024;

    form.on("fileBegin", function(err, file){
        var extension = path.extname(file.name);
        var index = (file.name).lastIndexOf(extension);
        var onlyName = (file.name).substr(0, index);
        var newfileName = onlyName + Date.now() + extension;

        var fileName = path.join(__dirname, "/upload/" + newfileName);
        file.path = fileName;
    });

    form.on('file', function(field, file){
        var fileField = {};
        fileField[field]= file;
        uploads.push(fileField);

    });

    form.on("error", function(error){
        app.httpMsgs.send500(req, res, error);
    });

    form.on('end', function(){
        app.httpMsgs.sendJSON(req, res, uploads);
    })

});