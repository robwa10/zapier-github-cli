// Dependencies
const helpers = require("../helpers");
const queries = require("./queries/milestone_queries");

// Custom request for dropdowns that need milestones from repos
const getMilestones = async (z, bundle) => {
  let cursor, variables, query;

  // Set the variables based on whether it's the first request for the dropdown or not
  if (bundle.meta.page) {
    cursor = await z.cursor.get();
    variables = {
      repoName: bundle.inputData.repo_name,
      repoOwner: bundle.inputData.repo_owner || bundle.authData.login,
      endCursor: cursor
    };
    query = queries.milestoneDropdownPaginationQuery;
  } else {
    variables = {
      repoName: bundle.inputData.repo_name,
      repoOwner: bundle.inputData.repo_owner || bundle.authData.login
    };
    query = queries.milestoneDropdownQuery;
  }

  const response = await helpers.queryPromise(z, query, variables);
  const content = z.JSON.parse(response.content);

  // Stop setting endCursor when we've fetched everything
  if (content.data.repository.milestones.pageInfo.hasNextPage) {
    await z.cursor.set(content.data.repository.milestones.pageInfo.endCursor);
  }
  return content.data.repository.milestones.nodes;
};

module.exports = {
  key: "milestone",
  noun: "Milestone",

  display: {
    label: "Get Milestone",
    description: "Triggers on a new milestone.",
    hidden: true
  },

  operation: {
    inputFields: [],
    perform: getMilestones
  }
};
