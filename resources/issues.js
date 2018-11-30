// Dependencies
const queries = require("./queries/issue_queries");
// const samples = require('./samples/issue_samples');

// Helper dependencies
const helpers = require("./utils/helpers");

// Get a list of issues
const listIssues = (z, bundle) => {
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

  const promise = helpers.queryPromise(z, query, variables);

  return promise.then(response => {
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
  });
};

// Find a particular issue by name
const searchIssues = (z, bundle) => {
  return [];
};

// Create an issue
const createIssue = (z, bundle) => {
  return [];
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
      description: "Finds a spsecific issue."
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
          key: "repo_id",
          required: true,
          label: "Repo",
          helpText:
            'You may need to click "load more" in the dropdown if you have a lot of repos.',
          dynamic: "repositoryList.id.name"
        },
        {
          key: "title",
          required: true,
          label: "Title"
        },
        {
          key: "body",
          required: false,
          label: "Body"
        },
        {
          key: "assignee",
          required: false,
          label: "Assignee",
          helpText: "Please enter a repo first."
        },
        {
          key: "milestone",
          required: false,
          label: "Milestone",
          helpText: "Please enter a repo first."
        },
        {
          key: "labels",
          required: false,
          label: "Labels",
          helpText:
            "Labels must exist already. Can include multiple labels by typing in and using a comma as a separator. Capitalization matters! **You must have push access to set labels!**"
        }
      ],
      perform: createIssue
    }
  }
};
