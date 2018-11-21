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

const findRepoQuery = `
  query( $repoName:String!, $repoOwner:String!) {
    repository(name:$repoName, owner:$repoOwner) {
      name
      id
      createdAt
      description
      descriptionHTML
      hasIssuesEnabled
      homepageUrl
      isFork
      isPrivate
      pushedAt
      updatedAt
      sshUrl
      url
      languages(first:20) {
        edges {
          node {
            id
            name
          }
        }
      }
      labels(first:20) {
        edges {
          node {
            id
            color
            name
            resourcePath
            url
          }
        }
      }
      assignableUsers(first:20) {
        edges {
          node {
            email
            name
            login
            url
          }
        }
      }
    }
  }`;

module.exports = {
    repoListQuery: repoListQuery,
    findRepoQuery: findRepoQuery,
};
