// Dependencies
const Queries = require('./queries');
const mutations = require('./mutations');

// Fetch a list of repositorys
const listRepositorys = (z, bundle) => {
  const promise = z.request('https://api.github.com/graphql', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: Queries.listRepositoriesQuery}),
  });

/*
 * TODO:
 * Pass authed username into query
 *
 * Check for "hasNextPage" = true
 * Fetch more results if true
 */
  return promise.then((response) => {
    const result = JSON.parse(response.content);
    let data = [];
    const repos = result.data.user.repositories.edges;
    repos.forEach((el) => (data.push({
      id: el.node.id,
      name: el.node.name,
      url: el.node.url,
      description: el.node.description,
      createdAt: el.node.createdAt,
      hasIssuesEnabled: el.node.hasIssuesEnabled,
      isPrivate: el.node.isPrivate,
      isFork: el.node.isFork,
    })));
    return data;
  })
};

module.exports = {
  key: 'repository',
  noun: 'Repository',

  list: {
    display: {
      label: 'New Repository',
      description: 'Lists the repositorys.'
    },
    operation: {
      perform: listRepositorys
    }
  },

  sample: {
    id: 1,
    name: 'Test'
  },

};
