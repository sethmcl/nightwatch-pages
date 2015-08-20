module.exports = {
  load: function () {
    return this.client
      .url('http://www.bing.com')
      .waitForElementVisible('body', 1000)
      .assert.title('Bing');
  }
};

