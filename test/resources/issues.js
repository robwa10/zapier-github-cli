// Module Imports
const nock = require('nock');
const should = require('should');
const zapier = require('zapier-platform-core');

// Use this to make test calls
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

// Imported Test Data
const query = require('../../resources/queries/issue_queries');
const mockData = require('../mock_data/issues_data');

describe('My App', () => {
  it('should run resources.issues', done => {
    const bundle = { inputData: {} };

    appTester(App.resources.issues.list.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });
});

describe('Issues trigger tests', () => {
  it('should return a list of issues', done => {
    const bundle = {
      meta: {
        frontend: true,
        first_poll: false,
      },
      authData: {
        access_token: 'a_token',
        login: 'user001'
      }
    };

    nock('https://api.github.com')
    .post('/graphql', {
      query: query.issuesListQuery(),
      variables: { userName: 'user001'},
    })
    .reply(200, JSON.stringify(mockData.newIssueResponse));

    appTester(App.resources.issues.list.operation.perform, bundle)
    .then(results => {
      results.should.eql(mockData.newIssueData);
      done();
    })
    .catch(done);
  });
});
