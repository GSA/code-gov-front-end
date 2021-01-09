import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const Questions = () => <LazyHTML url={`${dataurl}questions.html`} />

export default Questions
