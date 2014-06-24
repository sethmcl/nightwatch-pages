var requireDir = require('require-dir');

module.exports = function (client, pageDir) {
  var pages = requireDir(pageDir, { recurse: true });

  if (client.page) {
    client.__page__ = client.page;
  }

  client.page = {};

  Object.keys(pages).forEach(function (key) {
    client.page[key]        = pages[key];
    client.page[key].client = client;
  });
};
