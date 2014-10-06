/**
 * environmentDetector.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */
var os = require('os');
var helper = require('../support/helper');

module.exports = {
    detect: detect
};

/**
 * Detect the application's current environment.
 *
 * @param {Object|function} environments
 * @return string
 */
function detect(environments) {
    return detectWebEnvironment(environments);
}

/**
 * Set the application environment for a web request.
 *
 * @param {Object|function} environments
 * @return string
 */
function detectWebEnvironment(environments) {
    // If the given environment is just a Closure, we will defer the environment check
    // to the Closure the developer has provided, which allows them to totally swap
    // the webs environment detection logic with their own custom Closure's code.
    if (typeof environments === 'function') {
        return environments()
    }

    var hosts;
    for (var environment in environments) {
        hosts = environments[environment];

        // To determine the current environment, we'll simply iterate through the possible
        // environments and look for the host that matches the host for this request we
        // are currently processing here, then return back these environment's names.
        hosts = helper.parseObject(hosts);
        var k, host;
        for (k in hosts) {
            host = hosts[k];
            if (isMachine(host)) return environment;
        }
    }

    return 'production';
}

/**
 * Determine if the name matches the machine name.
 *
 * @param {string} name
 * @return bool
 */
function isMachine(name) {
    return helper.str_is(name, os.hostname());
}
