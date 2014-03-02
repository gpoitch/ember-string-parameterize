(function(global, Ember) {
  /**
    Transforms a string so that it may be used as part of a 'pretty' / SEO friendly URL.
    Similar to ActiveSupport's parameterize inflector.
    This is useful for creating slugs for your routes.
    Also works with String prototype syntax, when `Ember.EXTEND_PROTOTYPES.String` is enabled.

    @namespace Ember
    @class String
    @method parameterize
    @param {String} str The string to parameterize.
    @return {String} the parameterized string.
    @example
      ```
      Ember.String.parameterize('My favorite movies.');
      //=> 'my-favorite-movies'
      Ember.String.parameterize('some_underscored_string');
      //=> 'some-underscored-string'
      Ember.String.parameterize('100 ways Ember.js is better than Angular.');
      //=> '100-ways-emberjs-is-better-than-angular'
      Ember.String.parameterize('#emberjs Core Team Meeting Minutes - 2014/12/06');
      //=> 'emberjs-core-team-meeting-minutes-2014-12-06'
      'I work this way too!'.parameterize();
      //=> 'i-work-this-way-too'
      ```
  */

  // Allow usage without needing Ember.js framework
  if ('undefined' === typeof Ember) {
    Ember = global.Ember = { String: {} };
  }
  
  var STRING_PARAMETERIZE_REGEXP_1 = (/[_|\/|\s]+/g),
      STRING_PARAMETERIZE_REGEXP_2 = (/[^a-z0-9\-]+/gi),
      STRING_PARAMETERIZE_REGEXP_3 = (/[\-]+/g),
      STRING_PARAMETERIZE_REGEXP_4 = (/^-+|-+$/g);
      
  var parameterize = Ember.String.parameterize = function(str) {
    return str.replace(STRING_PARAMETERIZE_REGEXP_1, '-') // replace underscores, slashes and spaces with separator
              .replace(STRING_PARAMETERIZE_REGEXP_2, '')  // remove non-alphanumeric characters except the separator
              .replace(STRING_PARAMETERIZE_REGEXP_3, '-') // replace multiple occurring separators
              .replace(STRING_PARAMETERIZE_REGEXP_4, '')  // trim leading and trailing separators 
              .toLowerCase();
  };

  // Apply to String.prototype if extending proptypes is enabled in Ember.js app
  var EXTEND_PROTOTYPES = Ember.EXTEND_PROTOTYPES;
  if (EXTEND_PROTOTYPES === true || (EXTEND_PROTOTYPES && EXTEND_PROTOTYPES.String)) {
    String.prototype.parameterize = function() {
      return parameterize(this);
    };
  }

}(this, this.Ember));