
# Code.gov - Unlocking the potential of the Federal Government’s software.

[![Build Status](https://circleci.com/gh/GSA/code-gov-front-end.svg?style=svg)](https://circleci.com/gh/GSA/code-gov-front-end)
[![Code Climate](https://api.codeclimate.com/v1/badges/4675ef3ed03728b81e66/maintainability)](https://codeclimate.com/github/GSA/code-gov-front-end/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4675ef3ed03728b81e66/test_coverage)](https://codeclimate.com/github/GSA/code-gov-front-end/test_coverage)

## Introduction

[Code.gov](https://code.gov) is a website promoting good practices in code development, collaboration, and reuse across the U.S.  Government. Code.gov provides tools and guidance to help agencies implement the [Federal Source Code Policy](https://sourcecode.cio.gov). It also includes an inventory of government custom code to promote reuse between agencies and provides tools to help government and the public collaborate on open source projects.

To learn more about the project, check out this [blog post](https://www.whitehouse.gov/blog/2016/08/08/peoples-code).

Code.gov is an open source project, so we invite your contributions, be it in the form of code, design, or ideas.

## Requirements

The development of code.gov is guided by the requirements set forth in [Section 7.2 (Code Inventories and Discovery)](https://sourcecode.cio.gov/Implementation/#code-inventories-and-discovery), [Section 7.3 (Code.gov)](https://sourcecode.cio.gov/Implementation/#codegov), and  [Section 7.6 (Agency Policy)](https://sourcecode.cio.gov/Implementation/#agency-policy) of the Federal Source Code Policy. Namely:

> * "Within 90 days of the publication date of this policy, the Administration will launch https://www.code.gov, an online collection of tools, best practices, and schemas to help agencies implement this policy.";
>
> * "Within 90 days of the publication date of this policy, each agency’s CIO—in consultation with the agency’s CAO—shall develop an agency-wide policy that addresses the requirements of this [document.]";  and
>
> * "Within 120 days of the publication date of this policy, each agency must update—and thereafter keep up to date—its inventory of agency information resources to include an enterprise code inventory that lists custom-developed code for or by the agency after the publication of this policy."

## Configuration
For documentation on how to configure code-gov-front-end, go [here](CONFIGURATION.md).

## Contributing

Here’s how you can help contribute to code.gov:

* Source Code Policy
  * To provide feedback on the [Federal Source Code Policy](https://sourcecode.cio.gov/), you should follow [this issue tracker](https://github.com/WhiteHouse/source-code-policy/issues)

* Code.gov
    * To provide feedback on code-gov-front-end, please checkout our [Contributing Guildelines](CONTRIBUTING.md).
    * To contribute to the Code.gov style guide, head over to the [code-gov-style](https://github.com/GSA/code-gov-style) repo.
    * Checkout [code-gov](https://github.com/GSA/code-gov) for a list of additional project repositories. If you aren't sure where your question or idea fits, this is a good place to share it.

## Questions?

If you have questions, please feel free to [send us an email](mailto:code@gsa.gov).

## Getting Started

After you have cloned this repo, you can use `npm install` to install all of the
project’s dependencies.

You can then run the server using `npm run start`.

By default, the development server will listen on <http://localhost:8080/>. You can change the default port by setting the `PORT` environment variable before starting the server (for example, `PORT=3000 npm start`).

## Testing
### Unit tests
This app uses...

### End-to-end tests
End-to-end testing is done with...

## Deployment
This app uses the `github-deploy` package for handling deployment. To configure
deployment, customize the `config/github-deploy` and `webpack.github-deploy`
files to match your settings. When ready to deploy, run
`npm run federalist-deploy:dev` or `npm run federalist-deploy:prod`, depending on your
intended destination.

If you are deploying from a fork, you will have to set
the `GIT_REMOTE_NAME` environmental variable,
like `GIT_REMOTE_NAME="upstream" npm run federalist-deploy`.

## Deploying Arbitrary Branch
If you'd like to deploy an arbitrary branch, set the `GIT_BRANCH_NAME` environmental variable.  For example the following code will deploy the current branch to https://federalist-proxy.app.cloud.gov/preview/gsa/code-gov-web/federalist-demo/#/
```
GIT_BRANCH_NAME="federalist-demo" npm run federalist-deploy
```


## Specifying API URL
The app uses the production API by default.  To use the staging API,
set an API_URL environmental variable for the npm process. Here's two examples:
```
API_URL=stag npm run start
API_URL=staging npm run start
API_URL='https://code-api-staging.app.cloud.gov/api/' npm run start
API_URL=staging GIT_REMOTE_NAME=upstream npm run federalist-deploy:dev
```

## Specifying an API Key
The app uses the API key provided in the code-gov-config.json by default.
If you want to override that, specify an `CODE_GOV_API_KEY` environmental variable.  Here's an example:
```
CODE_GOV_API_KEY=l87sfdi7ybc2bic7bai8cb2i176c3b872tb3 npm run start
```

## Deployment Problems
When pushing to staging or dev branches, you might run into an occasional error warning that the branch you're pushing to already exists. If you see this, you need to clear the cache in the gh-pages module using this command: `rm -rf node_modules/gh-pages/.cache`

## Generating License Data
To update the `dependency_licenses.json` file, run `npm run licenses`.

## File Structure
The directories in `src` are organized around the pillars of  React, along
with several additional custom file types. When creating new files, be sure to
add your file and any necessary templates, styles, and tests to a directory
dedicated to your new file in the appropriate place.


## Style Guide
We've moved the bulk of the CSS for this application into a [Style Guide repository](https://github.com/GSA/code-gov-style) so that we can more easily keep things consistent and deploy changes more quickly.

You'll need to clone/download the [Style Guide repository](https://github.com/GSA/code-gov-style) to get started.

If you need to make CSS changes, make them within this directory and commit them to that repository.

For more instructions on how to make changes, view the readme inside of the [Style Guide repository](https://github.com/GSA/code-gov-style).


## License

As stated in [CONTRIBUTING](CONTRIBUTING.md):

> [..] this project is in the worldwide public domain (in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/)).

> All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.
