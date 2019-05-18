
# Code.gov - Unlocking the potential of the Federal Government’s software.

[![Build Status](https://circleci.com/gh/GSA/code-gov-front-end.svg?style=svg)](https://circleci.com/gh/GSA/code-gov-front-end)
[![Code Climate](https://api.codeclimate.com/v1/badges/4675ef3ed03728b81e66/maintainability)](https://codeclimate.com/github/GSA/code-gov-front-end/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4675ef3ed03728b81e66/test_coverage)](https://codeclimate.com/github/GSA/code-gov-front-end/test_coverage)

## Introduction

[Code.gov](https://code.gov) is a website promoting good practices in code development, collaboration, and reuse across the U.S.  Government. Code.gov provides tools and guidance to help agencies implement the [Federal Source Code Policy](https://sourcecode.cio.gov). It also includes an inventory of government custom code to promote reuse between agencies and provides tools to help government and the public collaborate on open source projects.

To learn more about the project, check out this [blog post](https://www.whitehouse.gov/blog/2016/08/08/peoples-code).

Code.gov is an open source project, so we invite your contributions, be it in the form of code, design, or ideas.

## Contributing

Here’s how you can help contribute to code.gov:

* Source Code Policy
  * To provide feedback on the [Federal Source Code Policy](https://sourcecode.cio.gov/), follow [this issue tracker](https://github.com/WhiteHouse/source-code-policy/issues)

* Code.gov
    * To provide feedback on code-gov-front-end, please checkout our [Contributing Guildelines](CONTRIBUTING.md).
    * To contribute to the Code.gov style guide, head over to the [code-gov-style](https://github.com/GSA/code-gov-style) repo.
    * Checkout [code-gov](https://github.com/GSA/code-gov) for a list of additional project repositories. If you aren't sure where your question or idea fits, this is a good place to share it.

## Getting Started

After you have cloned this repo, you can use `npm install` to install all of the
project’s dependencies.

You can then run the server using `npm run start`.

By default, the development server will listen on <http://localhost:8080/>. You can change the default port by setting the `PORT` environment variable before starting the server (for example, `PORT=3000 npm start`).

### Specifying an API Key
The app uses the API key provided in the site.json by default.
If you want to override that, specify an `CODE_GOV_API_KEY` environmental variable.  Here's an example:
```
CODE_GOV_API_KEY=l87sfdi7ybc2bic7bai8cb2i176c3b872tb3 npm run start
```

You can sign up for an API key at [developers.code.gov](https://developers.code.gov/key.html).

### File Structure
The directories in `src` are organized around the pillars of React, along
with several additional custom file types. When creating new files, be sure to
add your file and any necessary templates, styles, and tests to a directory
dedicated to your new file in the appropriate place.

### Style Guide

The bulk of the CSS for this application is at [Style Guide repository](https://github.com/GSA/code-gov-style) so that we can more easily keep things consistent and deploy changes more quickly.

You'll need to clone/download the [Style Guide repository](https://github.com/GSA/code-gov-style) to get started.

If you need to make CSS changes, make them within this directory and commit them to that repository.

For more instructions on how to make changes, view the readme inside of the [Style Guide repository](https://github.com/GSA/code-gov-style).

### Changes to the Policy Guide

The code for the [Policy Guide](https://code.gov/policy-guide/) section of the site is located in the [code-gov-fscp-react-component](https://github.com/GSA/code-gov-fscp-react-component) repo. Any changes or issues related to the Policy Guide should be made in that repository.

### Changes to the About Page

The code for the [About](https://code.gov/about/overview/introduction) section of the site is located in the [code-gov-about-page](https://github.com/GSA/code-gov-about-page) repo.  Any changes or issues related to the About section should be made in that repository.

### Testing

Unit testing is done using the [jest](https://github.com/facebook/jest) framework with [enzyme](https://github.com/airbnb/enzyme). 

Use `npm run test` to run unit tests a single time. This will generate a code coverage report.

Use `npm run test-watch` to run unit tests continuously, re-running each time a file is saved. By default only files changed since the last commit will be ran, follow the command line prompt for customizing how tests are ran. Snapshot tests can be updated while running this command, by pressing `u` to updated them.

Note: console.log/warn/error are mocked in unit tests and will not print anything to avoid cluttering the command line. Use a different logging, such as console.info for debugging while running tests

Note: site should be running locally before executing npm run test or you might get false errors due to the component plugins being used

## Deployment
Read about how to publish to Github pages, Federalist and elsewhere [here](DEPLOYMENT.md)

## Bundle analysis
https://federalist-proxy.app.cloud.gov/preview/gsa/code-gov-front-end/federalist-bundle-analysis/report.html


## Deploying Arbitrary Branch
Coming soon!


## Generating License Data
To update the `dependency_licenses.json` file, run `npm run licenses`.

## Configuration
For documentation on how to configure code-gov-front-end, go [here](CONFIGURATION.md).

## Questions?

If you have questions, please feel free to contact us via: 
[Twitter](@CodeDotGov) 
[send us an email](mailto:code@gsa.gov) 
[LinkedIn](code-gov)  

Or join our #opensource-public Slack channel:  
[Slack](https://chat.18f.gov/)

## License

As stated in [CONTRIBUTING](CONTRIBUTING.md):

> [..] this project is in the worldwide public domain (in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/)).

> All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.
