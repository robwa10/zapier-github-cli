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

module.exports = {
  newRepoQuery,
  newRepoData,
  oldRepoQuery,
  oldRepoData
}
