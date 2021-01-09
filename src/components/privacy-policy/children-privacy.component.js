import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const ChildrenPrivacy = () => <LazyHTML url={`${dataurl}children-privacy.html`} />

export default ChildrenPrivacy
