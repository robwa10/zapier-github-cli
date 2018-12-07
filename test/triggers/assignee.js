/*
// Module Imports
const nock = require("nock");
const should = require("should");
const zapier = require("zapier-platform-core");

// Use this to make test calls
const App = require("../../index");
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

// Imported data for testing


describe('Assignee Trigger test', () => {
  it('should get all assignees using login name', done => {
    const bundle = { authData: 'user001' };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: ,
        variables: {}
      })
      .reply(200, JSON.stringify());


    appTester(App.triggers.assignee.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });
});
*/
