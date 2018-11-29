const handleError = response => {
  if (response.status !== 200) {
    throw new Error(
      `Github returned a ${response.status} and said: ${response.content}`
    );
  } /* else if (response.errors) {
    throw new Error(`We encountered an error and Github said: ${response.errors[0]['message']}`);
  } */
  // Need to think of how to deal with errors. A search returns an error when it finds nothing
  // but we don't want to throw an error on that. Just return null.
};

module.exports = { handleError };
