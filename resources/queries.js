/*
* Repository Queries
*/

// Fetch complete list of repositorys.
// Github limits results to 100.
// Since we can sort by CREATED_AT this should be enough for dedupe.
const repoListQuery = `
  query($userName:String!) {
    user(login:$userName) {
      repositories(first:100, orderBy: {
				direction: DESC,
				field: CREATED_AT
      }) {
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

const Queries = {
    repoListQuery: repoListQuery,
};

module.exports = Queries;
