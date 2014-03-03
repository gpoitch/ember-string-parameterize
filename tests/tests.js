
module('String parameterize');

var isEmberPresent = typeof this.Ember !== 'undefined';
var extendProto = (function() {
  if (isEmberPresent) { 
    return Ember.EXTEND_PROTOTYPES === true || Ember.EXTEND_PROTOTYPES.String;
  }
  return false;
}());

var runParameterizeTest = function(input, expected) {
  deepEqual(parameterize(input), expected);
  if(isEmberPresent) {
    deepEqual(Ember.String.parameterize(input), expected);
    if(extendProto) {
      deepEqual(input.parameterize(), expected);
    }
  }
};

var runParameterizeTestWithLimit = function(input, limit, expected) {
  deepEqual(parameterize(input, limit), expected);
  if(isEmberPresent) {
    deepEqual(Ember.String.parameterize(input, limit), expected);
    if(extendProto) {
      deepEqual(input.parameterize(limit), expected);
    }
  }
};


if (!extendProto) {
  test('String.prototype.parameterize is not modified if ENV.EXTEND_PROTOTYPES is false', function() {
    ok(typeof String.prototype.parameterize === 'undefined', 'proptype extension disabled');
  });
}

test('parameterize normal string', function() {
  runParameterizeTest(
    'My favorite items.',
    'my-favorite-items'
  );
});

test('parameterize underscored string', function() {
  runParameterizeTest(
    'action_name',
    'action-name'
  );
});

test('does nothing to parameterized string', function() {
  runParameterizeTest(
    'my-favorite-items',
    'my-favorite-items'
  );
});

test('parameterize real world strings with special characters', function() {
  runParameterizeTest(
    '100 ways Ember.js is better than Angular.',
    '100-ways-emberjs-is-better-than-angular'
  );
  runParameterizeTest(
    'You\'re (really) going to LOVE handling my "special" characters!?!',
    'youre-really-going-to-love-handling-my-special-characters'
  );
  runParameterizeTest(
    '#emberjs Core Team Meeting Minutes - 2013/12/06',
    'emberjs-core-team-meeting-minutes-2013-12-06'
  );
});

test('parameterize string with leading and trailing special characters', function() {
  runParameterizeTest(
    '   -- leading & --trailing  --_*-!-',
    'leading-trailing'
  );
});

test('word limit', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', 5,
    '100-ways-emberjs-is-better'
  );
});

test('word limit supports negative values', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', -2,
    '100-ways-emberjs-is-better'
  );
});

test('word limit with leading and trailing whitespace works', function() {
  runParameterizeTestWithLimit(
    '   100 ways Ember.js is better than Angular.   ', 5,
    '100-ways-emberjs-is-better'
  );
});

test('word limit with successive whitespace works', function() {
  runParameterizeTestWithLimit(
    ' 100 ways   Ember.js is  better  than Angular.', 5,
    '100-ways-emberjs-is-better'
  );
});

test('word limit 0 returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', 0,
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('word limit larger than number of words returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', 99,
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('word limit with negative number greater than number of words returns empty string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', -99,
    ''
  );
});

test('null word limit returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', null,
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('undefined word limit returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', undefined,
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('invalid word limit (boolean: true) returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', true,
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('invalid word limit (boolean: false) returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', false,
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('invalid word limit (a string) returns full parameterized string', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', 'blah',
    '100-ways-emberjs-is-better-than-angular'
  );
});

test('invalid word limit (a float) returns parameterized string with int word limit', function() {
  runParameterizeTestWithLimit(
    '100 ways Ember.js is better than Angular.', 2.2,
    '100-ways'
  );
});
