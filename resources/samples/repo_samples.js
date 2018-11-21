const samples = {}

samples.repoTriggerSample = {
  id: 12389087628756,
  name: 'Sample',
  createdAt: '2018-10-04T15:17:30Z',
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
};

samples.repoSearchSample = {
  name: 'Sample Search Repo',
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
  labels: [
    {
      id: '1234',
      color: 'd73a4a',
      name: 'bug',
      resourcePath: '/user001/sample/labels/bug',
      url: 'https://github.com/user001/sample/labels/bug'
    },
    {
      id: '1234',
      color: '008672',
      name: 'help wanted',
      resourcePath: '/user001/sample/labels/help%20wanted',
      url: 'https://github.com/user001/sample/labels/help%20wanted'
    }
  ],
  languages: [
    {
      id: '1234',
      name: 'Python'
    },
    {
      id: '1234',
      name: 'JavaScript'
    }
  ],
  assignableUsers: [
    {
      email: 'fake@email.com',
      name: 'John Doe',
      login: 'johnDoe',
      url: 'https://github.com/johnDoe'
    },
    {
      email: 'anotherfake@email.com',
      name: 'Jane Doe',
      login: 'janeDoe',
      url: 'https://github.com/janeDoe'
    }
  ]
};

module.exports = samples;
