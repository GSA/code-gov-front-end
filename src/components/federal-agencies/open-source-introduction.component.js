import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/federal-agencies/html/`

const OpenSourceIntroduction = () => (
  <LazyHTML url={`${dataurl}open-source-pilot/introduction.html`} />
)

export default OpenSourceIntroduction
