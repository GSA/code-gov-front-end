import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const LinkingPolicy = () => <LazyHTML url={`${dataurl}linking-policy.html`} />

export default LinkingPolicy
