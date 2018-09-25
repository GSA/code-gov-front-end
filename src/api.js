import { CodeGovAPIClient } from '@code.gov/api-client/dist/bundle-without-babel-polyfill.js'
console.log("CodeGovAPIClient:", CodeGovAPIClient)

const client = new CodeGovAPIClient({
  /* global CODE_GOV_API_KEY */
  api_key: 'CODE_GOV_API_KEY',
  debug: true
})

export default client