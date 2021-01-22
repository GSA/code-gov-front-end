import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const Security = () => <LazyHTML url={`${dataurl}security.html`} />

export default Security
