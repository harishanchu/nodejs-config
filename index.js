/**
 * Index.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var Config = require('./lib/config/Config');
var FileLoader = require('./lib/config/FileLoader');
var environmentDetector = require('./lib/config/environmentDetector');
var path = require('path');
var helper = require('./lib/support/helper');

module.exports = function (configDirPath, environments) {
    if (!helper.isset(environments))
        environments = {};

    if (!helper.isset(configDirPath))
        configDirPath = "";

    var env = process.env.NODE_ENV = environmentDetector.detect(environments);

    return new Config(new FileLoader(path.join(configDirPath, 'config')), env)
};