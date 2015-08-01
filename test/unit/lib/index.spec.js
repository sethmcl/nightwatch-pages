var pages = s.lib('index');

describe('Pages module', function () {

  describe('with conflict', function () {
    var client;
    var pageProp;

    before(function () {
      pageProp = function () {
        return 3;
      };
      client = {
        page: pageProp
      };

      pages.transform(client, s.path('fixtures', 'pages'));
    });

    it('should preserve original page property', function () {
      s.assert.equal(client.__page__, pageProp);
    });

    it('should have loaded pages', function () {
      s.assert.equal(Object.keys(client.page).length, 3);
      s.assert.equal(typeof client.page.Page1, 'object');
      s.assert.equal(typeof client.page.Page2, 'object');
      s.assert.equal(typeof client.page.innerPages, 'object');
      s.assert.equal(typeof client.page.innerPages.Page1, 'object');
      s.assert.equal(typeof client.page.innerPages.looseDirectory, 'undefined');
    });
  });

  describe('with no conflict', function () {
    var client;
    var pageProp;

    before(function () {
      pageProp = function () {
        return 3;
      };
      client = {};
      pages.transform(client, s.path('fixtures', 'pages'));
    });

    it('should have loaded pages', function () {
      s.assert.equal(Object.keys(client.page).length, 3);
      s.assert.equal(typeof client.page.Page1, 'object');
      s.assert.equal(typeof client.page.Page2, 'object');
      s.assert.equal(typeof client.page.innerPages, 'object');
      s.assert.equal(typeof client.page.innerPages.Page1, 'object');
      s.assert.equal(typeof client.page.innerPages.looseDirectory, 'undefined');
    });
  });

  describe('addClient', function () {
    it('should include client object in object with __include flag', function () {
      var sampleClient = {value: true};
      var sampleData = {
        a: {
          __include: true
        },
        b: {}
      };
      var result = pages.addClient(sampleClient, sampleData);
      var test = {
        a: {
          client: {
            value: true
          }
        },
        b: {}
      };

      s.assert.deepEqual(result, test);
    });

    it('should include client object in object with __include flag', function () {
      var sampleClient = {value: true};
      var sampleData = {
        a: {},
        b: {}
      };
      var result = pages.addClient(sampleClient, sampleData);

      s.assert.deepEqual(result, sampleData);
    });

    it('should return types that are not objects as they where', function () {
      var sampleClient = {value: true};
      var sampleData = { value : 'test'};
      var result = pages.addClient(sampleClient, sampleData);

      s.assert.deepEqual(result, sampleData);
    });
  });

  describe('extendModules', function () {
    it('should extend module with same level __nestedModule', function () {
      var sampleData = {
        __a: {
          value: true
        },
        a: {
          sample: true
        },
        b: {}
      };
      var result = pages.extendModules(sampleData);
      var test = {
        a: {
          value: true,
          sample: true
        },
        b: {}
      };

      s.assert.deepEqual(result, test);
    });

    it('should not extend if there is nothing to extend', function () {
      var sampleData = {
        a: {
          sample: true
        },
        b: {}
      };
      var result = pages.extendModules(sampleData);

      s.assert.deepEqual(result, sampleData);
    });

    it('should return types that are not objects as they where', function () {
      var sampleData = 'test';
      var result = pages.extendModules(sampleData);

      s.assert.deepEqual(result, sampleData);
    });
  });

  describe('directoryRename', function () {

    //Where directory is a ~file without any extension
    it('should rename only directories', function () {
      var path = '/first/second/third';
      var key = 'keyName';

      var result = pages.directoryRename(key, path);
      var test = '__' + key;

      s.assert.equal(result, test);

    });

    //Where directory is a ~file without any extension
    it('should not rename only files', function () {
      var path = '/first/second/third.js';
      var key = 'keyName';

      var result = pages.directoryRename(key, path);

      s.assert.equal(result, key);

    });

  });

});
