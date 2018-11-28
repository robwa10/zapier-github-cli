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
};

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
};

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

const repoSearchResponse = {
  data: {
    repository: {
      name: 'sample-search-repo',
      id: '1234',
      createdAt: '2018-09-16T18:57:48Z',
      description: 'A fake description.',
      descriptionHTML: '<div>A fake description.</div>',
      hasIssuesEnabled: true,
      homepageUrl: null,
      isFork: false,
      isPrivate: false,
      pushedAt: '2018-09-23T13:35:16Z',
      updatedAt: '2018-09-23T13:35:18Z',
      sshUrl: 'git@github.com:user001/sample.git',
      url: 'https://github.com/user001/sample',
      labels: {
        edges: [
          {
            node: {
              id: '1234',
              color: 'd73a4a',
              name: 'bug',
              resourcePath: '/user001/sample/labels/bug',
              url: 'https://github.com/user001/sample/labels/bug'
            }
          },
          {
            node: {
              id: '1234',
              color: '008672',
              name: 'help wanted',
              resourcePath: '/user001/sample/labels/help%20wanted',
              url: 'https://github.com/user001/sample/labels/help%20wanted'
            }
          },
        ]
      },
      languages: {
        edges: [
          {
            node: {
              id: '1234',
              name: 'Python'
            }
          },
          {
            node: {
              id: '1234',
              name: 'JavaScript'
            }
          }
        ]
      },
      collaborators: {
        edges: [
          {
            node: {
              email: 'fake@email.com',
              name: 'John Doe',
              login: 'johnDoe',
              url: 'https://github.com/johnDoe'
            },
          },
          {
            node: {
              email: 'anotherfake@email.com',
              name: 'Jane Doe',
              login: 'janeDoe',
              url: 'https://github.com/janeDoe'
            }
          }
        ]
      }
    }
  }
};

module.exports = {
  newRepoQuery,
  newRepoData,
  oldRepoQuery,
  oldRepoData,
  repoSearchResponse
}
