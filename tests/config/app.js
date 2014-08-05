/**
 * app.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var config = {

    debug: true,

    url: 'http://localhost',

    timezone: 'UTC',

    locale: 'en',

    mapping: {
        fields: {
            first: {
                external_id: 'subject',
                external_id_title: 'Subject'
            },
            second: {
                external_id: 'title',
                external_id_title: 'Title'
            }
        }
    }
};

module.exports = config;