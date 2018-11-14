# Deployment

## basic deployment
Deployment is basically just copying a folder that you created with `npm run build` and publishing it to a branch on your remote git repository.  You have a few options:
 - `npm run deploy-to-gh-pages` publishes to `gh-pages` branch
 - `npm run deploy-to-staging` publishes to a `federalist-stag` branch
 - `npm run deploy-to-production` publishes to a `federalist-prod` branch

## custom deployment
If the previous three options don't work for you, feel free to create your own deployment script, running `npm run publish` with your own evironmental variables.
You have the following environmental variables you can tweak:
 - CODE_GOV_RELATIVE_DIR: relative path from the root folder (directory that contains package.json) to the directory that you wish to publish, like `/dist/federalist-stag`.  You usually have to run `npm run build` before you publish or you will have nothing to publish!
 - CODE_GOV_BRANCH: name of the branch that you want to publish to, like `gh-pages`
 - CODE_GOV_REPO (:warning:): This environmental branch controls which repository to copy your build to (i.e. publish). Use carefully or you could accidentally publish to the wrong repo and break something.
 
 
 
