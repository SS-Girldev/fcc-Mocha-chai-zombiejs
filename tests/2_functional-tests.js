const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Functional Tests', function () {
  this.timeout(5000);
  describe('Integration tests with chai-http', function () {
    // #1
    it('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen() //method to prevent chai-http from stopping your server.
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200); // checks if its successful
          assert.equal(res.text, 'hello Guest');
          done(); //Calling it without an argument at the end of a test is necessary to signal that the asynchronous operation is complete
        });
    });
    // #2
   it('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Sarah')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Sarah');
          done();
        });
    });
    // #3
    it('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({surname: "Colombo"})

        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");

          done();
        });
    });
    // #4
    it('Send {surname: "da Verrazzano"}', function (done) {
     chai
       .request(server)
      .keepOpen()
      .put('/travellers')
      .send({surname: "da Verrazzano"})
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.name, "Giovanni");
        assert.equal(res.body.surname, "da Verrazzano" );
        done();
      });


    });
  });
});

const Browser = require('zombie');
Browser.site ='https://boilerplate-mochachai.sarahmona.repl.co/';

describe('Functional Tests with Zombie.js', function () {

  this.timeout(5000);
const browser = new Browser();
  console.log(browser);
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });// fucntion called before all tests in the suite,hook to direct the browser to the / route

describe('Headless browser', function () {
    it('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  describe('"Famous Italian Explorers" form', function () {
    // #5
    it('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'colombo');
      browser.pressButton('submit', () => {
        browser.assert.success();
        browser.assert.text('span#name', 'Cristoforo');
        browser.assert.text('span#surname', 'Colombo');
        browser.assert.elements('span#dates', 1);
        done();
      })
    })
    // #6
    it('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname', 'Vespucci' );
      browser.pressButton('submit', () =>{
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo' );
        browser.assert.text('span#surname', 'Vespucci' );
        browser.assert.elements('span#dates', 1);
        done();
      })
    });
  });
});
