const getAccessToken = (z, bundle) => {
  const promise = z.request(`{{process.env.AUTH_URL}}/access_token`, {
    method: 'POST',
    body: {
      code: bundle.inputData.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    }
  });

  // Needs to return at minimum, `access_token`, and if your app also does refresh, then `refresh_token` too
  return promise.then((response) => {
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }
    const result = z.JSON.parse(response.content);
    return result.access_token;
  });
};

const getLoginName = (z, bundle, a_token) => {
  // We have to pass the access_token here because it's not been set in authData yet
  const promise = z.request({
    method: 'GET',
    url: 'https://api.github.com/user',
    params: { access_token: a_token }
  });

  function parseData (a_token, response) {
    // Parsing the data as it's own function so I can call bind on .then and pass the token
    if (response.status === 401) {
      throw new Error('Could not get user data.');
    }
    const result = z.JSON.parse(response.content);
    return {
      access_token: a_token,
      login: result.login,
    }
  }
  return promise.then(parseData.bind(null, a_token));
};

const getAuthData = (z, bundle) => {
  // We need to set the login as part of authData for future queries.
  // But we need to pass the access_token to get the user details as /user.
  // So we get the token and then pass it to get the user data.
  // Then we return an object with them both in.
  return getAccessToken(z, bundle).then(result => {
    return getLoginName(z, bundle, result)
  })
};

const testAuth = (z, bundle) => {
  // Zapier automatically passes the access_token
  const promise = z.request({
    method: 'GET',
    url: 'https://api.github.com/user',
  });
  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The access token you supplied is not valid');
    }
     return z.JSON.parse(response.content);
  });
};

module.exports = {
  type: 'oauth2',
  oauth2Config: {
    // Step 1 of the OAuth flow; specify where to send the user to authenticate with your API.
    // Zapier generates the state and redirect_uri, you are responsible for providing the rest.
    // Note: can also be a function that returns a string
    authorizeUrl: {
      url: `{{process.env.AUTH_URL}}/authorize`,
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code'
      }
    },
    // Step 2 of the OAuth flow; Exchange a code for an access token.
    // This could also use the request shorthand.
    getAccessToken: getAuthData,
    // If there is a specific scope you want to limit your Zapier app to, you can define it here.
    // Will get passed along to the authorizeUrl
    scope: 'repo,user'
  },
  // The test method allows Zapier to verify that the access token is valid. We'll execute this
  // method after the OAuth flow is complete to ensure everything is setup properly.
  test: testAuth,
  fields: [
    { key: 'login', type: 'string', required: false, computed: true }
  ],
  // Label the connection with their Github username.
  connectionLabel: '{{bundle.authData.login}}'
};
