const ghpages = require('gh-pages')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

console.log('starting publish.js')

const DIR = process.env.CODE_GOV_DIR || path.join(__dirname, process.env.CODE_GOV_RELATIVE_DIR)

const env_vars = {
  owner: process.env.OWNER,
  repository: process.env.REPOSITORY,
  branch: process.env.BRANCH,
  baseurl: process.env.BASEURL,
  api: process.env.CODE_GOV_API_KEY,
  code_gov_repo: process.env.CODE_GOV_REPO,
  dir: DIR
}

console.log('env_vars', env_vars)

try {
  if (fs.existsSync('./dist/.gitignore')) {
    console.log('unlinking ./dist/.gitignore')
    fs.unlinkSync('./dist/.gitignore')
  }
} catch (err) {
  console.log(err)
}

if (!DIR) {
  throw new Error('please specify CODE_GOV_DIR as an env variable')
}

const options = {
  dotfiles: false,
  repo: process.env.CODE_GOV_REPO || 'git@github.com:GSA/code-gov-front-end'
}

if (process.env.CODE_GOV_BRANCH) {
  options.branch = process.env.CODE_GOV_BRANCH
} else {
  throw new Error('no branch specified')
}

console.log('options:', options)
// if (!process.env.CODE_GOV_REPO) {
//  throw new Error("no repo specified")
// }
//
// if (!process.env.CODE_GOV_API_KEY) {
//  throw new Error("no api specified")
// }

// ghpages.clean()
//
// ghpages.publish(DIR, options, err => {
//  if (err) {
//    console.error(err);
//  } else {
//    console.log("published successfully");
//  }
// });
