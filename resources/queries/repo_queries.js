/*
 * Github limits results to 100.
 */

// Fetch list of repositorys.
const repoListQuery = (fetchAmount) => {
  return `
    query($userName:String!) {
        user(login:$userName) {
          repositories(first:${fetchAmount}, orderBy: {
            direction: DESC,
            field: CREATED_AT })
            {
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

module.exports = {
    repoListQuery: repoListQuery,
};
