const should = require('should');
const zapier = require('zapier-platform-core');

const query = require('../../resources/queries/repo_queries');

const today = new Date();
const currentISODate = today.toISOString();

const newRepoQuery = {
  data: {
    user: {
      repositories: {
        edges: [
          {
            node: {
              id: 12389087628756,
              name: 'Sample',
              createdAt: currentISODate,
              description: 'A sample repo description.',
              hasIssuesEnabled: false,
              isPrivate: false,
              isFork: false,
              pushedAt: '2018-09-14T14:46:00Z',
              url: 'https://github.com/user001/sample',
              hasWikiEnabled: false,
              sshUrl: 'git@github.com:user001/sample.git',
              resourcePath: '/user001/sample',
              owner: {
                login: 'user001',
                url: 'https://github.com/user001'
              }
            }
          }
        ]
      }
    }
  }
}

const newRepoData = [{
  id: 12389087628756,
  name: 'Sample',
  createdAt: currentISODate,
  description: 'A sample repo description.',
  hasIssuesEnabled: false,
  isPrivate: false,
  isFork: false,
  pushedAt: '2018-09-14T14:46:00Z',
  url: 'https://github.com/user001/sample',
  hasWikiEnabled: false,
  sshUrl: 'git@github.com:user001/sample.git',
  resourcePath: '/user001/sample',
  owner: {
      login: 'user001',
      url: 'https://github.com/user001'
  }
}];

const oldRepoQuery = {
  data: {
    user: {
      repositories: {
        edges: [
          {
            node: {
              id: 12389087628756,
              name: 'Sample',
              createdAt: '2018-09-14T14:46:00Z',
              description: 'A sample repo description.',
              hasIssuesEnabled: false,
              isPrivate: false,
              isFork: false,
              pushedAt: '2018-09-14T14:46:00Z',
              url: 'https://github.com/user001/sample',
              hasWikiEnabled: false,
              sshUrl: 'git@github.com:user001/sample.git',
              resourcePath: '/user001/sample',
              owner: {
                login: 'user001',
                url: 'https://github.com/user001'
              }
            }
          }
        ]
      }
    }
  }
}

const oldRepoData = [{
  id: 12389087628756,
  name: 'Sample',
  createdAt: '2018-09-14T14:46:00Z',
  description: 'A sample repo description.',
  hasIssuesEnabled: false,
  isPrivate: false,
  isFork: false,
  pushedAt: '2018-09-14T14:46:00Z',
  url: 'https://github.com/user001/sample',
  hasWikiEnabled: false,
  sshUrl: 'git@github.com:user001/sample.git',
  resourcePath: '/user001/sample',
  owner: {
      login: 'user001',
      url: 'https://github.com/user001'
  }
}];

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();
const nock = require('nock');

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
      .reply(200, JSON.stringify(oldRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(oldRepoData);
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
      .reply(200, JSON.stringify(oldRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(oldRepoData);
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
      .reply(200, JSON.stringify(oldRepoQuery));

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
      .reply(200, JSON.stringify(newRepoQuery));

      appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(newRepoData);
        done();
      })
      .catch(done);
    });
  });
});
