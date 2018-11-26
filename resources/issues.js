// get a list of issuess
const listIssuess = (z, bundle) => {
  return []
};

// find a particular issues by name
const searchIssuess = (z, bundle) => {
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
      perform: searchIssuess
    },
  },

  create: {
    display: {
      label: 'Create Issues',
      description: 'Creates a new issues.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: createIssues
    },
  },
};
