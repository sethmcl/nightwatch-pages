var requireDir = require('require-directory');
var _ = require('lodash');

var addClient = function (client, obj) {
  return Object.keys(obj).reduce(function (memo, key) {
    var cObj = obj[key];
    if (_.isObject(cObj)) {

      if (cObj.__include === true) {
        cObj.client = client;
        delete cObj.__include;
        memo[key] = cObj;
      } else {
        memo[key] = addClient(client, cObj);
      }

    } else {
      memo[key] = cObj;
    }
    return memo;
  }, {});
};

var extendModules = function(obj){
  var result;
  if(_.isObject(obj)) {

    var keys = Object.keys(obj);
    result = _.chain(keys).reduce(function (memo, key) {

      var filteredKey = _.find(keys, function (innerKey) {
        return '__' + key === innerKey;
      });

      if (filteredKey) {
        memo[key] = _.extend(extendModules(obj[filteredKey]), obj[key]);
      } else if(key.indexOf('__') !== 0){
        memo[key] = obj[key];
      }

      return memo;
    }, {})
      .value();

  } else {
    result = obj;
  }
  return result;
};

var directoryRename = function(key, path){
  var result;
  var splitPath = path.split('/');
  if(splitPath[splitPath.length - 1].split('.').length === 1){
    result =  '__' + key;
  } else {
    result = key;
  }
  return result;
};

var  transform = function (client, pageDir) {
  var pages = requireDir(module, pageDir, {
    recurse: true,
    visit: function (importedModule) {
      importedModule.__include = true;
      return importedModule;
    },
    rename : directoryRename
  });

  if (client.page) {
    client.__page__ = client.page;
  }

  client.page = extendModules(addClient(client, pages));
};

module.exports = {
  transform : transform,
  addClient : addClient,
  extendModules : extendModules,
  directoryRename : directoryRename
};