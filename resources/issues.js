// Dependencies
const queries = require('./queries/issue_queries');
const helpers = require('./utils/helpers');
// const samples = require('./samples/issue_samples');

const mapSubNodes = (nodes) => {
  return nodes.map(el => {
    el.labels = el.labels.nodes
    el.assignees = el.assignees.nodes
    el.author = el.author.login
    return el
  });
}

// get a list of issuess
const listIssuess = (z, bundle) => {
  const amount = bundle.meta.frontend || bundle.meta.first_poll ? 100 : 20;  // Get the max number we can on dedupe and testing in editor
  const query = queries.issuesListQuery(amount);
  const variables = { userName: bundle.authData.login };

  const promise = helpers.queryPromise(z, query, variables);

  return promise.then((response) => {
    helpers.handleError(response); // Check for errors and deal with them
    const content = z.JSON.parse(response.content);
    const edges = content.data.user.issues.edges;

    if (bundle.meta.frontend || bundle.meta.first_poll) {
      // Return everything in trigger test or when building dedupe list
      const nodes = edges.map(el => (el.node));
      return mapSubNodes(nodes)
    } else {
      // Return only issues created in the last 48hrs in standard poll
      let data = [];
      edges.forEach(el => {
        let node = helpers.createdLastTwoDays(el);
        if (node !== null) {
          data.push(node);
        }
      });
      return mapSubNodes(data)
    }
  });
};

// find a particular issues by name
const searchIssues = (z, bundle) => {
  return []
};

// create a issues
const createIssues = (z, bundle) => {
  return []
};

module.exports = {
  key: 'issues',
  noun: 'Issues',

  list: {
    display: {
      label: 'New Issue',
      description: 'Triggers when a new issue is created.'
    },
    operation: {
      perform: listIssuess
    }
  },

  search: {
    display: {
      label: 'Find Issues',
      description: 'Finds a spsecific issue.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: searchIssues
    },
  },

  create: {
    display: {
      label: 'Create Issues',
      description: 'Creates a new issue.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: createIssues
    },
  },
};
