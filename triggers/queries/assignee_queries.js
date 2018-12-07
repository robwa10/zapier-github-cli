const assignableUsersDropdownQuery = `
	query ($repoName:String!, $repoOwner:String! ) {
		repository(name:$repoName, owner:$repoOwner) {
	  	id
	    name
	    assignableUsers(first:100) {
	      pageInfo {
	        hasNextPage
	        endCursor
	      }
	    	nodes {
	      	id
	        login
	    	}
			}
		}
	}
`;

const assignableUsersDropdownPaginationQuery = `
	query ($repoName:String!, $repoOwner:String!, $endCursor:String! ) {
		repository(name:$repoName, owner:$repoOwner) {
	  	id
	    name
	    assignableUsers(first:100, after:$endCursor) {
	      pageInfo {
	        hasNextPage
	        endCursor
	      }
	    	nodes {
	      	id
	        login
	    	}
			}
		}
	}
`;

module.exports = {
  assignableUsersDropdownQuery,
  assignableUsersDropdownPaginationQuery
};
