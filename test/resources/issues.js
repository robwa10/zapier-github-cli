// Module Imports
const nock = require("nock");
const should = require("should");
const zapier = require("zapier-platform-core");

// Use this to make test calls
const App = require("../../index");
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

// Imported data for testing
const query = require("../../resources/queries/issue_queries");
const mutation = require("../../resources/mutations/issue_mutations");
const mockData = require("../mock_data/issues_data");

describe("Issues Trigger test", () => {
  it("should fetch 100 issues on frontend test", done => {
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
        query: query.issuesListQuery(100),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.newIssueQueryResponse));

    appTester(App.resources.issues.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.newIssueData);
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
        query: query.issuesListQuery(100),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.newIssueQueryResponse));

    appTester(App.resources.issues.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.newIssueData);
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
        query: query.issuesListQuery(20),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.oldIssueQueryResponse));

    appTester(App.resources.issues.list.operation.perform, bundle)
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
        query: query.issuesListQuery(20),
        variables: { userName: "user001" }
      })
      .reply(200, JSON.stringify(mockData.newIssueQueryResponse));

    appTester(App.resources.issues.list.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.newIssueData);
        done();
      })
      .catch(done);
  });
});

describe("Issues Create test", () => {
  it("should create a new issue", done => {
    const bundle = {
      inputData: {
        repo_name: "test-repo",
        repo_owner: "jondoe",
        issue_title: "Test Issue",
        issue_body: "Test issue body content.",
        issue_assignee: ["1234abc"],
        issue_milestone: ["5678zxcv"],
        issue_labels: ["1234labelA, 5678labelB"]
      },
      authData: {
        access_token: "a_token",
        login: "user001"
      }
    };

    const query = `
    query( $repoName:String!, $repoOwner:String!) {
      repository(name:$repoName, owner:$repoOwner) {
        name
        id
      }
    }
  `;

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: query,
        variables: {repoName: "test-repo", repoOwner: "jondoe"}
      })
      .reply(200, JSON.stringify({data: { repository: {name: "test-repo", id: "1234"}}}));

    const inputs = `repositoryId:"1234" title:"${bundle.inputData.issue_title}" body:"${bundle.inputData.issue_body}" assigneeIds:[${bundle.inputData.issue_assignee}] milestoneId:"${bundle.inputData.issue_milestone}" labelIds:[${bundle.inputData.issue_labels}]`

    nock(`${process.env.TEST_URL}`)
      .post("/graphql", {
        query: mutation.createIssue(inputs),
      })
      .reply(200, JSON.stringify(mockData.createdIssueResponse));

    appTester(App.resources.issues.create.operation.perform, bundle)
      .then(results => {
        results.should.eql(mockData.newCreatedIssue);
        done();
      })
      .catch(done);
  });
});
