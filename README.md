# sp25-mvc-oauth
# Using Google OAuth
- Clone the repo.
- Create OAuth 2.0 Client credentials at console.cloud.google.com.
  - Authorized JavaScript origins (where your app will running at): `http://localhost:3000`
  - Authorized redirect URIs (the subroutine to take users through authentication): `http://localhost:3000/auth/google/callback`
- Create a new .env file.
- Add the ClientID and Client Secret from your Google App credentials.
- Run node server.js and access the app at http://localhost:3000/