import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const InformationCollected = () => <LazyHTML url={`${dataurl}information-collected.html`} />

export default InformationCollected
