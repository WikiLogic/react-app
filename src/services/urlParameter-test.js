//using tape to test: here's an articel I read through before doing this: https://ponyfoo.com/articles/testing-javascript-modules-with-tape
const test = require('tape');
const urlParameter = require('./urlParameter');

var tapSpec = require('tap-spec');

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

const performanceBenchmark = 50;//ms - this may have to change depending on your machien

speedTest = function(t, fn){
	var start = new Date();
	for (var i = 0; i < 10000; i++) { fn(); }
	var executionTime = new Date() - start;
	t.ok(executionTime < performanceBenchmark, '-- ' + executionTime + 'ms');
};

test('Writing values', function(t){

    t.equal(urlParameter.set('test', 'one', '', true), '?test=one', 'Add to blank');
    speedTest(t, () => urlParameter.set('test', 'one', '', true) );

    var result = urlParameter.set('1', '1', '?2=2', true);
    t.ok(result == '?1=1&2=2' || result == '?2=2&1=1', 'Add to existing');
    speedTest(t, () => urlParameter.set('1', '1', '?2=2', true) );

    t.equal(urlParameter.set('1', '2', '?1=1', true), '?1=2', 'Overwrite existing');
    speedTest(t, () => urlParameter.set('1', '2', '?1=1', true) );

    t.equal(urlParameter.set('abc', '1', '?abcdefg=1', true), '?abcdefg=1&abc=1', 'Add similar param names');
    speedTest(t, () => urlParameter.set('abc', '1', '?abcdefg=1', true) );

	t.end();
});

test('Reading values', function(t){
	var result = urlParameter.get('1', '?1=1');
	t.equal(result, '1', 'Get from 1');
	speedTest(t, () => urlParameter.get('1', '?1=1') );

	var result = urlParameter.get('1', '?1=1&2=2');
	t.equal(result, '1', 'Get from multiple');
	speedTest(t, () => urlParameter.get('1', '', '?1=1&2=2') );

	t.end();
});

test('Clearing values', function(t){
	var result = urlParameter.set('1', '', '?1=1', true);
	t.equal(result, '', 'Clear from 1');
	speedTest(t, () => urlParameter.set('1', '', '?1=1', true) );

	var result = urlParameter.set('1', '', '?1=1&2=2&3=3', true);
	t.equal(result, '?2=2&3=3', 'Clear first of multiple');
	speedTest(t, () => urlParameter.set('1', '', '?1=1&2=2', true) );

	var result = urlParameter.set('2', '', '?1=1&2=2&3=3', true);
	t.equal(result, '?1=1&3=3', 'Clear middle of multiple');
	speedTest(t, () => urlParameter.set('2', '', '?1=1&2=2&3=3', true) );

	var result = urlParameter.set('3', '', '?1=1&2=2&3=3', true);
	t.equal(result, '?1=1&2=2', 'Clear last of multiple');
	speedTest(t, () => urlParameter.set('3', '', '?1=1&2=2&3=3', true) );
	
	t.end();
});

test('Encoding values', function(t){
	var result = urlParameter.set('sp ce', 'sp ce', '', true);
	t.equal(result, '?sp ce=sp ce', 'Don\'t encode space');
	speedTest(t, () => urlParameter.set('sp ce', 'sp ce', '', true) );

	var result = urlParameter.set('sp ce', 'sp ce', '');
	t.equal(result, '?sp%20ce=sp%20ce', 'Encode space');
	speedTest(t, () => urlParameter.set('sp ce', 'sp ce', '') );

	var result = urlParameter.set('s p a c e', 's p a c e', '');
	t.equal(result, '?s%20p%20a%20c%20e=s%20p%20a%20c%20e', 'Encode multiple spaces');
	speedTest(t, () => urlParameter.set('s p a c e', 's p a c e', '') );

	var result = urlParameter.set('/', '&', '');
	t.equal(result, '?%2F=%26', 'Encode multiple values');
	speedTest(t, () => urlParameter.set('/', '&', '') );

	t.end();
});

test('Should fail', function(t){

	t.notOk(urlParameter.set(), 'Set with no args');
	t.notOk(urlParameter.set(null, null, null, null), 'Set with nulls');
	t.notOk(urlParameter.set(undefined, undefined, undefined, undefined), 'Set with undefineds');
	t.notOk(urlParameter.set({}, {}, {}, {}), 'Set with empty objects');

	t.notOk(urlParameter.get(), 'Get with no args');
	t.notOk(urlParameter.get(null, null, null, null), 'Get with nulls');
	t.notOk(urlParameter.get(undefined, undefined, undefined, undefined), 'Get with undefineds');
	t.notOk(urlParameter.get({}, {}, {}, {}), 'Get with empty objects');

	t.end();
});