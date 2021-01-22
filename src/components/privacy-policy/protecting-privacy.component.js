import React from 'react'
import LazyHTML from 'components/lazy-html'

const dataurl = `${PUBLIC_PATH}src/components/privacy-policy/html/`

const ProtectingPrivacy = () => <LazyHTML url={`${dataurl}protecting-privacy.html`} />

export default ProtectingPrivacy
