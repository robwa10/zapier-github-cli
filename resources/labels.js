// Dependencies
const helpers = require("../helpers");
const queries = require("./queries/labels_queries");

// Get a list of labels on a repo for a dropdown
const getLabelDropdownData = async (z, bundle) => {
  let cursor, variables, query;

  // Set the variables based on whether it's the first request for the dropdown or not
  if (bundle.meta.page) {
    cursor = await z.cursor.get();
    variables = {
      repoName: bundle.inputData.repo_name,
      repoOwner: bundle.inputData.repo_owner || bundle.authData.login,
      endCursor: cursor
    };
    query = queries.labelsDropdownPaginationQuery;
  } else {
    variables = {
      repoName: bundle.inputData.repo_name,
      repoOwner: bundle.inputData.repo_owner || bundle.authData.login
    };
    query = queries.labelsDropdownQuery;
  }

  const response = await helpers.queryPromise(z, query, variables);
  const content = z.JSON.parse(response.content);

  // Stop setting endCursor when we've fetched everything
  if (content.data.repository.labels.pageInfo.hasNextPage) {
    await z.cursor.set(content.data.repository.labels.pageInfo.endCursor);
  }
  return content.data.repository.labels.nodes;
};

// Get all the labels on a repo for a trigger
const listLabels = async (z, bundle) => {
  if (bundle.meta.prefill) {
    return getLabelDropdownData(z, bundle);
  } else {
    return [{ id: "1234", name: "A sample label" }];
  }
};

// Find a label by name
const searchLabels = (z, bundle) => {
  const responsePromise = z.request({
    url: "https://jsonplaceholder.typicode.com/posts",
    params: {
      query: `name:${bundle.inputData.name}`
    }
  });
  return responsePromise.then(response => z.JSON.parse(response.content));
};

// Create a new label
const createLabel = (z, bundle) => {
  const responsePromise = z.request({
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    body: {
      name: bundle.inputData.name // json by default
    }
  });
  return responsePromise.then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: "labels",
  noun: "Labels",

  list: {
    display: {
      label: "New Label",
      description: "Lists the labels.",
      hidden: true
    },
    operation: {
      perform: listLabels,
      canPaginate: true
    }
  },

  search: {
    display: {
      label: "Find Label",
      description: "Finds a label by searching.",
      hidden: true
    },
    operation: {
      inputFields: [{ key: "name", required: true }],
      perform: searchLabels
    }
  },

  create: {
    display: {
      label: "Create Label",
      description: "Creates a new labels.",
      hidden: true
    },
    operation: {
      inputFields: [{ key: "name", required: true }],
      perform: createLabel
    }
  },

  sample: {
    id: 1,
    name: "Test"
  },

  outputFields: [{ key: "id", label: "ID" }, { key: "name", label: "Name" }]
};
