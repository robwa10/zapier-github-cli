/*
 * Github limits results to 100.
 */

// First query to populate a repo dynamic dropdown
const dynamicDropdownQuery = `
   query($userName:String!) {
     user(login:$userName) {
       repositories(first:100, orderBy: { direction: DESC, field: CREATED_AT }) {
         pageInfo {
           endCursor
           hasNextPage
         }
         nodes {
           id
           name
         }
       }
     }
   }`;

// Find a specific repo
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
       nodes {
         id
         name
       }
     }
     labels(first:20) {
       nodes {
         id
         color
         name
         resourcePath
         url
       }
     }
     collaborators(first:20) {
       nodes {
         email
         name
         login
         url
       }
     }
   }
 }`;

// Pagination query to fetch more resources for a repo dynamic dropdown
const paginationQuery = `
  query($userName:String!, $endCursor:String!) {
   user(login:$userName) {
     repositories(first:100, after:$endCursor, orderBy: { direction: DESC, field: CREATED_AT }) {
       pageInfo {
         endCursor
         hasNextPage
       }
       nodes {
         id
         name
       }
     }
   }
  }`;

// Fetch list of repositorys
const repoListQuery = fetchAmount => {
  return `
    query($userName:String!) {
      user(login:$userName) {
        repositories(first:${fetchAmount}, orderBy: { direction: DESC, field: CREATED_AT }) {
          nodes {
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
    }`;
};

module.exports = {
  dynamicDropdownQuery,
  findRepoQuery,
  paginationQuery,
  repoListQuery
};
