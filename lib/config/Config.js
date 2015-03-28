/**
 * Config.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var helper = require('../support/helper');

/**
 * Create a new configuration instance.
 *
 * @param  {FileLoader} loader
 * @param  {string}  environment
 * @return void
 * @constructor
 */
function Config(loader, environment) {

    /**
     * The loader implementation.
     *
     * @var {FileLoader}
     * @protected
     */
    this.__loader = loader;

    /**
     * The current environment.
     *
     * @var {string}
     * @protected
     */
    this.__environment = environment;

    /**
     * All of the configuration items.
     *
     * @var {Array}
     * @protected
     */
    this.__items = [];

}

/**
 * Determine if the given configuration value exists.
 *
 * @param {string}  key
 * @return bool
 */
Config.prototype.has = function (key) {
    var defaultVal = helper.microtime(true);

    return this.get(key, defaultVal) !== defaultVal;
};

/**
 * Determine if a configuration group exists.
 *
 * @param  {string} key
 * @return bool
 */
Config.prototype.hasGroup = function (key) {
    var output = this.parseKey(key);

    return this.__loader.exists(output['group']);
};

/**
 * Converts a configuration key to group and item.
 *
 * @param key
 * @returns {{group: *, item: *}}
 */
Config.prototype.parseKey = function (key) {
    var segments = key.split('.');
    var item;
    if (segments.length == 1)
        item = null;
    else
        item = (segments.slice(1)).join('.');

    return {
        group: segments[0],
        item: item
    };
};

/**
 * Get the specified configuration value.
 *
 * @param  {string} key
 * @param  {*} defaultVal
 * @return {*}
 */
Config.prototype.get = function (key, defaultVal) {
    if (!helper.isset(defaultVal)) {
        defaultVal = null;
    }
    var output = this.parseKey(key);

    this.__load(output['group']);

    var item;
    return helper.isset(output['item']) ? (helper.isset(item = helper.objectGet(this.__items[output['group']], output['item'])) ? item : defaultVal) : this.__items[output['group']];
};

/**
 * Set a given configuration value.
 *
 * @param  {string}  key
 * @param  {*}       value
 * @return {void}
 */
Config.prototype.set = function (key, value) {
    var output = this.parseKey(key);

    // We'll need to go ahead and configuration group even when we're just
    // setting a configuration item so that the set item does not
    // get overwritten if a different item in the group is requested later.
    this.__load(output['group']);

    if (helper.is_null(output['item'])) {
        this.__items[output['group']] = value;
    }
    else {
        helper.objectSet(this.__items[output['group']], output['item'], value);
    }
};

/**
 * Load a configuration group.
 *
 * @param  {string}  group
 * @return {void}
 * @protected
 */
Config.prototype.__load = function (group) {
    var env = this.__environment;

    // If we've already loaded this group, we will just bail out since we do
    // not want to load it again. Once items are loaded a first time they will
    // stay kept in memory within this class and not loaded from disk again.
    if (helper.isset(this.__items[group])) {
        return;
    }

    this.__items[group] = this.__loader.load(env, group);
};

/**
 * Get the loader implementation.
 *
 * @return {FileLoader}
 */
Config.prototype.getLoader = function () {
    return this.__loader;
};

/**
 * Set the loader implementation.
 *
 * @param  {FileLoader}  loader
 * @return {void}
 */
Config.prototype.setLoader = function (loader) {
    this.__loader = loader;
};

/**
 * Get or check the current configuration environment.
 *
 * @return string
 */
Config.prototype.environment = function () {
    if (arguments.length > 0) {
        return !!~Array.prototype.indexOf.call(arguments, this.__environment);
    }
    else {
        return this.__environment;
    }
};

/**
 * Get all of the configuration items.
 *
 * @return {object}
 */
Config.prototype.getItems = function () {
    return this.__items;
};

module.exports = Config;