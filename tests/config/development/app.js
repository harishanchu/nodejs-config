/**
 * app.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var config = {

    debug: false,

    url: 'http://localhost',

    timezone: 'UTC+5.30',

    locale: 'fr',

    mapping: {
        fields: {
            second: {
                external_id: 'subject'
            }
        }
    }
};

module.exports = config;