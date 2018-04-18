/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeTruthy(); //'toBeTruthy' covers empty strings and 'undefined'
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are not empty and defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeTruthy(); //'toBeTruthy' covers empty strings and 'undefined'
             // expect(feed.url).toMatch(/#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#iS/); Error is thrown here ?!
           });
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined and note empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeTruthy();
           });
         });
    });



    describe('The menu', function() {
      /* Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /* Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('toggles between hide and show', function() {
        var hamburgerMenu = $('.menu-icon-link');

        hamburgerMenu.click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        hamburgerMenu.click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });


    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      /* Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      it('container has at least 1 entry', function(done) {
        const entryCount = $('.feed .entry').length;
        expect(entryCount).toBeGreaterThan(0);
        done();
      });
    });



    describe('New Feed Selection', function() {
      let initialFeed = '';
      let updatedFeed = '';

      beforeEach(function(done) {
        loadFeed(0, function() {
          initialFeed = document.querySelector('.feed').innerHTML;
          loadFeed(1, function() {
            updatedFeed = document.querySelector('.feed').innerHTML;
            done();
          });
        });
      });

      /* Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('content is changed, when another feed is selected', function(done) {
        expect(initialFeed).not.toBe(updatedFeed);
        done();
      });
    });
}());
