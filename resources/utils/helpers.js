// Helper functions that can be used in all resources

const queryPromise = (z, query, queryVariables) => {
  return z.request(`{{process.env.BASE_URL}}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: z.JSON.stringify({
      query: query,
      variables: queryVariables,
    }),
  });
};

const handleError = response => {
  if (response.status !== 200) {
    throw new Error(`Github returned a ${response.status} and said: ${response.content}`);
  } /* else if (response.errors) {
    throw new Error(`We encountered an error and Github said: ${response.errors[0]['message']}`);
  } */
  // Need to think of how to deal with errors. A search returns an error when it finds nothing
  // but we don't want to throw an error on that. Just return null.
};

const createdLastTwoDays = (el) => {
  let dt = new Date(el.node.createdAt).getTime();
  let difference = Date.now() - dt;
  if (difference < 172800000) {  // 172800000 is the number of milliseconds in 48hrs
    return el.node
  } else {
    return null
  }
};

module.exports = {
  queryPromise: queryPromise,
  handleError: handleError,
  createdLastTwoDays: createdLastTwoDays,
};
