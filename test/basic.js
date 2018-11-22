require('should');

const zapier = require('zapier-platform-core');
zapier.tools.env.inject();

const App = require('../index');
const appTester = zapier.createAppTester(App);

const nock = require('nock');

describe('oauth2 app', () => {
  before(() => {
    // It's a good idea to store your Client ID and Secret in the environment rather than in code.
    // This works locally via the `export` shell command and in production by using `zapier env`
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      throw new Error('For the tests to run, you need to do `export CLIENT_ID=1234 CLIENT_SECRET=asdf`');
    }
  });

  it('generates an authorize URL', () => {
    const bundle = {
      // In production, these will be generated by Zapier and set automatically
      inputData: {
        state: '4444',
        redirect_uri: 'http://zapier.com/'
      },
      environment: {
        // These will come from your local environment. When running in production, Zapier builds a bundle
        // that includes environment variables you have set with `zapier env` command.
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
      }
    };

    return appTester(App.authentication.oauth2Config.authorizeUrl, bundle)
      .then((authorizeUrl) => {
        authorizeUrl.should.eql(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&state=4444&redirect_uri=http%3A%2F%2Fzapier.com%2F&response_type=code`);
      });
  });

  it('can fetch an access token and user name', done => {
    const bundle = {
      inputData: {
        // In production, Zapier passes along whatever code your API set in the query params when it redirects
        // the user's browser to the `redirect_uri`
        code: 'one_time_code',
      },
      authData: {
        access_token: 'a_token',
      },
      environment: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
      }
    };

    // Intercept the call to get the access token
    nock('https://github.com/login/oauth')
      .post('/access_token', {
        code: 'one_time_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
      })
      .reply(200, { access_token: 'a_token' });

    // Intercept the call the get the user name
    nock('https://api.github.com')
      .get('/user')
      .query({ access_token: bundle.authData.access_token })
      .reply(200, { login: 'user001' });

    appTester(App.authentication.oauth2Config.getAccessToken, bundle)
      .then((result) => {
        result.should.eql({
          access_token: 'a_token',
          login: 'user001',
        })
        done()
      })
      .catch(done);
  });
});
