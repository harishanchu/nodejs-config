/**
 * fileLoader.spec.js.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

/*global describe, it, expect */

describe("fileLoader", function () {
    it("should be callable.", function () {
        //todo: note check constructor
        var FileLoader = require('../lib/config/FileLoader');

        expect(typeof FileLoader).toEqual("function");
    });

    it("should have a method load which should return configuration of a group based on environment and group " +
        "specified.", function () {
        var fileLoader = new (require('../lib/config/FileLoader'))(__dirname + "/config");

        expect(fileLoader.load('production', 'app')).toEqual(require('./config/app'));
        expect(fileLoader.load('development', 'app')).toEqual(fileLoader.__mergeEnvironment(require('./config/app'),
                __dirname + '/config/development/app'));
    });

    it("should have a method __mergeEnvironment which should merge a configuration object and configuration file at a path", function () {
        var fileLoader = new (require('../lib/config/FileLoader'))(__dirname + "/config");

        var items = fileLoader.load('production', 'app');
        expect(items.debug).toEqual(true);

        items = fileLoader.__mergeEnvironment(items, __dirname + '/config/development/app');
        expect(items.debug).toEqual(false);
    });

    describe("should have a method exists which should", function () {
        it("should return whether a group of configuration exists by group name.", function () {
            var fileLoader = new (require('../lib/config/FileLoader'))(__dirname + "/config");

            expect(fileLoader.exists('app')).toBeTruthy();
            expect(fileLoader.exists('server')).toBeFalsy();
        });

        it("should cache whether a group of configuration exists by group name into the __exists array.", function () {
            var fileLoader = new (require('../lib/config/FileLoader'))(__dirname + "/config");

            expect(fileLoader.__exists['app']).toEqual(undefined);
            expect(fileLoader.exists('app')).toEqual(fileLoader.__exists['app']);
        });
    });


});