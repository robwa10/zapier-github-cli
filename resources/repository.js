// Dependencies
const queries = require('./queries/repo_queries');
const helpers = require('./utils/helpers');
const samples = require('./samples/repo_samples');

// Fetch a list of repositorys
const listRepositories = (z, bundle) => {
  const amount = bundle.meta.frontend || bundle.meta.first_poll ? 100 : 20;  // Get the max number we can on dedupe and testing in editor
  const query = queries.repoListQuery(amount);
  const variables = { userName: bundle.authData.login };

  const promise = helpers.queryPromise(z, query, variables);

  return promise.then((response) => {
    helpers.handleError(response);  // Check for errors and deal with them.
    const content = z.JSON.parse(response.content); // Parse the content and get the array of nodes
    const edges = content.data.user.repositories.edges;

    if (bundle.meta.frontend || bundle.meta.first_poll) {
      return edges.map(el => (el.node));  // Return everything in trigger test or when building dedupe list
    } else {
      // Return only repos created in the last 48hrs in standard poll
      let data = [];
      edges.forEach(el => {
        let node = helpers.createdLastTwoDays(el);
        if (node !== null) {
          data.push(node);
        }
      });
      return data;
    };
  });
};

module.exports = {
  key: 'repository',
  noun: 'Repository',

  list: {
    display: {
      label: 'New Repository',
      description: 'Triggers when a new repository is created.'
    },
    operation: {
      type: 'polling',
      perform: listRepositories,
      sample: samples.repoTriggerSample,
    }
  },
};
