import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/about/html/`

const FederalSourceCodePolicy = () => <LazyHTML url={`${dataurl}federal-source-code-policy.html`} />

export default FederalSourceCodePolicy
