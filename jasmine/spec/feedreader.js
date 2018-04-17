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
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are not empty and defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined and note empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /* Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    describe('The menu', function() {

      const documentBody = document.body
      const menu = document.querySelector('.menu-icon-link');

      it('is hidden by default', function() {
        expect(documentBody.className).toContain('menu-hidden');
      });

      /* Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */

      it('toggles between hide and show', function() {
        menu.click();
        expect(document.className).not.toContain('menu-hidden');
        menu.click();
        expect(documentBody.className).toContain('menu-hidden');
      });
    });


    /* Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it('loadfeed with single entry', function(done) {
        const entryCount = document.querySelector('.feed').getElementsByClassName('entry').length;
        expect(entryCount).toBeGreaterThan(0);
        done();
      });
    });


    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
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

      it('Content is changed, when new feed is loaded', function(done) {
        expect(initialFeed).not.toBe(updatedFeed);
        done();
      });
    });
}());
