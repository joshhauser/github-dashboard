# Github dashboard

A dashboard to display a few statistics of my Github profile :

- number of repositories
- most used language or framework
- languages and frameworks usage distribution among all repositories I own

## How to use it for yourself?

1. `git clone git@github.com:joshhauser/github-dashboard.git`
2. `cd github-dashboard`
3. `npm install`
4. Get a personal key to use Github API (click on your profile > "Settings" > "Developer settings" > "Personal access tokens" > "Fine-grained tokens" then create a new Token):

   1. Click on your profile in the topbar
   2. Choose `Settings`
   3. In the left menu, choose `Developer settings`
   4. Click on `Personal access tokens` then choose `Fine-grained tokens`
   5. Create a new token with the expiration delay you want, and add read-only permsission for metadata. Save your token in a secure space, because you won't be able to retrieve it later on Github and you'll have to re-generate it if you lost it.

5. Create a `.env` file at the project's root, and add `VITE_GITHUB_PERSONAL_TOKEN=<put your token here>`.
6. `npm run dev` to test the project (I've tested this app with 83 repositories: keep in mind that if you have a lot of repositories, it may take a few seconds to display anything)
7. Do whatever you want with your dashboard!

> Note: as there's a limited number of requests to the Github API, you should use fake data or limitate the requests when you want to test something.
