/*
* Repository Queries
*/

// Fetch complete list of repositorys.
// Github limits results to 100.
const repoListQuery = (additionalCall) => {
  // Set the options for fetching
  let variables = `$userName:String!`;
  let fetchAmount = `first:100`;

  if (additionalCall) {
    // Change the options for subsequent calls
    variables = `$userName:String!, $endCursor:String!`
    fetchAmount = `first:100 after:$endCursor`;
  }

  return `
    query(${variables}) {
        user(login:$userName) {
          repositories(${fetchAmount}, orderBy: {
            direction: DESC,
            field: CREATED_AT
          }) {
            pageInfo {
              hasNextPage
              endCursor
            }
          totalCount
            edges {
              node {
                id
                name
                createdAt
                description
                hasIssuesEnabled
                isPrivate
                isFork
                pushedAt
                updatedAt
                url
                hasWikiEnabled
                sshUrl
                isPrivate
                resourcePath
                owner {
                  login
                  url
                }
              }
            }
          }
        }
      }`;
}

const Queries = {
    repoListQuery: repoListQuery,
};

module.exports = Queries;
