// Dependencies
const helpers = require("../helpers");
const queries = require("./dropdown_queries");

// Custom request for dropdowns that need repo assignees
const getDropdownAssignees = async (z, bundle) => {
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

// Custom request for dropdowns that need milestones from repos
const getDropdownMilestones = async (z, bundle) => {
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
  // Get the milestone ids and titles for a repo
  get_milestones: {
    key: "get_milestones",
    noun: "Milestones",
    display: {
      label: "Milestones",
      description: "Get the milestones on a repo to populate a dropdown.",
      hidden: true
    },
    operation: {
      perform: getDropdownMilestones,
      canPaginate: true
    }
  },
  // Get the user ids and logins that can be assigned to issues
  repo_assignees: {
    key: "repo_assignees",
    noun: "Assignees",
    display: {
      label: "Assignees",
      description: "Get the assignees for a repo",
      hidden: true
    },
    operation: {
      perform: getDropdownAssignees,
      canPaginate: true
    }
  }
};
