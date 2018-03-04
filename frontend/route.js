var app = require("jwt-http");
app.setAssetDirRoutes(__dirname + "/assets");

app.renderHTML("/", __dirname + "/html/index.html");
app.renderHTML("/emp" + app.queryExpression(), __dirname + "/html/emp.html");
app.renderHTML("/newuser", __dirname + "/html/user.html");

// 404
app.setHTML404(__dirname + "/html/404.html");