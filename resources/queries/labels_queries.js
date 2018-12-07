const labelsDropdownQuery = `
	query ($repoName:String!, $repoOwner:String! ) {
		repository(name:$repoName, owner:$repoOwner) {
	  	id
	    name
	    labels(first:100) {
	      pageInfo {
	        hasNextPage
	        endCursor
	      }
	    	nodes {
	      	id
	        name
	    	}
			}
		}
	}
`;

const labelsDropdownPaginationQuery = `
	query ($repoName:String!, $repoOwner:String!, $endCursor:String! ) {
		repository(name:$repoName, owner:$repoOwner) {
	  	id
	    name
	    labels(first:100, after:$endCursor) {
	      pageInfo {
	        hasNextPage
	        endCursor
	      }
	    	nodes {
	      	id
	        name
	    	}
			}
		}
	}
`;

module.exports = { labelsDropdownQuery, labelsDropdownPaginationQuery };
