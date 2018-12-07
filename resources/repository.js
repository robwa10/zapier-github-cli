// Dependencies
const queries = require("./queries/repo_queries");
const samples = require("./samples/repo_samples");

// Helper dependencies
const helpers = require("../helpers");

// Fetch a list of repositorys
const listRepositories = async (z, bundle) => {
  if (bundle.meta.prefill) {
    let cursor, variables, query;

    // Set the variables based on whether it's the first request for the dropdown or not
    if (bundle.meta.page) {
      cursor = await z.cursor.get();
      variables = { userName: bundle.authData.login, endCursor: cursor };
      query = queries.repoDropdownPaginationQuery;
    } else {
      variables = { userName: bundle.authData.login };
      query = queries.repoDropdownQuery;
    }

    const response = await helpers.queryPromise(z, query, variables);
    const content = z.JSON.parse(response.content);

    // Stop setting endCursor when we've fetched everything
    if (content.data.user.repositories.pageInfo.hasNextPage) {
      await z.cursor.set(content.data.user.repositories.pageInfo.endCursor);
    }
    return content.data.user.repositories.nodes;
  } else {
    const amount = bundle.meta.frontend || bundle.meta.first_poll ? 100 : 20; // Get the max number we can on dedupe and testing in editor
    const query = queries.repoListQuery(amount);
    const variables = { userName: bundle.authData.login };

    const response = await helpers.queryPromise(z, query, variables);

    helpers.handleError(response); // Check for errors and deal with them
    const content = z.JSON.parse(response.content); // Parse the content and get the array of nodes
    const nodes = content.data.user.repositories.nodes;

    return bundle.meta.frontend || bundle.meta.first_poll
      ? nodes // Return everything in trigger test, when building dedupe list or populating dropdown
      : nodes.filter(el => helpers.isTwoDaysOld(el.createdAt) === false); // Return only repos created in the last 48hrs in standard poll
  }
};

// Find a specific repository;
const searchRepositories = async (z, bundle) => {
  // Check if Organization or User Name included, if not default to authed login
  const repoOwner = bundle.inputData.owner || bundle.authData.login;
  const query = queries.findRepoQuery;
  const variables = { repoOwner, repoName: bundle.inputData.repoName };

  const response = await helpers.queryPromise(z, query, variables);

  helpers.handleError(response);
  const content = z.JSON.parse(response.content);
  let repository = content.data.repository;

  if (repository === null) {
    return [{}]; // Return it an empty object to show there's no match
  } else {
    repository.labels = repository.labels.nodes;
    repository.languages = repository.languages.nodes;
    repository.collaborators = repository.collaborators.nodes;
    // repository.assignableUsers = repository.assignableUsers.nodes; This needs to be added to the query

    return [repository];
  }
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
      canPaginate: true,
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
