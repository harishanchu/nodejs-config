nodejs-config
=============

A [Laravel](http://laravel.com/) inspired advanced NodeJs configuration loader and manager which can load configuration values based on the development
environment.

[![Build Status](https://travis-ci.org/harishanchu/nodejs-config.svg?branch=master)](https://travis-ci.org/harishanchu/nodejs-config)


##Installation##

The source is available for download from [GitHub](https://github.com/harishanchu/nodejs-config). Alternatively, you can install using Node Package Manager (npm):

```javascript
npm install nodejs-config
```

##Setup##

You may create multiple configuration files and put group of configurations belongs to same category into a single
file. Configuration manager lazy load configuration files whenever configuration values that belongs to a particular
file is requested. When once a configuration file is loaded then it gets cached by the configuration manager and it
won't load again from the disk whenever configuration belongs to that file is requested again. See the example
configuration files in the [tests folder](https://github.com/harishanchu/nodejs-config/tests/config).

All of the configuration files for the nodejs-config manager are stored in the config directory. During setup
up of the configuration manager you can pass the path to location of your applications configuration directory to the
configuration manager. Along with the configuration directory path you also need to pass an object containing various
environments you are going to use in you application along with name of the machine's where your application is going
to execute. Based on the machine's name, configuration manager will determine the current environment and load the
configurations when you request for that environment.

You can setup a new configuration manager instance with following syntax:

```javascript
var config = require('nodejs-config')(
    {                                                       // object with various environment name and machine names
        development: ['machine-name-1', 'machine-name-2'],
        staging:['machine-name-3'],
    },
    __dirname                                               // an absolute path to configuration directory
);
```

####Accessing A Configuration Value####

To access a configuration field `timezoneOffset` from the configuration file 'config/app.js' use following syntax:

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

####Environment Configuration####

It is often helpful to have different configuration values based on the environment the application is running in. For
example, you may wish to use a different timezoneOffset on your local development machine than on the production server.
It is easy to accomplish this using environment based configuration.

Simply create a folder within the config directory that matches your environment name, such as local. Next, create the
configuration files you wish to override and specify the options for that environment. For example, to override the
timezoneOffset for the local environment, you would create a app.js file in $path/config/local with the following
content:

```javascript
var config = {

    timezoneOffset: '6.30',

};

module.exports = config;
```
Notice that you do not have to specify every option that is in the base configuration file, but only the options you
wish to override. The environment configuration files will "cascade" over the base files.

Next, we need to instruct the configuration manager how to determine which environment it is running in. The default
environment is always production. However, you may pass an environments object to configuration manager during
initialization. The object passed to this method is used to determine the current environment.
The Object should have following structure:

```javascript
    {
        development: ['your-machine-name']
    }
```

You may add any number of environments and machine names to the object as needed. In this example, 'development' is the
name of the environment and 'your-machine-name' is the hostname of your server. On Linux and Mac, you may determine
your hostname using the hostname terminal command. If you need more flexible environment detection, you may pass a
function to the configuration initialization method, allowing you to implement environment detection however you wish:

```javascript
function()
{
    return process.env.NODE_ENV;
}
```

####Accessing The Current Application Environment####

You may access the current application environment via the environment method:

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