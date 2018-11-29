const queryPromise = (z, query, queryVariables) => {
  return z.request(`{{process.env.BASE_URL}}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: z.JSON.stringify({
      query: query,
      variables: queryVariables
    })
  });
};

module.exports = { queryPromise };
