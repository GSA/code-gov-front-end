import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const GoogleAnalytics = () => <LazyHTML url={`${dataurl}google-analytics.html`} />

export default GoogleAnalytics
