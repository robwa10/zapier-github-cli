// Dependencies
const helpers = require("../helpers");
const queries = require("./queries/assignee_queries");

// Custom request for dropdowns that need repo assignees
const getAssignees = async (z, bundle) => {
  let cursor, variables, query;

  // Set the variables based on whether it's the first request for the dropdown or not
  if (bundle.meta.page) {
    cursor = await z.cursor.get();
    variables = {
      repoName: bundle.inputData.repo_name,
      repoOwner: bundle.inputData.repo_owner || bundle.authData.login,
      endCursor: cursor
    };
    query = queries.assignableUsersDropdownPaginationQuery;
  } else {
    variables = {
      repoName: bundle.inputData.repo_name,
      repoOwner: bundle.inputData.repo_owner || bundle.authData.login
    };
    query = queries.assignableUsersDropdownQuery;
  }

  const response = await helpers.queryPromise(z, query, variables);
  const content = z.JSON.parse(response.content);

  // Stop setting endCursor when we've fetched everything
  if (content.data.repository.assignableUsers.pageInfo.hasNextPage) {
    await z.cursor.set(
      content.data.repository.assignableUsers.pageInfo.endCursor
    );
  }
  return content.data.repository.assignableUsers.nodes;
};

module.exports = {
  key: "assignee",
  noun: "Assignee",

  display: {
    label: "Get Assignee",
    description: "Triggers on a new assignee.",
    hidden: true
  },

  operation: {
    perform: getAssignees
  }
};
