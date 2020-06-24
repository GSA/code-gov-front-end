import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/federal-agencies/html/`

const MeasuringCode = () => (
  <LazyHTML url={`${dataurl}open-source-pilot/how-to-measure-code.html`} />
)

export default MeasuringCode
