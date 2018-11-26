/*
 * Github limits results to 100.
 */

// Fetch list of issues.
const issuesListQuery = () => {
  return `
    query($userName:String!) {
      user(login:$userName) {
        issues(first:100, orderBy: {
          direction: DESC,
          field: CREATED_AT
        }) {
          edges {
            node {
              id
              title
              createdAt
              updatedAt
              url
              resourcePath
              number
              publishedAt
              viewerSubscription
              repository {
                id
                name
              }
              labels(first:100) {
                nodes {
                  id
                  name
                }
              }
              assignees(first:100) {
                edges {
                  node {
                    name
                    id
                  }
                }
              }
              author {
                login
              }
              body
              bodyHTML
              bodyText
            }
          }
        }
      }
    }`;
};

module.exports = {
  issuesListQuery: issuesListQuery,
}
