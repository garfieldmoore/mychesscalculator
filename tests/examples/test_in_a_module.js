It('Negative tests');

It('Negative test', function() {
    QUnit.assert.ok(false == false, "False is False!");
});

It('A test with setup and teardown',{
    setup: function() {
      $("body").append("<div id='mytestdiv'>hello</div>")
    },
    teardown: function() {

    }
  }
);

It('Addition test', function() {
    QUnit.assert.ok(false == false, "False is False!");
});

It('Dom test', function() {
    QUnit.assert.strictEqual($('#mytestdiv').text(),"hello");

});
