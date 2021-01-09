import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/about/html/`

const CodeGovProgram = () => <LazyHTML url={`${dataurl}code-gov-program.html`} />

export default CodeGovProgram
