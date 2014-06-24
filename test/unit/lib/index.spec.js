var pages = s.lib('index');

describe('Pages module', function () {
  describe('with conflict', function () {
    var client;
    var pageProp;

    before(function () {
      pageProp = function () { return 3; };
      client = {
        page: pageProp
      };

      pages(client, s.path('fixtures', 'pages'));
    });

    it('should preserve original page property', function () {
      s.assert.equal(client.__page__, pageProp);
    });

    it('should have loaded pages', function () {
      s.assert.equal(Object.keys(client.page).length, 2);
      s.assert.equal(typeof client.page.Page1, 'object');
      s.assert.equal(typeof client.page.Page2, 'object');
    });
  });

  describe('with no conflict', function () {
    var client;
    var pageProp;

    before(function () {
      pageProp = function () { return 3; };
      client = {};
      pages(client, s.path('fixtures', 'pages'));
    });

    it('should have loaded pages', function () {
      s.assert.equal(Object.keys(client.page).length, 2);
      s.assert.equal(typeof client.page.Page1, 'object');
      s.assert.equal(typeof client.page.Page2, 'object');
    });
  });
});
