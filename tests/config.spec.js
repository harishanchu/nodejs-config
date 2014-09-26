/**
 * config.spec.js.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

describe("nodejs-config", function () {
    it("should be callable", function () {
        var config = require('../index')
        expect(typeof config).toEqual('function');
    });

    it("should return an instance of lib/config/Repository on require.", function () {
        var config = require('../index')();
        var Nodejs_config = require('../lib/config/Config');
        expect(config instanceof Nodejs_config).toBeTruthy();
    });

    it("should have method has and it should return whether a config key exists.", function () {
        var config = require('../index')({}, __dirname);
        expect(config.has('app.url')).toBeTruthy();
        expect(config.has('app.host')).toBeFalsy();
    });

    it("should have method hasGroup and it should return whether a config group exists.", function () {
        var config = require('../index')({}, __dirname);
        expect(config.hasGroup('app')).toBeTruthy();
        expect(config.hasGroup('server')).toBeFalsy();
    });

    it("should have method parseKey and it should return an associative array with group and item value.", function () {
        var config = require('../index')({}, __dirname);
        expect(config.parseKey('app.cache.timeout')).toEqual({group: "app", item: "cache.timeout"});
        expect(config.parseKey('app')).toEqual({group: "app", item: null});
    });

    describe("should have method get and it should", function () {
        it("return a config key value if it exists.", function () {
            var config = require('../index')({}, __dirname);
            expect(config.get('app.locale')).toEqual("en")
        });

        it("return a null value if a key doesn't exists in the configuration group.", function () {
            var config = require('../index')({}, __dirname);
            expect(config.get('app.server')).toEqual(null)
        });

        it("return value of a deep nested key with dot notation.", function () {
            var config = require('../index')({}, __dirname);
            expect(config.get('app.mapping.fields.first.external_id')).toEqual('subject')
        });

        it("overwrite default configuration key values based on environment if environment specific configuration " +
            "exists.", function () {
            var os = require('os');

            var config = require('../index')({production: [os.hostname()]}, __dirname);
            expect(config.get('app.debug')).toEqual(true);

            config = require('../index')({development: [os.hostname()]}, __dirname);
            expect(config.get('app.debug')).toEqual(false);
        });

        it("not overwrite default configuration key values if there is no value exists for a parent key in the " +
            "environment specific configuration during overwrite of a child key value.", function () {
            var os = require('os');

            var config = require('../index')({production: [os.hostname()]}, __dirname);
            expect(config.get('app.mapping.fields.second.external_id')).toEqual('title');
            expect(config.get('app.mapping.fields.second.external_id_title')).toEqual('Title');

            config = require('../index')({development: [os.hostname()]}, __dirname);
            expect(config.get('app.mapping.fields.second.external_id')).toEqual('subject');
            expect(config.get('app.mapping.fields.second.external_id_title')).toEqual('Title');
        });
    });

    describe("should have a method set and it should", function () {
        it("set a configuration key value if it doesn't exist.", function () {
            var config = require('../index')({}, __dirname);
            expect(config.get('app.cache')).toEqual(null);
            config.set('app.cache', true);
            expect(config.get('app.cache')).toEqual(true);
        });

        it("set a deep nested key with dot notation and should not overwrite other childs of keys parent node.", function () {
            var config = require('../index')({}, __dirname);
            expect(config.get('app.mapping.fields.second.external_id')).toEqual('title');
            config.set('app.mapping.fields.second.external_id', 'subject');
            expect(config.get('app.mapping.fields.second.external_id')).toEqual('subject');
            expect(config.get('app.mapping.fields.second.external_id_title')).toEqual('Title');
        });
    });

//    describe("should have a method __load", function(){
//        var config;
//        beforeEach(function() {
//            config = require('../index')({}, __dirname);
//            spyOn(config, 'get').and.callThrough();
//            config.get('app.url');
//        });
//        it("and it should have been called when getting configuration key from a particular group for the first time " +
//            "only", function(){
////            expect(config.__load).toHaveBeenCalled();
//        })
//    })

    it("should have a method __load should set a configuration group value into __items array with key as configuration group", function () {
        var config = require('../index')({}, __dirname);
        expect(config.__items['app']).toBeFalsy();
        config.__load('app');
        expect(config.__items['app']).toBeTruthy();
    });

    it("should have a method getLoader and should return an instance of lib/config/FileLoader", function () {
        var config = require('../index')({}, __dirname);
        expect(config.getLoader() instanceof require('../lib/config/FileLoader')).toBeTruthy();
    });

    it("should have a method getEnvironment and should return the current environement name", function () {
        var os = require('os');
        var config = require('../index')({development: [os.hostname()]}, __dirname);
        expect(config.getEnvironment() === "development").toBeTruthy();
    });

    it("should have a method getItems and should return protected variable __items", function () {
        var config = require('../index')({}, __dirname);
        expect(config.getItems() === config.__items).toBeTruthy();
    });
});