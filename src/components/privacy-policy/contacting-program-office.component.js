import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const Cookies = () => <LazyHTML url={`${dataurl}cookies.html`} />

export default Cookies
