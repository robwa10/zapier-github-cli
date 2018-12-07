// Module Imports
const nock = require("nock");
const should = require("should");
const zapier = require("zapier-platform-core");

// Use this to make test calls
const App = require("../../index");
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

// Imported Test Data
const query = require("../../resources/queries/repo_queries");
const mockData = require("../mock_data/repo_data");
const samples = require("../../resources/samples/repo_samples");

describe("Repositories Trigger test", () => {
  it("should fetch 100 repos on frontend test", done => {
    const bundle = {
      meta: {
        frontend: true,
        first_poll: false
      },
      authData: {
        access_token: "a_token",
        login: "user001"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.repoListQuery(100),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.oldRepoQuery));

    appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.oldRepoData);
        done();
      })
      .catch(done);
  });

  it("should fetch 100 repos on first_poll", done => {
    const bundle = {
      meta: {
        frontend: false,
        first_poll: true
      },
      authData: {
        access_token: "a_token",
        login: "user001"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.repoListQuery(100),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.oldRepoQuery));

    appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.oldRepoData);
        done();
      })
      .catch(done);
  });

  it("should not return repo more than 48hrs old on standard_poll", done => {
    const bundle = {
      meta: {
        frontend: false,
        first_poll: false
      },
      authData: {
        access_token: "a_token",
        login: "user001"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.repoListQuery(20),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.oldRepoQuery));

    appTester(App.resources.repository.list.operation.perform, bundle)
      .then(results => {
        results.should.eql([]);
        done();
      })
      .catch(done);
  });

  it("should return repo less than 48hrs old on standard_poll", done => {
    const bundle = {
      meta: {
        frontend: false,
        first_poll: false
      },
      authData: {
        access_token: "a_token",
        login: "user001"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.repoListQuery(20),
        variables: { userName: "user001" }
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

describe("Repository Search test", () => {
  it("should search for a repo with the login name", done => {
    const bundle = {
      authData: {
        access_token: "a_token",
        login: "user001"
      },
      inputData: {
        repoName: "sample-search-repo"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.findRepoQuery,
        variables: { repoOwner: "user001", repoName: "sample-search-repo" }
      })
      .reply(200, JSON.stringify(mockData.repoSearchResponse));

    appTester(App.resources.repository.search.operation.perform, bundle)
      .then(results => {
        results.should.eql([samples.repoSearchSample]);
        done();
      })
      .catch(done);
  });

  it("should search for a repo with the owner name", done => {
    const bundle = {
      authData: {
        access_token: "a_token",
        login: "user001"
      },
      inputData: {
        repoName: "sample-search-repo",
        owner: "johnDoe"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.findRepoQuery,
        variables: { repoOwner: "johnDoe", repoName: "sample-search-repo" }
      })
      .reply(200, JSON.stringify(mockData.repoSearchResponse));

    appTester(App.resources.repository.search.operation.perform, bundle)
      .then(results => {
        results.should.eql([samples.repoSearchSample]);
        done();
      })
      .catch(done);
  });

  it("should return an empty object on no match", done => {
    const bundle = {
      authData: {
        access_token: "a_token",
        login: "user001"
      },
      inputData: {
        repoName: "sample-search-repo",
        owner: "johnDoe"
      }
    };

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query.findRepoQuery,
        variables: { repoOwner: "johnDoe", repoName: "sample-search-repo" }
      })
      .reply(
        200,
        JSON.stringify({
          data: {
            repository: null
          }
        })
      );

    appTester(App.resources.repository.search.operation.perform, bundle)
      .then(results => {
        results.should.eql([{}]);
        done();
      })
      .catch(done);
  });
});
