const createIssue = inputs => {
  return `
    mutation {
      createIssue(input: {${inputs}}) {
        issue {
          id
          resourcePath
          title
          url
          state
          body
          bodyText
          bodyHTML
          createdAt
          number
          author {
            login
          }
          repository {
            id
            name
          }
          labels(first:100) {
             nodes {
              id
              name
            }
          }
          assignees(first:100) {
            nodes {
              login
              id
            }
          }
          milestone {
            id
            title
            description
            number
            url
          }
        }
      }
    }
  `;
};

module.exports = { createIssue };
