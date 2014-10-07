/**
 * database.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var config = {

    defaultConnection: 'mongodb',

    connections: {

        'mysql': {
            'driver': 'mysql',
            'host': 'localhost',
            'database': 'database_name',
            'username': '',
            'password': '',
            'charset': 'utf8',
            'collation': 'utf8_unicode_ci',
            'prefix': 'pm_'
        },

        'mongodb': {
            'driver': 'mongodb',
            'host': 'mongo_host',
            'port': 'mongo_port',
            'username': '',
            'password': '',
            'database': 'database_name'
        }

    }

};

module.exports = config;