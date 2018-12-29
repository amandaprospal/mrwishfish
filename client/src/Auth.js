import auth0 from 'auth0-js';

/**
 * Handles authentication.
 */
class Auth {
    /**
     * Creates an instance of Auth.
     */
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: '53lunastation.auth0.com',
            audience: 'https://53lunastation.auth0.com/userinfo',
            clientID: 'U0xU6AmmiEkxSRhj1qVG2UgvsJmvYOBt',
            redirectUri: 'http://' + process.env.REACT_APP_DOMAIN + ':3000/callback',
            responseType: 'id_token',
            scope: 'openid profile'
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    /**
     * Gets the profile of the authenticated user.
     */
    getProfile() {
        return this.profile;
    }

    /**
     * Gets the Auth0 ID token for the current user.
     */
    getIdToken() {
        return this.idToken;
    }

    /**
     * Returns whether the current user is authenticated.
     */
    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    /**
     * Sends unauthenticated users to the Auth0 login page.
     */
    signIn() {
        console.log('Signed in');
        this.auth0.authorize();
    }

    /**
     * Fetches user details and the Auth0 ID token.
     */
    handleAuthentication() {
    return new Promise((resolve, reject) => {
        this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
            return reject(err);
        }
        this.setSession(authResult);
        resolve();
        });
    });
    }

    setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    /**
     * Logs out the current user.
     */
    signOut() {
    this.auth0.logout({
        returnTo: 'http://'+ process.env.REACT_APP_DOMAIN + ':3000',
        clientID: 'U0xU6AmmiEkxSRhj1qVG2UgvsJmvYOBt',
    });
    }

    silentAuth() {
    return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
        });
    });
    }
}

const auth0Client = new Auth();

export default auth0Client;