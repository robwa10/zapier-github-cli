// Dependencies
const Queries = require('./queries');
const mutations = require('./mutations');

// Fetch a list of repositorys
const listRepositorys = (z, bundle) => {
  const promise = z.request(`{{process.env.BASE_URL}}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: z.JSON.stringify({
      query: Queries.repoListQuery,
      variables: { userName: bundle.authData.login },
    }),
  });

  return promise.then((response) => {
    if (response.status !== 200) {
      throw new Error('Unable to fetch repos: ' + response.content);
    }
    return z.JSON.parse(response.content);
  }).then ((response) => {
    let data = [];
    const edges = response.data.user.repositories.edges;

    edges.forEach((el) => (data.push({
      id: el.node.id,
      name: el.node.name,
      url: el.node.url,
      description: el.node.description,
      createdAt: el.node.createdAt,
      hasIssuesEnabled: el.node.hasIssuesEnabled,
      isPrivate: el.node.isPrivate,
      isFork: el.node.isFork,
      pushedAt: el.node.pushedAt,
  		updatedAt: el.node.updatedAt,
  		url: el.node.url,
  		hasWikiEnabled: el.node.hasWikiEnabled,
  		sshUrl: el.node.sshUrl,
  		isPrivate: el.node.isPrivate,
  		resourcePath: el.node.resourcePath,
      owner: el.node.owner.login,
      ownerUrl: el.node.owner.url,
    })));

    return data;
  });
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
      type: 'polling', perform: listRepositorys
    }
  },

  sample: {
    id: 1,
    name: 'Test'
  },

};
``
