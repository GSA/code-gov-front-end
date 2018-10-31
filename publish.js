const ghpages = require('gh-pages');
const path = require('path');

console.log("starting publish.js");

const DIR = process.env.CODE_GOV_DIR || path.join(__dirname, process.env.CODE_GOV_RELATIVE_DIR)

if (!DIR) {
  throw new Error("please specify CODE_GOV_DIR as an env variable")
}

const options = {
  dotfiles: false
}

if (process.env.CODE_GOV_BRANCH) {
  options.branch = process.env.CODE_GOV_BRANCH
} else {
  throw new Error("no branch specified")
}

ghpages.clean()

ghpages.publish(DIR, options, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("published successfully");
  }
});
