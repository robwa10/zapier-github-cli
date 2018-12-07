const today = new Date();
const currentISODate = today.toISOString();

const createdIssueResponse = {
  data: {
    createIssue : {
       issue: {
         id: '1234Issue',
         resourcePath: '/jondoe/test-repo/issues/1',
         title: 'Test Issue',
         url: 'https://github.com/jondoe/test-repo/issues/1',
         state: 'OPEN',
         body: 'Test issue body content.',
         bodyText: 'Test issue body content.',
         bodyHTML: '<p>Test issue body content.</p>',
         createdAt: currentISODate,
         number: 1,
         author: {
           login: 'jondoe',
        },
         repository: {
           id: '1234',
           name: 'test-repo'
        },
         labels: {
           nodes: [
            {
               id: '1234labelA',
               name: 'labelA'
            },
            {
              id: '5678labelB',
              name: 'labelB'
            }
          ]
        },
         assignees : {
           nodes : [
             {
               id: '1234abc',
               login: 'robwa10'
             }
           ]
        },
         milestone : {
           id: '1234milestone',
           title: 'Sample Milestone',
           description: 'This is a sample milestone',
           number: 1,
           url: 'https://github.com/jondoe/test-repo/milestone/1'
         }
      }
    }
  }
};

const newCreatedIssue = {
  id: '1234Issue',
  resourcePath: '/jondoe/test-repo/issues/1',
  title: 'Test Issue',
  url: 'https://github.com/jondoe/test-repo/issues/1',
  state: 'OPEN',
  body: 'Test issue body content.',
  bodyText: 'Test issue body content.',
  bodyHTML: '<p>Test issue body content.</p>',
  createdAt: currentISODate,
  number: 1,
  author: 'jondoe',
  repository: {
    id: '1234',
    name: 'test-repo'
 },
  labels: {
    nodes: [
     {
        id: '1234labelA',
        name: 'labelA'
     },
     {
       id: '5678labelB',
       name: 'labelB'
     }
   ]
 },
  assignees : {
    nodes : [
      {
        id: '1234abc',
        login: 'robwa10'
      }
    ]
 },
  milestone : {
    id: '1234milestone',
    title: 'Sample Milestone',
    description: 'This is a sample milestone',
    number: 1,
    url: 'https://github.com/jondoe/test-repo/milestone/1'
  }
}

const newIssueQueryResponse = {
  data: {
    user: {
      issues: {
        nodes: [
          {
            id: "123Issue",
            title: "Sample Issue",
            createdAt: currentISODate,
            updatedAt: currentISODate,
            url: "https://github.com/user001/sample-repo/issues/1",
            resourcePath: "/usser001/sample-repo/issues/3",
            number: 1,
            publishedAt: "2018-01-01T00:00:00Z",
            viewerSubscription: "SUBSCRIBED",
            repository: {
              id: "1234Repo",
              name: "sample-repo"
            },
            labels: {
              nodes: [
                { id: "1Label", name: "Sample Label One" },
                { id: "2Label", name: "Sample Label Two" }
              ]
            },
            assignees: {
              nodes: [
                { id: "1UserID", name: "user002" },
                { id: "2UserID", name: "user003" }
              ]
            },
            author: {
              login: "user001"
            },
            body: "This is sample body data.",
            bodyHTML: "<p>This is sample body data.</p>",
            bodyText: "This is sample body data."
          }
        ]
      }
    }
  }
};

const newIssueData = [
  {
    id: "123Issue",
    title: "Sample Issue",
    createdAt: currentISODate,
    updatedAt: currentISODate,
    url: "https://github.com/user001/sample-repo/issues/1",
    resourcePath: "/usser001/sample-repo/issues/3",
    number: 1,
    publishedAt: "2018-01-01T00:00:00Z",
    viewerSubscription: "SUBSCRIBED",
    repository: {
      id: "1234Repo",
      name: "sample-repo"
    },
    labels: [
      { id: "1Label", name: "Sample Label One" },
      { id: "2Label", name: "Sample Label Two" }
    ],
    assignees: [
      { id: "1UserID", name: "user002" },
      { id: "2UserID", name: "user003" }
    ],
    author: "user001",
    body: "This is sample body data.",
    bodyHTML: "<p>This is sample body data.</p>",
    bodyText: "This is sample body data."
  }
];

const oldIssueQueryResponse = {
  data: {
    user: {
      issues: {
        nodes: [
          {
            id: "123Issue",
            title: "Sample Issue",
            createdAt: "2018-01-01T00:00:00Z",
            updatedAt: "2018-01-01T00:00:00Z",
            url: "https://github.com/user001/sample-repo/issues/1",
            resourcePath: "/usser001/sample-repo/issues/3",
            number: 1,
            publishedAt: "2018-01-01T00:00:00Z",
            viewerSubscription: "SUBSCRIBED",
            repository: {
              id: "1234Repo",
              name: "sample-repo"
            },
            labels: {
              nodes: [
                { id: "1Label", name: "Sample Label One" },
                { id: "2Label", name: "Sample Label Two" }
              ]
            },
            assignees: {
              nodes: [
                { id: "1UserID", name: "user002" },
                { id: "2UserID", name: "user003" }
              ]
            },
            author: {
              login: "user001"
            },
            body: "This is sample body data.",
            bodyHTML: "<p>This is sample body data.</p>",
            bodyText: "This is sample body data."
          }
        ]
      }
    }
  }
};

module.exports = {
  createdIssueResponse,
  newCreatedIssue,
  newIssueQueryResponse,
  newIssueData,
  oldIssueQueryResponse
};
