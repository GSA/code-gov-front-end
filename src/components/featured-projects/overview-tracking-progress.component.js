import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH  }src/components/featured-projects/html/`

const OverviewTrackingProgress = () => <LazyHTML url={`${dataurl}overview/tracking-progress.html`}/>

export default OverviewTrackingProgress