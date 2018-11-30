// Dependencies
const queries = require("./queries/repo_queries");
const samples = require("./samples/repo_samples");

// Helper dependencies
const helpers = require("./utils/helpers");

// Fetch a list of repositorys
const listRepositories = (z, bundle) => {
  const amount = bundle.meta.frontend || bundle.meta.first_poll ? 100 : 20; // Get the max number we can on dedupe and testing in editor
  const query = queries.repoListQuery(amount);
  const variables = { userName: bundle.authData.login };

  const promise = helpers.queryPromise(z, query, variables);

  return promise.then(response => {
    helpers.handleError(response); // Check for errors and deal with them
    const content = z.JSON.parse(response.content); // Parse the content and get the array of nodes
    const nodes = content.data.user.repositories.nodes;

    return bundle.meta.frontend || bundle.meta.first_poll
      ? nodes // Return everything in trigger test or when building dedupe list
      : nodes.filter(el => helpers.isTwoDaysOld(el.createdAt) === false); // Return only repos created in the last 48hrs in standard poll
  });
};

// Find a specific repository
const searchRepositories = (z, bundle) => {
  // Check if Organization or User Name included, if not default to authed login
  const repoOwner = bundle.inputData.owner || bundle.authData.login;
  const query = queries.findRepoQuery;
  const variables = { repoOwner, repoName: bundle.inputData.repoName };

  const promise = helpers.queryPromise(z, query, variables);

  return promise.then(response => {
    helpers.handleError(response);
    const content = z.JSON.parse(response.content);
    let repository = content.data.repository;

    if (repository === null) {
      return [{}]; // Return it an empty object to show there's no match
    } else {
      repository.labels = repository.labels.nodes;
      repository.languages = repository.languages.nodes;
      repository.collaborators = repository.collaborators.nodes;

      return [repository];
    }
  });
};

module.exports = {
  key: "repository",
  noun: "Repository",

  list: {
    display: {
      label: "New Repository",
      description: "Triggers when a new repository is created."
    },
    operation: {
      type: "polling",
      perform: listRepositories,
      sample: samples.repoTriggerSample
    }
  },

  search: {
    display: {
      label: "Find Repository",
      description: "Find a specific repository."
    },
    operation: {
      inputFields: [
        {
          key: "owner",
          required: false,
          label: "Organization or User Name",
          helpText:
            "What follows directly after `https://github.com/`. Defaults to the connected account."
        },
        {
          key: "repoName",
          required: true,
          label: "Repository Name",
          helpText: "What follows directly after `https://github.com/:owner/`."
        }
      ],
      perform: searchRepositories,
      sample: samples.repoSearchSample
    }
  }
};
