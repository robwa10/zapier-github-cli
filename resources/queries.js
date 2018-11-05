/*
* Repository Queries
*/

// fetch complete list of repositorys
// results limted to 50, use pagination to retrieve more
const listRepositoriesQuery = `
  query {
    user(login:robwa10) {
      repositories(first:50 after:$repoCursor) {
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
