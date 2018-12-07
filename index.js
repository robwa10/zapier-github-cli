const authentication = require("./authentication");

// Triggers
const AssigneeTrigger = require('./triggers/assignee');
const MentionTrigger = require('./triggers/mention');
const MilestoneTrigger = require('./triggers/milestone');

// Resources
const IssuesResource = require("./resources/issues");
const LabelsResource = require("./resources/labels");
const RepositoryResource = require("./resources/repository");



// To include the Authorization header on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }
  return request;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  authentication: authentication,

  beforeRequest: [includeBearerToken],

  resources: {
    [LabelsResource.key]: LabelsResource,
    [IssuesResource.key]: IssuesResource,
    [RepositoryResource.key]: RepositoryResource
  },

  // This is where we're holding all the special requests to populate the various dropdowns throughout the app that don't have a resource
  triggers: {
    [AssigneeTrigger.key]: AssigneeTrigger,
    [MilestoneTrigger.key]: MilestoneTrigger,
    [MentionTrigger.key]: MentionTrigger,
   }
};

// Finally, export the app.
module.exports = App;
