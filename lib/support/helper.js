/**
 * helper.js
 *
 * @auther: harish <twitter:@harishanchu>
 * Copyright (c) 2014, Harish Anchu. All rights reserved.
 */

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

module.exports = helper;