// Dependencies
const queries = require("./queries/issue_queries");
const mutations = require("./mutations/issue_mutations");
// const samples = require('./samples/issue_samples');

// Helper dependencies
const helpers = require("../helpers");

// Get a list of issues
const listIssues = async (z, bundle) => {
  // Reduce the data nesting from the response
  const mapSubNodes = nodes => {
    return nodes.map(el => {
      el.labels = el.labels.nodes;
      el.assignees = el.assignees.nodes;
      el.author = el.author.login;
      return el;
    });
  };

  const amount = bundle.meta.frontend || bundle.meta.first_poll ? 100 : 20; // Get the max number we can on dedupe and testing in editor
  const query = queries.issuesListQuery(amount);
  const variables = { userName: bundle.authData.login };

  const response = await helpers.queryPromise(z, query, variables);

  helpers.handleError(response);

  const content = z.JSON.parse(response.content);
  const nodes = content.data.user.issues.nodes;

  if (bundle.meta.frontend || bundle.meta.first_poll) {
    return mapSubNodes(nodes); // Return everything in trigger test or when building dedupe list
  } else {
    const data = nodes.filter(
      el => helpers.isTwoDaysOld(el.createdAt) === false
    ); // Return only issues created in the last 48hrs in standard poll
    return mapSubNodes(data);
  }
};

// Find a particular issue by name
const searchIssues = (z, bundle) => {
  return [];
};

// Create an issue
const createIssue = async (z, bundle) => {
  // First we need to get the repo id
  const query = `
    query( $repoName:String!, $repoOwner:String!) {
      repository(name:$repoName, owner:$repoOwner) {
        name
        id
      }
    }
  `;
  const getRepoID = await helpers.queryPromise(z, query, {
    repoName: bundle.inputData.repo_name,
    repoOwner: bundle.inputData.repo_owner || bundle.authData.login
  });
  const repoContent = z.JSON.parse(getRepoID.content);
  const repo_id = repoContent.data.repository.id;

  // Now we need to build inputs of the mutation query based on the inputData
  let inputs = `repositoryId:"${repo_id}" title:"${
    bundle.inputData.issue_title
  }"`;

  // Check which optional fields were used and add them
  if (bundle.inputData.issue_body) {
    inputs = inputs + ` body:"${bundle.inputData.issue_body}"`;
  }
  if (bundle.inputData.issue_assignee) {
    inputs = inputs + ` assigneeIds:[${bundle.inputData.issue_assignee}]`;
  }
  if (bundle.inputData.issue_milestone) {
    inputs = inputs + ` milestoneId:"${bundle.inputData.issue_milestone}"`;
  }
  if (bundle.inputData.issue_labels) {
    inputs = inputs + ` labelIds:[${bundle.inputData.issue_labels}]`;
  }

  // Now we can create the issue on the repo!
  const mutation = mutations.createIssue(inputs);
  const response = await helpers.mutationPromise(z, mutation);
  const content = z.JSON.parse(response.content);
  let newIssue = content.data.createIssue.issue;
  newIssue.author = newIssue.author.login; // This just looks nicer in the output data

  return newIssue;
};

module.exports = {
  key: "issues",
  noun: "Issues",

  list: {
    display: {
      label: "New Issue",
      description: "Triggers when a new issue is created."
    },
    operation: {
      perform: listIssues
    }
  },

  search: {
    display: {
      label: "Find Issue",
      description: "Finds a spsecific issue.",
      hidden: true
    },
    operation: {
      inputFields: [{ key: "name", required: true }],
      perform: searchIssues
    }
  },

  create: {
    display: {
      label: "Create Issue",
      description: "Creates a new issue."
    },
    operation: {
      inputFields: [
        {
          key: "repo_name",
          required: true,
          label: "Repo",
          helpText:
            'You may need to click "load more" in the dropdown if you have a lot of repos. **If you pass a Custom Value here it must be the repo Name, not the ID.**',
          dynamic: "repositoryList.name"
        },
        {
          key: "repo_owner",
          required: false,
          label: "Repo Owner",
          helpText:
            "You only need to use this if you're creating an issue on a repo you don't own. **You must pass the repo owner's login name**."
        },
        {
          key: "issue_title",
          required: true,
          label: "Title",
          type: "string"
        },
        {
          key: "issue_body",
          required: false,
          label: "Body",
          type: "text"
        },
        {
          key: "issue_assignee",
          required: false,
          label: "Assignee",
          helpText:
            "Please enter a repo first. **If you pass a Custom Value here it has to be the assignee's ID**.",
          dynamic: "assignee.id.login"
        },
        {
          key: "issue_milestone",
          required: false,
          label: "Milestone",
          helpText:
            "Please enter a repo first. **If you pass a Custom Value here it has to be the milestone ID**.",
          dynamic: "milestone.id.title"
        },
        {
          key: "issue_labels",
          required: false,
          list: true,
          dynamic: "labelsList.id.name",
          label: "Labels",
          helpText: "**If you pass a Custom Value it must be the label ID**."
        }
      ],
      perform: createIssue
    }
  }
};
