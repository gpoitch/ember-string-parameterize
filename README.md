# Ember.String.parameterize [![Build Status](https://travis-ci.org/gdub22/ember-string-parameterize.png?branch=master)](https://travis-ci.org/gdub22/ember-string-parameterize)

An [ember.js](http://emberjs.com) extension that transforms a string so that it may be used as part of a 'pretty' / SEO friendly URL.
Similar to ActiveSupport's [parameterize](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html#method-i-parameterize) inflector.

This is useful for creating slugs for your Ember.js routes.  So useful that this feature was [merged](https://github.com/emberjs/ember.js/pull/3953) into Ember core with a feature flag, but later [removed](https://github.com/emberjs/ember.js/pull/4452) due to [potential API bloat](http://emberjs.com/blog/2014/01/19/core-team-meeting-minutes-2014-01-17.html). Voice your opinion if you want it back, or, just use this!

## Examples
```javascript
Ember.String.parameterize('My favorite movies.');
//=> 'my-favorite-movies'

Ember.String.parameterize('some_underscored_string');
//=> 'some-underscored-string'

Ember.String.parameterize('100 ways Ember.js is better than Angular.');
//=> '100-ways-emberjs-is-better-than-angular'

Ember.String.parameterize('#emberjs Core Team Meeting Minutes - 2014/12/06');
//=> 'emberjs-core-team-meeting-minutes-2014-12-06'
```

Also works with String prototype syntax, when `Ember.EXTEND_PROTOTYPES.String` is enabled. (enabled by default in Ember.js)
```javascript
'I work this way too!'.parameterize();
//=> 'i-work-this-way-too'
```

## Use it

Include `ember-string.parameterize.js` after `ember.js` in your app.

bower:
```bash
bower install ember-string-parameterize`
```

npm:
```bash
npm install ember-string-parameterize`
```