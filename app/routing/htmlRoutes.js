var path = require("path");

module.exports = function(app) {

    //directs to the survey html
    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    //catch all that directs to the home page if no match is found
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};