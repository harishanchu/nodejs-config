/**
 * FileLoader.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var fs = require('fs');
var _ = require('lodash');
var helper = require('../support/helper');

/**
 * Create a new file configuration loader.
 *
 * @param  {string}  defaultPath
 * @return {void}
 * @constructor
 */
function FileLoader(defaultPath) {

    /**
     * The default configuration path.
     *
     * @var {string}
     * @protected
     */
    this.__defaultPath = defaultPath;

    /**
     * A cache of whether namespaces and groups exists.
     *
     * @var {Array}
     * @protected
     */
    this.__exists = [];

}

/**
 * Load the given configuration group.
 *
 * @param  {string}  environment
 * @param  {string}  group
 * @return {Array}
 */
FileLoader.prototype.load = function (environment, group) {
    var items = [];

    // First we'll get the root configuration path for the environment which is
    // where all of the configuration files live for that namespace, as well
    // as any environment folders with their specific configuration items.
    var path = this.__defaultPath;

    if (helper.is_null(path)) {
        return items;
    }

    // First we'll get the main configuration file for the groups. Once we have
    // that we can check for any environment specific files, which will get
    // merged on top of the main arrays to make the environments cascade.
    var file = path + "/" + group + ".json";

    if (fs.existsSync(file)) {
        items = require(file);
    }

    // Finally we're ready to check for the environment specific configuration
    // file which will be merged on top of the main arrays so that they get
    // precedence over them if we are currently in an environments setup.
    file = path + "/" + environment + "/" + group + ".json";

    if (fs.existsSync(file)) {
        items = this.__mergeEnvironment(items, file);
    }

    return items;
};

/**
 * Merge the items in the given file into the items.
 *
 * @param  {Array}   items
 * @param  {string}  file
 * @return {Array}
 * @protected
 */
FileLoader.prototype.__mergeEnvironment = function (items, file) {
    // clone workaround: else when you require same config file again node will return the overwritten object.
    items = _.clone(items, true);
    return _.merge(items, require(file));
};

/**
 * Determine if the given group exists.
 *
 * @param  {string}  group
 * @return {bool}
 */
FileLoader.prototype.exists = function (group) {
    // We'll first check to see if we have determined if this group
    // has been checked before. If it has, we will just return the
    // cached result so we don't have to hit the disk.
    if (helper.isset(this.__exists[group])) {
        return this.__exists[group];
    }

    var file = this.__defaultPath + "/" + group + '.json';

    // We can simply check if this file exists. We will also cache
    // the value in an array so we don't have to go through this process
    // again on subsequent checks for this group.
    var exists = fs.existsSync(file);

    return this.__exists[group] = exists;
};

module.exports = FileLoader;