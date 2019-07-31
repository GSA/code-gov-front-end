import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH  }src/components/featured-projects/html/`

const OverviewNoticeAndComment = () => <LazyHTML url={`${dataurl}overview/notice-and-comment.html`}/>

export default OverviewNoticeAndComment