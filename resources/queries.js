/*
* Repository Queries
*/

// fetch complete list of repositorys
// results limted to 100, use pagination to retrieve more
const listRepositoriesQuery = `
  query($userName:String!) {
    user(login:$userName) {
      repositories(first:100) {
        pageInfo {
          hasNextPage
          endCursor
        }
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
          }
        }
      }
    }
}`;

const Queries = {
    listRepositoriesQuery: listRepositoriesQuery,
};

module.exports = Queries;
