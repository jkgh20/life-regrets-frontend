# Life Regrets Frontend

This repository contains the frontend portion of the Life Regrets project. The
code in this repo is live and served by GitHub. The backend code is in a
separate, private repo as it contains the anti-abuse system, Terraform code, and
other sensitive data related to deployment.

## Local Development

To deploy the React project locally, run:
```
npm start
```

You should see the site at http://localhost:3000/.

## Deploying to GitHub Pages

To deploy the site on GitHub Pages, run:
```
npm run deploy
```

This creates and pushes a commit to the `gh-pages` remote branch on behalf of
your GitHub user. Note that these commits are production optimzed and contain
only minified files.
