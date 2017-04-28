
var nodegit = require('nodegit'),
    path = require('path');

var url = "https://github.com/WWW-Ryhma13/Matkatoimisto.git",
    local = "./arkisto",
    cloneOpts = {};

nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
}).catch(function (err) {
    console.log(err);
});
