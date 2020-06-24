import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/federal-agencies/html/`

const Resources = () => <LazyHTML url={`${dataurl}open-source-pilot/tools-and-resources.html`} />

export default Resources
