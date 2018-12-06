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

// First query to populate a repo dynamic dropdown
const repoDropdownQuery = `
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
	}
`;

// Pagination query to fetch more resources for a repo dynamic dropdown
const repoDropdownPaginationQuery = `
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
	}
`;

module.exports = {
  assignableUsersDropdownQuery,
  assignableUsersDropdownPaginationQuery,
  labelsDropdownQuery,
  labelsDropdownPaginationQuery,
  milestoneDropdownQuery,
  milestoneDropdownPaginationQuery,
  repoDropdownQuery,
  repoDropdownPaginationQuery
};
