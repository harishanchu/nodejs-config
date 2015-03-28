nodejs-config
=============

A [Laravel](http://laravel.com/) inspired simple NodeJs configuration loader and manager which can load configuration
values based on the development environment.

[![Build Status](https://travis-ci.org/harishanchu/nodejs-config.svg?branch=master)](https://travis-ci.org/harishanchu/nodejs-config)


##Installation##

The source is available for download from [GitHub](https://github.com/harishanchu/nodejs-config). Alternatively, you 
can install using Node Package Manager (npm):

```javascript
npm install nodejs-config
```

##Setup##

All the configurations should be stored in your application within a folder named config. You may create 
multiple configuration files(json) and put group of configurations belongs to same category into a single file. For example
you may keep applications general settings in `config/app.json` and database settings in `config/database.json`.
See example configuration files at [test folder](https://github.com/harishanchu/nodejs-config/tree/master/tests).
 
You can setup a new configuration manager instance with following syntax:
 
```javascript
var config = require('nodejs-config')(
   __dirname  // an absolute path to your applications `config` directory
);
```
During setup you may instruct the configuration manager how to determine which environment it is running in. The 
default environment for configuration manager is always production. However, you may pass an environments object to 
configuration manager during setup. The object passed to this method is used to determine the current 
environment.
The Object should have following structure:

```javascript
var config = require('nodejs-config')(
   __dirname,  // an absolute path to your applications 'config' directory
   {
      development: ['your-machine-name']
   }
);
```

You may add any number of environments and machine names to the object as needed. In this example, 'development' is the
name of the environment and 'your-machine-name' is the hostname of your server. On Linux and Mac, you may determine
your hostname using the hostname terminal command. If you need more flexible environment detection, you may pass a
function to the configuration setup method, allowing you to implement environment detection however you wish:

```javascript
var config = require('nodejs-config')(
   __dirname,  // an absolute path to your applications 'config' directory
   function()
   {
      return process.env.NODE_ENV;
   }
);
```

####Accessing A Configuration Value####

To access a configuration field `timezoneOffset` from the configuration file 'config/app.json' use following syntax:

```javascript
config.get('app').timezoneOffset;
```

or alternatively you can get a nested configuration  value out of the configuration group with dot style syntax as 
follows: 

```javascript
config.get('app.timezoneOffset');
```
You may also specify a default value to return if the configuration option does not exist:

```javascript
config.get('app.timezoneOffset', 5.30);
```

####Setting A Configuration Value####

You may also set configuration values at run-time:

```javascript
config.set('database.default', 'mongo');
```

Configuration values that are set at run-time are only set for life time of the configuration manager instance.

####Environment Specific Configuration####

It is often helpful to have different configuration values based on the environment the application is running in. For
example, you may wish to use a different timezoneOffset on your local development machine than on the production server.
It is easy to accomplish this using environment based configuration.

Simply create a folder within the config directory that matches your environment name, such as local. Next, create the
configuration files you wish to override and specify the options for that environment. For example, to override the
timezoneOffset for the local environment, you would create a app.json file in $path/config/local with the following
content:

```javascript
{
    "timezoneOffset": "6.30",
};
```
Notice that you do not have to specify every option that is in the base configuration file, but only the options you
wish to override. The environment configuration files will "cascade" over the base files.

####Accessing The Current Configuration Environment####

You may access the current configuration environment via the environment method:

```javascript
environment = config.environment();
```

You may also pass arguments to the environment method to check if the environment matches a given value:


```javascript
if (config.environment('local'))
{
    // The environment is local
}
if (config.environment('local', 'staging'))
{
    // The environment is either local OR staging...
}
```