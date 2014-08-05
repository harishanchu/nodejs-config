/**
 * helper.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

var helper = {};

/**
 * Determine if a given string matches a given pattern.
 *
 * @param {string} pattern
 * @param {string} value
 * @return bool
 */
helper.str_is = function(pattern, value) {
    if (pattern == value) return true;

    pattern = preg_quote(pattern, '/');

    // Asterisks are translated into zero-or-more regular expression wildcards
    // to make it convenient to check if the strings starts with the given
    // pattern such as "library/*", making any string check convenient.
    pattern = pattern.replace('/\*/g', '.*') + '\\z';
    pattern = new RegExp('^' + pattern);

    return pattern.test(value);
};

function preg_quote(str, delimiter) {
    //  discuss at: http://phpjs.org/functions/preg_quote/
    // original by: booeyOH
    // improved by: Ates Goral (http://magnetiq.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman

    return String(str)
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

/**
 * Transform given input to object if it is not an object.
 *
 * @param {*} element
 * @return {object}
 */
helper.parseObject = function (element) {
    element = element instanceof Object ? element : {0: element};
    return element;
};

/**
 * Checks whether given value is null or undefined.
 *
 * @returns {boolean}
 */
helper.isset = function () {
    //  discuss at: http://phpjs.org/functions/isset/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: FremyCompany
    // improved by: Onno Marsman
    // improved by: Rafał Kukawski
    //   example 1: isset( undefined, true);
    //   returns 1: false
    //   example 2: isset( 'Kevin van Zonneveld' );
    //   returns 2: true

    var a = arguments,
        l = a.length,
        i = 0,
        undef;

    if (l === 0) {
        throw new Error('Empty isset');
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
};

/**
 * Checks whether given value is equal to null.
 *
 * @param variable
 * @returns {boolean}
 */
helper.is_null = function(variable) {
    return (variable === null);
};

module.exports = helper;