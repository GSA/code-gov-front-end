import { CodeGovAPIClient } from '@code.gov/api-client/src/index.js'

const client = new CodeGovAPIClient({
  api_key: process.env.CODE_GOV_API_KEY,
  debug: true
})

export default client