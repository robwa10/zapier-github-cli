// triggers on mention with a certain tag
const triggerMention = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      tag: bundle.inputData.tagName
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'mention',
  noun: 'Mention',

  display: {
    label: 'Get Mention',
    description: 'Triggers on a new mention.'
  },

  operation: {
    inputFields: [
      
    ],
    perform: triggerMention,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
