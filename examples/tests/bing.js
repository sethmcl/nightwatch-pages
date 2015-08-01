module.exports = {
  'Search with Bing' : function (client) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '..', 'pages'));

    var searchTerm = 'selenium';

    client
      .page.homepage.innerPage.load()
      .page.homepage.search(searchTerm)
      .page.searchResults.assertResults(searchTerm)
      .page.searchResults.navImages()
      .saveScreenshot('screen2.png')
      .end();
  }
};
