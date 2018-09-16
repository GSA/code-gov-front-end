import { CodeGovAPIClient } from '@code.gov/code-gov-api-client'

const client = new CodeGovAPIClient({
  /* global CODE_GOV_API_KEY */
  api_key: CODE_GOV_API_KEY,
  debug: true
})

