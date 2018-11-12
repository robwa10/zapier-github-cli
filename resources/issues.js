// get a single issues
const getIssues = (z, bundle) => {
  const responsePromise = z.request({
    url: `https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}`,
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// get a list of issuess
const listIssuess = (z) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      order_by: 'id desc'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// find a particular issues by name
const searchIssuess = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      query: `name:${bundle.inputData.name}`
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// create a issues
const createIssues = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: {
      name: bundle.inputData.name // json by default
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'issues',
  noun: 'Issues',

  get: {
    display: {
      label: 'Get Issues',
      description: 'Gets a issues.'
    },
    operation: {
      inputFields: [
        {key: 'id', required: true}
      ],
      perform: getIssues
    }
  },

  list: {
    display: {
      label: 'New Issues',
      description: 'Lists the issuess.'
    },
    operation: {
      perform: listIssuess
    }
  },

  search: {
    display: {
      label: 'Find Issues',
      description: 'Finds a issues by searching.'
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

  sample: {
    id: 1,
    name: 'Test'
  },

  outputFields: [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'}
  ]
};
