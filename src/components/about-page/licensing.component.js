import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/about-page/html/`

const Licensing = () => <LazyHTML url={`${dataurl}open-source-pilot/licensing.html`} />

export default Licensing
