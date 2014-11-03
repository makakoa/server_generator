/*jshint node: true*/
var prompt = require('prompt');
var exec = require('child_process').exec;
var fs = require('fs');

var schema = {
    properties: {
        name: {
            description: 'Server Name',
            pattern: /(\.js)/,
            message: 'make sure to include the .js',
            default: 'server.js'
        },
        dir: {
            description: 'Directory',
            required: true
        },
        isExpress: {
            description: 'Using express? (y/n)',
            pattern: /y|n/,
            message: 'Please enter y or n'
        }
    }
};

prompt.start();

prompt.get(schema, function(err, res) {
    if(err) {
        console.log(err);
    }
    if ( res.dir ) exec('mkdir ' + res.dir);
    var ws = fs.createWriteStream(res.dir + '/' + res.name);
    ws.write('/*jshint node: true*/\n');
    ws.write('\'use strict\'\n\n');
    if(res.isExpress === 'y') {
        ws.write('var express = require(\'express\');\n' +
                'var app = express();\n\n' +
                'var port = process.env.PORT || 3000;\n' +
                'app.listen(port, function() {\n' +
                '\tconsole.log(\'server running at \' + port);\n' +
                '});');
    exec('npm install');
    }
});