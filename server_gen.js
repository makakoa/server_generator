/* Authors: Cameron Yee, Charles Renwick, Gabe Medrash */

/*jshint node: true*/
'use strict';

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

    exec('mkdir ' + res.dir, function(error, stdout, stderr) {
        if (error) console.log(error);
        if (stderr) console.log(stderr);

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
        }
    });

});