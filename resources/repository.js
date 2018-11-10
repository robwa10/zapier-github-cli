// Dependencies
const Queries = require('./queries');
const mutations = require('./mutations');

// Fetch a list of repositorys
const listRepositorys = (z, bundle) => {

  const buildList = (results) => {
    let data = [];

    results.forEach((el) => (data.push({
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
  }

  const fooBar = (z, bundle, query, variables, anArray) => {
    const promise = z.request(`{{process.env.BASE_URL}}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: z.JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    return promise.then((response) => {
      if (response.status !== 200) {
        throw new Error('Unable to fetch repos: ' + response.content);
      }
      const content = z.JSON.parse(response.content);
      const repositories = content.data.user.repositories;
      let results = anArray.concat(repositories.edges)

      if (repositories.pageInfo.hasNextPage) {
        const variables = {
          userName: bundle.authData.login,
          endCursor: repositories.pageInfo.endCursor
        }
        let query = Queries.repoListQuery(true);
        fooBar(z, bundle, query, variables, results)
      }

      return buildList(results)

    })
  };

  const query = Queries.repoListQuery(false);
  const variables = { userName: bundle.authData.login };

  return fooBar(z, bundle, query, variables, [])

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
