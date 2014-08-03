/**
 * environmentDetector.spec.js.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

describe("environmentDetector", function(){
    it("should be an object.", function(){
        var environmentDetecor = require('../lib/config/environmentDetector')
        expect(typeof environmentDetecor).toEqual('object');
        expect(typeof environmentDetecor.detect).toEqual("function");
    });

    describe("should have a method detect and", function(){
        it("should be callabe", function(){
            var environmentDetecor = require('../lib/config/environmentDetector')
            expect(typeof environmentDetecor.detect).toEqual("function");
        })

        it("should return an environment name which this running machine belongs to.", function(){
            var os = require('os');
            var environmentDetecor = require('../lib/config/environmentDetector');
            expect(environmentDetecor.detect(
                {
                    development: ['sfhshdfhhskd', os.hostname()],
                    production: ['hfhhsdjjsd']
                }
            )).toEqual("development");
        });

        it("should return 'production' as environment there is no environment specified with running machine.", function(){
            var environmentDetecor = require('../lib/config/environmentDetector');
            expect(environmentDetecor.detect(
                {
                    development: ['sfhshdfhhskd','sdsa'],
                    production: ['hfhhsdjjsd']
                }
            )).toEqual("production");

            expect(environmentDetecor.detect({})).toEqual("production");
        });

        it("should return response of callback method provided as environment.", function(){
            var environmentDetecor = require('../lib/config/environmentDetector');
            expect(environmentDetecor.detect(function(){ return "myEnvlogic"})).toEqual("myEnvlogic");
        });
    });
})