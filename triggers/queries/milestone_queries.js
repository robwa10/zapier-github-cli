const milestoneDropdownQuery = `
	query ($repoName:String!, $repoOwner:String! ) {
		repository(name:$repoName, owner:$repoOwner) {
	  	id
	    name
	    milestones(first:100) {
	      pageInfo {
	        hasNextPage
	        endCursor
	      }
	    	nodes {
	      	id
	        title
	    	}
			}
		}
	}
`;

const milestoneDropdownPaginationQuery = `
	query ($repoName:String!, $repoOwner:String!, $endCursor:String! ) {
		repository(name:$repoName, owner:$repoOwner) {
	  	id
	    name
	    milestones(first:100, after:$endCursor) {
	      pageInfo {
	        hasNextPage
	        endCursor
	      }
	    	nodes {
	      	id
	        title
	    	}
			}
		}
	}
`;

module.exports = { milestoneDropdownQuery, milestoneDropdownPaginationQuery };
