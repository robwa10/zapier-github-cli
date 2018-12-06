const createIssue = `
mutation (
  $repoID: String!,
  $issueTitle: String!,
  $issueBody: String!,
  $assigneeID: String!,
  $milestoneID: String!,
  $labelID: String!
){
  createIssue(input: {
    repositoryId: $repoID,
    title: $issueTitle,
    body: $issueBody,
    assigneeIds: $assigneeID,
    milestoneId: $milestoneID
    labelIds: $labelID
  }) {
    issue {
      id
      resourcePath,
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

module.exports = { createIssue };
