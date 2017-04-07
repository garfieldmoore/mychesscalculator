QUnit.module('Negative tests');

QUnit.test('Negative test', function() {
    QUnit.assert.ok(false == false, "False is False!");
});

QUnit.module('A test with setup and teardown',{
    setup: function() {
      $("body").append("<div id='mytestdiv'>hello</div>")
    },
    teardown: function() {

    }
  }
);

QUnit.test('Addition test', function() {
    QUnit.assert.ok(false == false, "False is False!");
});

QUnit.test('Dom test', function() {
    QUnit.assert.strictEqual($('#mytestdiv').text(),"hello");

});
