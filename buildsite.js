



var Metalsmith = require('metalsmith'),
  helpers = require('metalsmith-register-helpers'),
  clean = require('metalsmith-clean'),
  markdown = require('metalsmith-markdown'),
  templates = require('metalsmith-templates'),
  dataMarkdown = require('metalsmith-data-markdown'),
  contentful = require('contentful-metalsmith');

require('harmonize')();

module.exports = function (obj) {
  return {
    build: function () {
      Metalsmith(__dirname)
        .destination('./public/build')
        .source('src')
        .use(markdown())
        .use(helpers({
          directory: 'server/handlebars/helpers'
        }))
        .use(clean(true))
        .use(contentful({
          accessToken: '9c58df927542109a651d0193a7843ba16877d698b11896935565f3e336e8c20f'
        }))
        .use(templates({
          engine: 'handlebars',
          directory: 'templates'
        }))
        .use(dataMarkdown({
          removeAttributeAfterwards: true
        }))
        .build(function (err) {
          console.log('Building Site');
          if (err) console.log(err);
        });
    }
  }
}

Metalsmith(__dirname)
  .destination('./public/build')
  .source('src')
  .use(markdown())
  .use(helpers({
    directory: 'server/handlebars/helpers'
  }))
  .use(clean(true))
  .use(contentful({
    accessToken: '9c58df927542109a651d0193a7843ba16877d698b11896935565f3e336e8c20f'
  }))
  .use(templates({
    engine: 'handlebars',
    directory: 'templates'
  }))
  .use(dataMarkdown({
    removeAttributeAfterwards: true
  }))
  .build(function (err) {
    console.log('Building Site');
    if (err) console.log(err);
  });

      
