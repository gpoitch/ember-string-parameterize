# Ember.String.parameterize [![Build Status](https://travis-ci.org/gdub22/ember-string-parameterize.png?branch=master)](https://travis-ci.org/gdub22/ember-string-parameterize)

A javascript method (with an [ember.js](http://emberjs.com) wrapper) to transform a string so that it may be used as part of a 'pretty' / SEO friendly URL.
Similar to ActiveSupport's [parameterize](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html#method-i-parameterize) inflector.

This is useful for creating slugs for your Ember.js routes.  So useful that this feature was [merged](https://github.com/emberjs/ember.js/pull/3953) into Ember core with a feature flag, but later [removed](https://github.com/emberjs/ember.js/pull/4452) due to [potential API bloat](http://emberjs.com/blog/2014/01/19/core-team-meeting-minutes-2014-01-17.html). Voice your opinion if you want it back, or, just use this!

## Usage

Include `ember-string-parameterize.js` after `ember.js` in your app.

Or using package managers:
```bash
bower install ember-string-parameterize
```
```bash
npm install ember-string-parameterize
```

## Examples

### With Ember
```javascript
'My favorite movies.'.parameterize();
//=> 'my-favorite-movies'

'some_underscored_string'.parameterize();
//=> 'some-underscored-string'

'100 ways Ember.js is better than Angular'.parameterize();
//=> '100-ways-emberjs-is-better-than-angular'

'#emberjs Core Team Meeting Minutes - 2014/12/06'.parameterize();
//=> 'emberjs-core-team-meeting-minutes-2014-12-06'
```

#### Limit the number of words
```javascript
'100 ways Ember.js is better than Angular'.parameterize(5);
//=> '100-ways-emberjs-is-better'

'100 ways Ember.js is better than Angular'.parameterize(-2);
//=> '100-ways-emberjs-is-better'
```

#### When `Ember.EXTEND_PROTOTYPES` is disabled
```javascript
Ember.String.parameterize('Using without extending prototypes!');
//=> 'using-without-extending-prototypes'

Ember.String.parameterize('Using without extending prototypes!', 3);
//=> 'using-without-extending'
```

### Vanilla JS
It will also expose `StringParameterize` to the browser's window object or node.js
```javascript
StringParameterize('I work without Ember.js');
//=> 'i-work-without-emberjs'

StringParameterize('I work without Ember.js', 2);
//=> 'i-work'
```