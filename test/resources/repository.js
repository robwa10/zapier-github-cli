// Module Imports
const nock = require('nock');
const should = require('should');
const zapier = require('zapier-platform-core');

// Use this to make test calls
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

// Imported Test Data
const query = require('../../resources/queries/repo_queries');
const mockData = require('../mock_data/repo_data');



describe('Repositories Tests', () => {
  describe('New repository trigger', () => {
    it('should fetch 100 repos on frontend test', done => {
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
        query: query.repoListQuery(100),
        variables: { userName: 'user001'},
      })
      .reply(200, JSON.stringify(mockData.oldRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.oldRepoData);
        done();
      })
      .catch(done);
    });

    it('should fetch 100 repos on first_poll', done => {
      const bundle = {
        meta: {
          frontend: false,
          first_poll: true,
        },
        authData: {
          access_token: 'a_token',
          login: 'user001'
        }
      };

      nock('https://api.github.com')
      .post('/graphql', {
        query: query.repoListQuery(100),
        variables: { userName: 'user001'},
      })
      .reply(200, JSON.stringify(mockData.oldRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.oldRepoData);
        done();
      })
      .catch(done);
    });

    it('should not return repo more than 48hrs old on standard_poll', done => {
      const bundle = {
        meta: {
          frontend: false,
          first_poll: false,
        },
        authData: {
          access_token: 'a_token',
          login: 'user001'
        }
      };

      nock('https://api.github.com')
      .post('/graphql', {
        query: query.repoListQuery(20),
        variables: { userName: 'user001'},
      })
      .reply(200, JSON.stringify(mockData.oldRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql([]);
        done();
      })
      .catch(done);
    });

    it('should return repo less than 48hrs old on standard_poll', done => {
      const bundle = {
        meta: {
          frontend: false,
          first_poll: false,
        },
        authData: {
          access_token: 'a_token',
          login: 'user001'
        }
      };

      nock('https://api.github.com')
      .post('/graphql', {
        query: query.repoListQuery(20),
        variables: { userName: 'user001'},
      })
      .reply(200, JSON.stringify(mockData.newRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.newRepoData);
        done();
      })
      .catch(done);
    });
  });
});
