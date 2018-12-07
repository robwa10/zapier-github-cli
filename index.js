const LabelsResource = require("./resources/labels");
const IssuesResource = require("./resources/issues");
const RepositoryResource = require("./resources/repository");
const authentication = require("./authentication");
const dropdown_requests = require("./triggers/dropdown_requests");

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
  triggers: dropdown_requests
};

// Finally, export the app.
module.exports = App;
