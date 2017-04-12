function mathy(x, y, strategy) {
    console.log('We did arithmetic on ');
    strategy();
}

var math2 = {
    boo: function() {
        console.log('boo');
    },

    hoo: function() {
        console.log('hoo');
    },

    getPrime: function() {
        console.log('getPrime');
        return 10;
    }
}

function client(client) {
    client.boo();
}

describe('using spies', function() {

    it('should use mathy callback', function() {
        spyStrategy = jasmine.createSpy('math2', 'MyMethod');
        mathy(1, 3, spyStrategy);
        expect(spyStrategy).toHaveBeenCalled();

    });

    it('should call a named function', function() {
        var spy = spyOn(math2, 'boo');

        client(math2);

        expect(spy, 'boo').toHaveBeenCalled();

    });

    it('should replace the return value', function() {
        var spy = spyOn(math2, 'getPrime').and.returnValue(2);

      //  client(math2); this object might have conditionals dependant on the return value...

        expect(math2.getPrime()).toEqual(2);

    });

    it('should use spy object', function(){
        var spy= jasmine.createSpyObj('math2', ['getPrime']);
        spy.getPrime.and.returnValue(4);

        expect(spy.getPrime()).toEqual(4);

    });

});
