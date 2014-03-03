(function(global, Ember) {
  'use strict';
  /**
    Transforms a string so that it may be used as part of a 'pretty' / SEO friendly URL.
    Similar to ActiveSupport's parameterize inflector.

    @class String
    @method parameterize
    @param  {String} string The string to parameterize.
    @param  {String} [wordLimit] Optionaly limit number of words outputted.
    @return {String} the parameterized string.
    @example
      ```
    '100 ways Ember.js is better than Angular'.parameterize();
    //=> '100-ways-emberjs-is-better-than-angular'
    '#emberjs Core Team Meeting Minutes - 2014/12/06'.parameterize();
    //=> 'emberjs-core-team-meeting-minutes-2014-12-06'
      ```
  */

  var SPECIAL_CHAR_REGEXP      = (/[_|\/|\s]+/g),
      NON_ALPHA_NUMERIC_REGEXP = (/[^a-z0-9\-]+/gi),
      MULTI_SEPARATOR_REGEXP   = (/[\-]+/g),
      TRIM_SEPARATOR_REGEXP    = (/^-+|-+$/g),
      MULTI_WHITESPACE_REGEXP  = (/\s+/g),
      SEPARATOR = '-', SPACE = ' ', EMPTY = '',
      TYPE_UNDEFINED = 'undefined';
      
  var parameterize = function(string, wordLimit) {
    if(wordLimit && typeof wordLimit === 'number') {
      string = string.trim()
                     .replace(MULTI_WHITESPACE_REGEXP, SPACE)
                     .split(SPACE)
                     .slice(0, wordLimit)
                     .join(SPACE);
    }

    return string.replace(SPECIAL_CHAR_REGEXP, SEPARATOR)    // replace underscores, slashes and spaces with separator
                 .replace(NON_ALPHA_NUMERIC_REGEXP, EMPTY)   // remove non-alphanumeric characters except the separator
                 .replace(MULTI_SEPARATOR_REGEXP, SEPARATOR) // replace multiple occurring separators
                 .replace(TRIM_SEPARATOR_REGEXP, EMPTY)      // trim leading and trailing separators 
                 .toLowerCase();                             // convert to lowercase
  };

  // Add to Ember.js String, if present
  if (typeof Ember !== TYPE_UNDEFINED) { 
    Ember.String.parameterize = parameterize;

    // Extend String.prototype if enabled in Ember.js app
    var extendProto = Ember.EXTEND_PROTOTYPES;
    if (extendProto === true || extendProto.String) {
      String.prototype.parameterize = function(wordLimit) {
        return parameterize(this, wordLimit);
      };
    }
  }

  // Export for node.js and browser
  if (typeof exports !== TYPE_UNDEFINED) {
    if (typeof module !== TYPE_UNDEFINED && module.exports) {
      exports = module.exports = parameterize;
    }
    exports.parameterize = parameterize;
  } else {
    global.parameterize = parameterize;
  }
}(this, this.Ember));